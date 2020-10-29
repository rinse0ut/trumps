import React, { useEffect, useState } from "react";
import {getUsers} from '../services/firestore';

function useCollection(path: string) {
  const [data, setData] = useState<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>();

  useEffect(() => {
    if (!path) return;

    async function doAsync() {
      const data = await getUsers();
      console.log('USERS', data);
      setData(data);
    }

    doAsync();
  }, [])

  return data;
}

function FriendsPage() {

  useEffect(() => {

    async function doAsync() {
      const data = await getUsers();
      console.log('USERS', data);
    }

    doAsync();
  }, [])

  return <div>USER LIST</div>
}

export default FriendsPage;