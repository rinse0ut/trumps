import React, { useEffect, useState } from "react";
import {getUsers} from '../services/firestore';
import useCollection from '../hooks/useCollection';

function FriendsPage() {

  const users = useCollection<any>('users');

  if (users && !users.length) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
    <div>USER LIST</div>
    <ul>
      { users && users.map(user => (<li>{user?.id} {user?.email}</li>)) }
    </ul>
    </>
  )
}

export default FriendsPage;