import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Login()
{
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async  function login()
  {
    let item = { email, password };

    let result = await fetch("http://127.0.0.1:8000/api/login", {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Content-Type": 'application/json',
      }
    });
    result = await result.json();
   
    localStorage.setItem('user-info', JSON.stringify(result));
    navigate("/add"); 

  }

  useEffect(() => {// if user is logged in not able to access login.js
    if (localStorage.getItem('user-info')) {
      navigate("/add"); 
    }
  }, [navigate]); // Added navigate to the dependency array
  return (
    <div>
       <Header />
       <div className="col-sm-6 offset-sm-3">
    <h1>Login</h1>
    <br/>
      <input 
        type="email" 
        className="form-control" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Enter Email" 
      />
      <br/>
      <input 
        type="password" 
        className="form-control" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Enter Password" 
      />
      <br/>
      <button className="btn btn-primary" onClick={login}>
        Login
      </button>
      <br/>
      </div>
</div>
  ) 
}
export default Login