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
    <div>
      <header>
        <h1>Game Night Team Members</h1>
      </header>
      <Link to="/add">+</Link>
      <hr></hr>
      {props.members.map((member, id) => (
        <div key={id}>
          <Link to={`/edit?id=${id}`}>
            <ul>
              <li>{member.first_name}</li>
              <li>{member.last_name}</li>
              <li>{member.email}</li>
              <li>{member.phone}</li>
            </ul>
          </Link>
        </div>
      ))}
    </div>
  )
}

function Add (props) {
  return (
    <div>
      <header>
        <h1>Add Team Member</h1>
      </header>
      <hr></hr>
      {props.members.map((member, id) => (
        <div key={id}>
          <ul>
            <li>{member.first_name}</li>
            <li>{member.last_name}</li>
            <li>{member.email}</li>
            <li>{member.phone}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}

function Edit (props) {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id'), 10);
  const member = props.members[id];

  return (
    <div>
      <header>
        <h1>Edit Team Member</h1>
      </header>
      <hr></hr>
      <div>
        {!member && <h2>Loading...</h2>}
        {member && <ul>
          <li>{member.first_name}</li>
          <li>{member.last_name}</li>
          <li>{member.email}</li>
          <li>{member.phone}</li>
        </ul>}
      </div>
    </div>
  )
}

export default class App extends React.Component {
  state = {
    members: [],
  };
   
  componentDidMount(){
    const api_url = 'http://localhost:8000/api/v1/member/';
    const auth = {
      username: 'strictlyskyler@gmail.com',
      password: 'password',
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


  render() {
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