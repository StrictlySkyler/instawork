import React from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import List from './components/List';
import Add from './components/Add';
import Edit from './components/Edit';
import Login from './components/Login';

window.API_URL = window.API_URL ? window.API_URL :
  'http://localhost:8000/api/v1/member/';
const FIELD_COUNT = 5;
export const LOGIN_FAILED_TEXT = 'Unable to login!\n\nCheck your credentials.';
export const NO_UPSTREAM_TEXT = 'Unable to login!\n\nTry again later.';

export function checkValidMember (member) {
  let valid = true;
  const keys = Object.keys(member);
  if (keys.length < FIELD_COUNT) valid = false;
  keys.forEach(key => {
    if (member[key] === undefined) valid = false;
  });

  return valid;
}

export default class App extends React.Component {
  state = {
    members: [],
    username: '',
    password: '',
  };
  
  render() {
    const updateAuthState = (username, password) => {
      const auth = {
        username,
        password,
      };
      let data;

      axios.get(window.API_URL, { auth })
      .then(res => {
        data = res.data;
        this.setState({
          members: data.members,
          username,
          password,
          admin: data.admin,
        });
      })
      .catch(err => {
        switch (err.status) {
          case 403:
            alert(LOGIN_FAILED_TEXT);
            break;
          default:
            alert(NO_UPSTREAM_TEXT);
            break;
        }
        console.error(err);
      })
    }

    const updateMemberState = (members) => {
      this.setState({members});
    }

    if (!this.state.username || !this.state.password) {
      return <Login updateAuthState={updateAuthState} />;
    }
    else if (!this.state.members.length) {
      updateAuthState(this.state.username, this.state.password);
      return <h2 className="italic text-2xl">Loading...</h2>
    }
    const {members, username, password, admin} = this.state;
    return (
      <Router>
        <Routes>
          <Route 
            path="/add" 
            element={<Add 
              members={members} 
              auth={{username, password}}
              updateMemberState={updateMemberState}
            />} 
          />
          <Route 
            path="/edit" 
            element={<Edit 
              members={members} 
              auth={{username, password}} 
              admin={admin}
              updateMemberState={updateMemberState}
            />} 
          />
          <Route path="/" element={<List members={this.state.members} />} />
        </Routes>
      </Router>
    )
  }
};