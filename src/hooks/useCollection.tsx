import React, { useEffect, useState } from "react";
import {getCollection} from '../services/firestore';
import * as firebase from 'firebase/app';

type item = {
  id: string;
  email?: string;
}

function useCollection(path: string) {
  const [data, setData] = useState<item[]>([]);

  useEffect(() => {
    if (!path) return;

    async function fetchData() {
      const snapshot = await getCollection(path).get();         
      const data = snapshot.docs.map(doc => ({...doc.data(), id: doc.id }));
      setData(data);
    }

    fetchData();
  }, [])

  return data;
}

export default useCollection;