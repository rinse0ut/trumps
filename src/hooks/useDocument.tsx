import { useEffect, useState } from "react";
import {db, getCollection} from '../services/firestore';

function useDcoument<T>(path: string, id: string, isSnapshot: boolean = false) {
  const [data, setData] = useState<T>();
  console.log('USE DOC', data);

  useEffect(() => {
    if (!path) return;

    if (isSnapshot) {
      return db.collection(path).doc(id).onSnapshot(snapshot => {
        const data = snapshot.data() as T;
        console.log('SNAP SHOT', data);
        setData(data);
      });
    }
  
    async function fetchData() {
      const doc = await getCollection(path).doc(id).get();         
      const data = doc.data() as T;
      console.log('FETCH DATA', data);
      setData(data);
    }

    fetchData();
  }, [])

  return data;
}

export default useDcoument;