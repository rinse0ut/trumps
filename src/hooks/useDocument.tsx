import { useEffect, useState } from "react";
import {getCollection} from '../services/firestore';
import * as firebase from "firebase/app";

function useDcoument<T>(path: string, id: string) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (!path) return;
  
    async function fetchData() {
      const doc = await getCollection(path).doc(id).get();         
      const data = doc.data() as T;
      setData(data);
    }

    fetchData();
  }, [])

  return data;
}

export default useDcoument;