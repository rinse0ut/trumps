import React, { useState } from 'react';
// import './Signup.css';
import { signIn, signOut } from '../services/firestore';

const Login = () => {
  // User State
  const [user, setUser] = useState({
    email: '',
    password: '',
    error: '',
  });

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