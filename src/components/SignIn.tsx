import React, { useState, useContext } from 'react';
import { signIn, signOut } from '../services/firestore';
import { useAuthContext } from '../components/AuthProvider';
import { useHistory } from "react-router-dom";

function Login() {

  const {currentUser} = useAuthContext();

  const history = useHistory();

  if (currentUser) {
    history.push("/home");
  }

  const [user, setUser] = useState({
    email: '',
    password: '',
    error: '',
  });

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
    try {
      const result = await signIn(user.email, user.password);
      if (!result?.user?.emailVerified) {
        setUser({
          ...user,
          error: 'Please verify your email before to continue',
        });
        await signOut();
      } 
      history.push("/home");
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