import React, { useEffect, useState } from "react";
import {getUsers} from '../services/firestore';
import useCollection from '../hooks/useCollection';
import List from '../components/List';
import {TitleBar} from '../components/Layout';

function FriendsPage() {

  const users = useCollection<any>('users');

  const listItems = users?.map((user: any) => ({
    title: `${user.username}`,
    description: `${user.email}`,
  }));

  if (users && !users.length) {
    return (
      <div>Loading...</div>
    )
  }

  if (!listItems) {
    return (
      <div>No users.</div>
    )
  }

  return (
    <>
      <TitleBar.Source>Friends</TitleBar.Source>
      <List items={listItems}/>
    </>
  )
}

export default FriendsPage;