import React, {useState} from 'react';
import { auth,db } from '../firebase';
import { setDoc,doc } from "firebase/firestore";
import { createUserWithEmailAndPassword  } from 'firebase/auth';
import { NavLink, useNavigate,Link } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            try {
                const ref = doc(db, "users",user.uid)
                await setDoc(ref, {
                    email: user.email,
                    upvotedOn: []  
                });
                navigate("/home")
                console.log("Document written with ID: ", ref.id);
                setEmail("");
                setPassword("");
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });  
    }
  return (
    <div className="mymodal">
    <h2>Register</h2>
    <form>
      <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
      <button type="submit" onClick={onSubmit} >Register</button>
      <p className="error"></p>
    </form>
    <div>Got an account? <Link to="/">Login instead</Link></div>
  </div>

  )
}

export default Register