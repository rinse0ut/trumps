import React from 'react';
import { signOut } from '../services/firestore';

const Logout = () => {

  // Log out function
  const handleClick = async () => {
    await signOut();
  }

  return (
    <>
      <button type="button" onClick={handleClick}>Log Out</button>
    </>
  )
};

export default Logout;