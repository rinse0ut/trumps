import React, { useEffect, useState } from "react";
import {getCollection} from '../services/firestore';
import * as firebase from 'firebase/app';


function useCollection(path: string) {
  const [data, setData] = useState<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>();

  useEffect(() => {
    if (!path) return;

    async function doAsync() {
      const data = await getCollection(path).get();
      setData(data);
    }

    doAsync();
  }, [])

  return data;
}

export default useCollection;