import React, { useState } from 'react';
// import './Signup.css';
import { signUp, signOut } from '../services/firestore';

const SignUp = () => {
  // User State
  const [user, setUser] = useState({
    nickname: '',
    email: '',
    password: '',
    error: '',
  });

  // onChange function
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    })
  };

  // Submit function (Create account)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await signUp(user.email, user.password);
      if (result?.user) {
        await result.user.updateProfile({
          displayName: user.nickname,
        })

        // URL of my website.
        const myURL = { url: 'http://localhost:3000/' }

        // Send Email Verification and redirect to my website.
        await result.user.sendEmailVerification(myURL);

        setUser({
          ...user,
          error: `Welcome ${user.nickname}. To continue please verify your email.`,
        })

        // Sign Out the user.
        signOut(); 

      }
    } catch (e) {
      setUser({
        ...user,
        error: e.message
      })
    }
  }

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nickname" name="nickname" onChange={handleChange} /><br />
        <input type="text" placeholder="Email" name="email" onChange={handleChange} /><br />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} /><br />
        <button type="submit">Sign Up</button>
      </form>
      {user.error && <h4>{user.error}</h4>}
    </>
  )
};

export default SignUp;