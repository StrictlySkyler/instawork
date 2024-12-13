import {
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import {
  checkValidMember,
  NO_UPSTREAM_TEXT,
} from '../App'
import { 
  INVALID_ALERT_TEXT, 
} from './Add';

export default function Edit (props) {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id'), 10);
  const member = props.members[id];
  const {auth} = props;
  const navigate = useNavigate();

  function saveMember (e) {
    if (!checkValidMember(member)) {
      return alert(INVALID_ALERT_TEXT);
    }
    axios.post(window.API_URL, member, { auth })
  }
  function deleteMember (e) {
    e.preventDefault();
    if (!window.confirm(`Delete member ${member.email}?`)) return;
    axios.delete(window.API_URL, { auth, data: member })
      .then(res => { props.updateMemberState(res.data) })
      .catch(err => {
        alert(NO_UPSTREAM_TEXT);
        console.error(err);
      }).finally(() => navigate('/'))
  };

  return (
    <div className="container">
      <header>
        <h1 
          id="edit-team-member-header"
          className="font-bold text-3xl mt-8 px-2">
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
                id="first-name-input"
                className="p-2 my-2 border w-full" 
                type="text" placeholder="First Name" required
                defaultValue={member.first_name}
                onChange={(e) => {member.first_name = e.target.value}}
              />
              <input 
                id="last-name-input"
                className="p-2 my-2 border w-full" 
                type="text" placeholder="last name" required
                defaultValue={member.last_name}
                onChange={(e) => {member.last_name = e.target.value}}
              />
              <input 
                id="email-input"
                className="p-2 my-2 border w-full" 
                type="email" placeholder="email@example.com" required
                defaultValue={member.email}
                onChange={(e) => {member.emal = e.target.value}}
              />
              <input 
                id="phone-input"
                className="p-2 my-2 border w-full" 
                type="tel" placeholder="555-555-5555" required
                defaultValue={member.phone}
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
                  defaultChecked={!member.admin}
                  onChange={(e) => {
                    if (e.target.checked) member.admin = false;
                  }}
                  disabled={props.admin !== 2}
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
                  onChange={(e) => {
                    if (e.target.checked) member.admin = true;
                  }}
                  disabled={props.admin !== 2}
                  className="float-right" type="radio" defaultValue="1" 
                />
                <hr/>
              </div>
            </fieldset>
            <button
              id="submit-save-team-member-button"
              onClick={saveMember}
              className="w-full bg-blue-500 text-white py-2 my-2 rounded hover:bg-blue-300 active:bg-blue-700"
            >Save</button>
            <button
              id="submit-delete-team-member-button"
              onClick={deleteMember}
              disabled={props.admin !== 2}
              className="disabled:opacity-25 w-full border-red-500 border py-2 my-2 rounded hover:bg-red-300 active:bg-red-700"
            >Delete</button>
          </form>
        }
    </div>
  )
}