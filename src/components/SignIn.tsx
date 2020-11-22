import React, { useState } from 'react';
import { signIn, signOut } from '../services/firestore';
import { Link } from "react-router-dom";
import { useAuthContext } from '../components/AuthProvider';
import { useHistory } from "react-router-dom";
import { Form, Button, Container } from 'semantic-ui-react'
import {TitleBar} from '../components/Layout';

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
    <Container>
      <TitleBar.Source>Log In</TitleBar.Source>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input type="text" placeholder="Email" name="email" onChange={handleChange}/><br />
        </Form.Field>
        <Form.Field>
          <input type="password" placeholder="Password" name="password" onChange={handleChange}/><br />
        </Form.Field>
        <Button type="submit">Log in</Button>
      </Form>
      <br></br>
      <Link to="/signup">Sign up</Link>
      {user.error && <h4>{user.error}</h4>}
    </Container>
  )
};

export default Login;