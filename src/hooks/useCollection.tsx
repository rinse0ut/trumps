import { useEffect, useState } from "react";
import {db, getCollection} from '../services/firestore';

type item = {
  id: string;
  title?: string;
  email?: string;

}

function useCollection<T>(path: string, isSnapshot: boolean = false) {
  const [data, setData] = useState<T[]>();

  useEffect(() => {
    if (!path) return;
 
    if (isSnapshot) {
      return db.collection(path).onSnapshot(snapshot => {
        const data: T[] = [];
        const docs = snapshot.docs;
        for (let doc of docs) {
          console.log(`Document found at path: ${doc.ref.path}`);
          const {id} = doc;
          const item = doc.data() as T;
          data.push({id, ...item})
        }
        setData(data);
      });
    }    

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