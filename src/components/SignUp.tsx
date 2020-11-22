import React, { useState } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { db, signUp, signOut } from '../services/firestore';
import {TitleBar} from '../components/Layout';

const SignUp = () => {
  // User State
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    error: '',
  });

  console.log('SIGN UP');

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
        console.log('USER', user);
        await result.user.updateProfile({
          displayName: user.username,
        })

        await db.collection('users').doc(result.user.uid).set({
          username: user.username,
          email: user.email
        });

        // URL of my website.
        const myURL = { url: 'http://localhost:3000/' }

        // Send Email Verification and redirect to my website.
        await result.user.sendEmailVerification(myURL);

        setUser({
          ...user,
          error: `Welcome ${user.username}. To continue please verify your email.`,
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
    <Container>
      <TitleBar.Source>Sign Up</TitleBar.Source>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input type="text" placeholder="Username" name="username" onChange={handleChange} /><br />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Email" name="email" onChange={handleChange} /><br />
        </Form.Field>
        <Form.Field>
          <input type="password" placeholder="Password" name="password" onChange={handleChange} /><br />
        </Form.Field>
      <Button type="submit">Sign Up</Button>
    </Form>
      { user.error && <h4>{user.error}</h4> }
    </Container>
  )
};

export default SignUp;