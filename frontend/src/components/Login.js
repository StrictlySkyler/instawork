
export default function Login (props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    props.updateAuthState(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="columns-1">
      <h1 
        id="login-header"
        className="font-bold text-3xl">Team Member Management App</h1>
      <h2 className="font-bold text-2xl">Please login:</h2>
      <div className="w-full">
        <label>
          Username:
          <input 
            id='username-input'
            className="w-full border rounded p-2 my-2"
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
            id='password-input'
            className="w-full border rounded p-2 my-2"
            type='password' 
            placeholder='password' 
            autoComplete='password'
            />
        </label>
      </div>
      <div className="w-full">
        <button 
          id="submit-login-button"
          className="bg-blue-500 text-white w-full my-2 p-2 rounded">
            Login
          </button>
      </div>
    </form>
  )
}