import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
// import Layout from "components/layout";
import Router from "./components/Router";
import { signUp } from './services/firestore';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AuthProvider from './components/AuthProvider';

function App() {

  return (
    <BrowserRouter>
      {/* <Layout> */}
      <AuthProvider>
        <Router />
      </AuthProvider>
      {/* </Layout> */}
    </BrowserRouter>
  )
};

export default App; 