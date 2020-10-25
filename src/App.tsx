import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
// import Layout from "components/layout";
// import Router from "./components/Router";
import { signUp } from './services/firestore';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {

  // useEffect(() => {
  //   async function doAsync() {
  //     console.log('AUTH');
  //     try {
  //       const result = await signUp('djthomson@gmail.com', 'password');
  //       console.log('RESULT', result);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   doAsync();
  // }, []);

  return (
    <SignIn/>
  )
  // return <div>Sign In</div>
  // return (
    // <BrowserRouter>
    //   {/* <Layout> */}
    //   <Router />
    //   {/* </Layout> */}
    // </BrowserRouter>
  // )
};

export default App; 

// useEffect(() => {
//   async function doAsync() {
//     console.log('AUTH');
//     try {
//       const result = await signup('djthomson@gmail.com', 'password');
//       console.log('RESULT', result);
//     } catch (e) {
//       console.error(e);
//     }
//   }
//   doAsync();
// }, []);