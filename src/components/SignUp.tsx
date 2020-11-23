import React, { useState } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { db, signUp, signOut } from '../services/firestore';
import {TitleBar} from '../components/Layout';

const SignUp = () => {
  // User State
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
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
          firstname: user.firstname,
          lastname: user.lastname,
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
          <label htmlFor="firstname">First Name</label>
          <input type="text" placeholder="First Name" name="firstname" onChange={handleChange} required /><br />
        </Form.Field>
        <Form.Field>
          <label htmlFor="username">Last Name</label>
          <input type="text" placeholder="Last Name" name="lastname" onChange={handleChange} required /><br />
        </Form.Field>                
        <Form.Field>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" name="username" onChange={handleChange} required /><br />
        </Form.Field>        
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" name="email" onChange={handleChange} required /><br />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" name="password" onChange={handleChange} required /><br />
        </Form.Field>
      <Button primary type="submit">Sign Up</Button>
    </Form>
      { user.error && <h4>{user.error}</h4> }
    </Container>
  )
};

export default SignUp;