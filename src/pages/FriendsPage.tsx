import React, { useEffect, useState } from "react";
import {getUsers} from '../services/firestore';
import useCollection from '../hooks/useCollection';

function FriendsPage() {

  const users = useCollection('users');

  if (!users.length) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
    <div>USER LIST</div>
    <ul>
      { users.map(user => (<li>{user.id} {user.email}</li>)) }
      <li></li>
    </ul>
    </>
  )
}

export default FriendsPage;