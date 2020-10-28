import React, { useState, useContext } from 'react';
// import './Signup.css';
import { signIn, signOut } from '../services/firestore';
import { useAuthContext } from '../components/AuthProvider';
import { useHistory } from "react-router-dom";

const Login = () => {
  // User State
  const [user, setUser] = useState({
    email: '',
    password: '',
    error: '',
  });

  console.log('LOGIN');
  const {auth, setAuthData} = useAuthContext();
  console.log('AUTH VAL', auth);

  const history = useHistory();

  // onChange function
  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    })
  };

  // Submit function (Log in user)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Log in code here.
    try {
      const result = await signIn(user.email, user.password);
      console.log('RESULT', result, result.user);
      if (!result?.user?.emailVerified) {
        setUser({
          ...user,
          error: 'Please verify your email before to continue',
        });
        await signOut();
      } else {
        console.log('CALL ON LOGIN');
        // const {uid, displayName, email, emailVerified} = result.user;
        // setAuthData({uid, displayName, email, emailVerified});
        setAuthData(result.user);
        history.push("/home");
      }  
    } catch (e) {
      setUser({
        ...user,
        error: e.message,
      })       
    }
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" name="email" onChange={handleChange}/><br />
        <input type="password" placeholder="Password" name="password" onChange={handleChange}/><br />
        <button type="submit">Log in</button>
      </form>
      {user.error && <h4>{user.error}</h4>}
    </>
  )
};

export default Login;