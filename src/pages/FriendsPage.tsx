import React from "react";
import useCollection from '../hooks/useCollection';
import List from '../components/List';

function FriendsPage() {

  const users = useCollection<any>('users');

  const items = users?.map((user: any) => ({
    title: `${user.username}`,
    description: `${user.email}`,
  }));

  return (
    <List title="Friends" items={items}/>
  )
}

export default FriendsPage;