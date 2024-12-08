import { Link } from 'react-router-dom';

export default function List (props) {
  return (
    <div className="container">
      <header>
        <h1 
          id="team-members-header" 
          className="font-bold text-3xl mt-8 px-2">
          Team Members
        </h1>
        <h2 className="text-gray-500 px-2">
          You have {props.members.length} team members.
        </h2>
      </header>
      <Link 
        id='add-member-button'
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
              <li className="text-black member-first-name">
                {member.first_name || '(n/a)'} {member.admin && '(admin)'}
              </li>
              <li className="text-gray-500 member-last-name">
                {member.last_name || '(n/a)'}
              </li>
              <li className="text-gray-500 member-email">
                {member.email || '(n/a)'}
              </li>
              <li className="text-gray-500 member-phone">
                {member.phone || '(n/a)'}
              </li>
            </ul>
          </Link>
          <hr/>
        </div>
      ))}
    </div>
  )
}