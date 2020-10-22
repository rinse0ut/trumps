import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPk2j-y4TB9ex6MWD0jZmHXsN2aw6VZv4",
  authDomain: "trumps-53976.firebaseapp.com",
  databaseURL: "https://trumps-53976.firebaseio.com",
  projectId: "trumps-53976",
  storageBucket: "trumps-53976.appspot.com",
  messagingSenderId: "822188667084",
  appId: "1:822188667084:web:56d4680cf508a02ea55269",
  measurementId: "G-FNX5HRRFLY"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};

export const getCard = id => {
  return db
    .collection('variant').doc('pioneers')
    .collection('categories').doc('classic')
    .collection('cards').doc('morgan')
    .get();
};

// export const getCard = id => {
//   return db.collection('cards')
//       .doc(id)
//       .get();
// };