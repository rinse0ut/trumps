import React, { useEffect, useState } from "react";
import {getCollection} from '../services/firestore';
import * as firebase from 'firebase/app';

type item = {
  id: string;
  title?: string;
  email?: string;

}

function useCollection<T>(path: string) {
  // const [data, setData] = useState<T extends {id: string}[] ? any : any | undefined>();
  const [data, setData] = useState<T[]>();

  useEffect(() => {
    if (!path) return;
  
    async function fetchData() {
      const snapshot = await getCollection(path).get();         
      const data = snapshot.docs.map(doc => {
        console.log('DOC', doc.id, doc.data());
        const {id} = doc;
        const data = doc.data();
        return {id, ...data}
      });
      console.log('DATA', data);
      // @ts-ignore
      setData(data);
    }

    fetchData();
  }, [])

  return data;
}

export default useCollection;