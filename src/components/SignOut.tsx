import React from 'react';
import { Button } from 'semantic-ui-react';
import { signOut } from '../services/firestore';

const Logout = () => {

  // Log out function
  const handleClick = async () => {
    await signOut();
  }

  return (
    <Button type="button" onClick={handleClick}>Log Out</Button>
  )
};

export default Logout;