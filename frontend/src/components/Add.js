import {
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import {
  API_URL,
  checkValidMember,
} from '../App'
export const ALERT_TEXT = 'Please fill out all fields!';

export default function Add (props) {
  const member = {};
  const {auth} = props;
  const navigate = useNavigate();
  
  function saveMember (e) {
    if (!checkValidMember(member)) {
      return alert(ALERT_TEXT);
    }
    axios.post(API_URL, member, { auth })
      .then((res) => {
        const members = res.data;
        props.updateMemberState(members);
        navigate('/')
      }).catch(err => {
        alert(`Something went wrong! Code: ${err.response.status}`);
        console.error(err);
      });
  }

  return (
    <div className="container">
      <header>
        <h1 
          id='add-team-member-header'
          className="font-bold text-3xl mt-8 px-2">
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
            id="first-name-input"
            className="p-2 my-2 border w-full" 
            type="text" placeholder="First Name" required
            onChange={(e) => {member.first_name = e.target.value}}
          />
          <input 
            id="last-name-input"
            className="p-2 my-2 border w-full" 
            type="text" placeholder="last name" required
            onChange={(e) => {member.last_name = e.target.value}}
          />
          <input 
            id="email-input"
            className="p-2 my-2 border w-full" 
            type="email" placeholder="email@example.com" required
            onChange={(e) => {member.email = e.target.value}}
          />
          <input 
            id="phone-input"
            className="p-2 my-2 border w-full" 
            type="tel" placeholder="1-800-TEAMSUP" required
            onChange={(e) => {member.phone = e.target.value}}
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
              onChange={(e) => {
                if (e.target.checked) member.admin = 0;
              }}
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
              onChange={(e) => {
                if (e.target.checked) member.admin = 1;
              }}
            />
            <hr/>
          </div>
        </fieldset>
        <button
          id="submit-add-team-member-button"
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={saveMember}
        >Save</button>
      </form>
    </div>
  )
}