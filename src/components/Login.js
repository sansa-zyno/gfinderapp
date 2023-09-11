import React, {useState} from 'react';
import { auth } from '../firebase';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { NavLink, useNavigate,Link } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setEmail("");
            setPassword("");
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
    return (
       <div className="mymodal">
        <h2>Login</h2>
        <form>
          <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={onLogin} >Login</button>
          <p className="error"></p>
        </form>
        <div>No account? <Link to="/signup">Register instead</Link></div>
      </div>
    )
  }
  
  export default Login