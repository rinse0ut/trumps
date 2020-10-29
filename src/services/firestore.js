import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// @todo move to .env file
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

const auth = firebase.auth();
const db = firebase.firestore();

export const authenticateAnonymously = () => {
  return auth.signInAnonymously();
};

export function signUp(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function signIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signOut() {
  return auth.signOut();
}

export function onAuthStateChanged(user) {
  return auth.onAuthStateChanged(user);
}

export function getUsers() {
  console.log('FB AUTH', auth);
  return auth.listUsers(1000);
}

export function getCollection(path) {
  return db.collection(path);
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