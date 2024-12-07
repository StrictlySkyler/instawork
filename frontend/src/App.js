import React from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useSearchParams,
} from 'react-router-dom';

function List (props) {
  return (
    <div className="container">
      <header>
        <h1 className="font-bold text-3xl mt-8 px-2">
          Team Members
        </h1>
        <h2 className="text-gray-500 px-2">
          You have {props.members.length} team members.
        </h2>
      </header>
      <Link 
        className="absolute top-0 right-0 px-4 text-blue-500 text-5xl" 
        to="/add"
        >+ <span className="sr-only" >Add Member</span>
      </Link>
      <hr></hr>
      {props.members.map((member, id) => (
        <div key={id}>
          <Link to={`/edit?id=${id}`} className="grid grid-cols-4 py-4">
            <img 
              className="w-20 h-20 m-auto" 
              alt={`Avatar for ${member.first_name} ${member.last_name}`}
              src="/avatar_612x612.jpg">
            </img>
            <ul className="col-span-3">
              <li className="text-black">
                {member.first_name || '(n/a)'} {member.admin && '(admin)'}
              </li>
              <li className="text-gray-500">{member.last_name || '(n/a)'}</li>
              <li className="text-gray-500">{member.email || '(n/a)'}</li>
              <li className="text-gray-500">{member.phone || '(n/a)'}</li>
            </ul>
          </Link>
          <hr/>
        </div>
      ))}
    </div>
  )
}

function Add (props) {
  return (
    <div className="container">
      <header>
        <h1 className="font-bold text-3xl mt-8 px-2">
          Add Team Member
        </h1>
        <h2 className="text-gray-500 px-2">
          Please enter first & last name, email, phone, and role.
        </h2>
      </header>
      <hr></hr>
      <form className="p-2" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend className="text-xl p-2">Member Info</legend>
          <input 
            className="p-2 my-2 border w-full" 
            type="text" placeholder="First Name" required
            />
          <input 
            className="p-2 my-2 border w-full" 
            type="text" placeholder="last name" required
            />
          <input 
            className="p-2 my-2 border w-full" 
            type="email" placeholder="email@example.com" required
            />
          <input 
            className="p-2 my-2 border w-full" 
            type="tel" placeholder="555-555-5555" required
          />
        </fieldset>
        <fieldset>
          <legend className="text-xl p-2">Role</legend>
          <div className="p-2">
            <label
              className="mb-2 inline-block" 
              htmlFor="not-admin">Regular - Can't delete members</label>
            <input 
              id="not-admin"
              name="is-admin"
              required
              className="float-right" type="radio" defaultValue="0" 
            />
            <hr/>
          </div>
          <div className="p-2">
            <label 
              className="mb-2 inline-block" 
              htmlFor="admin">Admin - Can delete members</label>
            <input 
              id="admin"
              name="is-admin"
              className="float-right" type="radio" defaultValue="1" 
            />
            <hr/>
          </div>
        </fieldset>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
        >Save</button>
      </form>
    </div>
  )
}

function Edit (props) {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id'), 10);
  const member = props.members[id];

  const saveMember = (e) => {};
  const deleteMember = (e) => {};

  return (
    <div className="container">
      <header>
        <h1 className="font-bold text-3xl mt-8 px-2">
          Edit Team Member
        </h1>
        <h2 className="text-gray-500 px-2">
          Edit first & last name, email, phone, and role.
        </h2>
      </header>
      <hr></hr>
        {!member && <h2>Loading...</h2>}
        {member && 
          <form className='p-2' onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="text-xl p-2">Member Info</legend>
              <input 
                className="p-2 my-2 border w-full" 
                type="text" placeholder="First Name" required
                defaultValue={member.first_name}
              />
              <input 
                className="p-2 my-2 border w-full" 
                type="text" placeholder="last name" required
                defaultValue={member.last_name}
              />
              <input 
                className="p-2 my-2 border w-full" 
                type="email" placeholder="email@example.com" required
                defaultValue={member.email}
              />
              <input 
                className="p-2 my-2 border w-full" 
                type="tel" placeholder="555-555-5555" required
                defaultValue={member.phone}
              />
            </fieldset>
            <fieldset>
              <legend className="text-xl p-2">Role</legend>
              <div className="p-2">
                <label
                  className="mb-2 inline-block" 
                  htmlFor="not-admin">Regular - Can't delete members</label>
                <input 
                  id="not-admin"
                  name="is-admin"
                  required
                  defaultChecked={!member.admin}
                  className="float-right" type="radio" defaultValue="0" 
                />
                <hr/>
              </div>
              <div className="p-2">
                <label 
                  className="mb-2 inline-block" 
                  htmlFor="admin">Admin - Can delete members</label>
                <input 
                  id="admin"
                  name="is-admin"
                  defaultChecked={member.admin}
                  disabled={!member.admin}
                  className="float-right" type="radio" defaultValue="1" 
                />
                <hr/>
              </div>
            </fieldset>
            <button
              onClick={saveMember}
              className="w-full bg-blue-500 text-white py-2 my-2 rounded"
            >Save</button>
            <button
              onClick={deleteMember}
              className="w-full border-red-500 border py-2 my-2 rounded"
            >Delete</button>
          </form>
        }
    </div>
  )
}

function Login (props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    props.onUpdate(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="columns-1">
      <h1 className="font-bold text-3xl">Game Night Team App</h1>
      <h2 className="font-bold text-2xl">Please login:</h2>
      <div className="w-full">
        <label>
          Username:
          <input 
            className="w-full"
            type='text' 
            placeholder='email@example.com' 
            autoComplete='email'
            />
        </label>
      </div>
      <div className="w-full">
        <label className="w-full">
          Password:
          <input 
            className="w-full"
            type='password' 
            placeholder='password' 
            autoComplete='password'
            />
        </label>
      </div>
      <div className="w-full my-2 px-2">
        <button className="bg-blue-500 text-white w-full">Login</button>
      </div>
    </form>
  )
}

export default class App extends React.Component {
  state = {
    members: [],
    // username: '',
    // password: '',
    username: 'strictlyskyler@gmail.com',
    password: 'password',
  };
  
  render() {
    const updateAuthState = (username, password) => {
      // this.setState({ username, password });
      const api_url = 'http://localhost:8000/api/v1/member/';
      const auth = {
        username,
        password,
      };
      let data;
    
      axios.get(api_url, { auth })
      .then(res => {
        data = res.data;
        this.setState({
          members: data
        });
      })
      .catch(err => { })
    }

    if (!this.state.username || !this.state.password) {
      return <Login onUpdate={updateAuthState} />;
    }
    else if (!this.state.members.length) {
      updateAuthState(this.state.username, this.state.password);
      return <h2 className="italic text-2xl">Loading...</h2>
    }
    return (
      <Router>
        <Routes>
          <Route path="/add" element={<Add members={this.state.members} />} />
          <Route path="/edit" element={<Edit members={this.state.members} />} />
          <Route path="/" element={<List members={this.state.members} />} />
        </Routes>
      </Router>
    )
  }
};