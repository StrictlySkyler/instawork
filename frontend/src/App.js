import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component{

  state = {
    details: [],
  };
   
  componentDidMount(){

    let data;

    axios.get('http://localhost:8000')
    .then(res => {
      data = res.data;
      this.setState({
        details: data
      });
    })
    .catch(err => { })

  }


  render(){
    return (
      <div>
        <header>
          <h1>Game Night Team Members</h1>
        </header>
        <hr></hr>
        {this.state.details.map((output, id) => (
          <div key={id}>
            <ul>
              <li>{output.first_name}</li>
              <li>{output.last_name}</li>
              <li>{output.email}</li>
              <li>{output.phone}</li>
            </ul>
          </div>
        ))}
      </div>
    )
  }

}

export default App;