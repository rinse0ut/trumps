import React, { useState } from 'react';
import { db, getCollection, signIn, signOut, signInWithFacebook } from '../services/firestore';
import styled from "styled-components";
import { useAuthContext } from '../components/AuthProvider';
import { useHistory } from "react-router-dom";
import { Form, Button, Icon, Container, Segment } from 'semantic-ui-react'
import { TitleBar, HeaderRightLink } from '../components/Layout';

const ContainerLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;  
  width: 100vw;  
  margin-top: -60px;
`

function SignIn() {

  const { authenticated } = useAuthContext();

  const history = useHistory();

  if (authenticated) {
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

  const handleFacebookSignIn = async (e: any) => {
    try {
      const result = await signInWithFacebook();
      if (!result) {
        setUser({...user, error:'Facebook user not found'});
        return;
      }
      result && console.log('FB', result);
      if (result && result?.additionalUserInfo) {
        const doc = await getCollection('users').doc(result?.user?.uid).get();         
        console.log('HAS USER', doc.exists);
        !doc.exists && await db.collection('users').doc(result?.user?.uid).set({
          // profile: result?.additionalUserInfo?.profile,
          username: result?.user?.displayName,
          email: result?.user?.email,
          photoURL: result?.user?.photoURL,
          role: 'user',
        });
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
        <TitleBar.Source>Top Trumps</TitleBar.Source>
        <HeaderRightLink to="/signup">SIGN UP</HeaderRightLink>
        <br></br>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Email" name="email" onChange={handleChange} required /><br />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" name="password" onChange={handleChange} required /><br />
          </Form.Field>
          <Button primary type="submit">Sign in</Button>
          {/* <Button>
            <Link to="/signup">Sign up</Link>
          </Button> */}
        </Form>
        <br/><hr/><br/>
        <Button color="facebook" onClick={handleFacebookSignIn} >
          <Icon name='facebook' />
          Sign in with Facebook
       </Button>
        {user.error && <Segment color="red">{user.error}</Segment>}
      </Container>
  )
};

export default SignIn;