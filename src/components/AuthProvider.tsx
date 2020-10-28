// import React, { createContext, useState, useEffect, useMemo, useContext } from "react";

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as firebase from "firebase/app";

type AuthContextType = {
  hasAuth: boolean;
  auth: firebase.User|null;
  setAuthData: (data: any) => void;
}

// https://kentcdodds.com/blog/authentication-in-react-applications

export const AuthContext = createContext<AuthContextType|undefined>(undefined);

function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState<firebase.User|null>(null);
  const uid = auth?.uid;
// we will use loading later

  const setAuthData = (data: any) => {
    setAuth(data);
  };

  useEffect(() => {
    if (uid) {
      localStorage.setItem('uid', uid)
    } else {
      localStorage.removeItem('uid')
    }
  }, [uid]);

 // a function that will help us to add the user data in the auth;

  return (
    <AuthContext.Provider value={{ hasAuth: !!uid, auth, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const value = useContext(AuthContext);
  if (value === undefined) {
     throw new Error('Expected context value to be set');
  }
  return value;
}

export default AuthProvider;

// export const AuthDataContext = createContext({
//   user: null,
//   onLogin: (user: any) => {}
// });

// const initialAuthData = {};

// function AuthDataProvider (props: any) {
//   const [authData, setAuthData] = useState(initialAuthData);

//   /* The first time the component is rendered, it tries to
//    * fetch the auth data from a source, like a cookie or
//    * the localStorage.
//    */
//   useEffect(() => {
//     // const currentAuthData = someManager.getAuthData();
//     const currentAuthData = localStorage.getItem('auth');
//     if (currentAuthData) {
//       setAuthData(currentAuthData);
//     }
//   }, []);

//   const onLogout = (user: any) => setAuthData(user);

//   function onLogin(newAuthData: any) {
//     console.log('ON_LOGIN', newAuthData);
//     localStorage.setItem('auth', newAuthData);
//     setAuthData(newAuthData);
//   }  

//   // const authDataValue = useMemo({ ...authData, onLogin, onLogout }: any, [authData]);
//   const authDataValue = { ...authData, onLogin, onLogout }; 

//   return <AuthDataContext.Provider value={authDataValue} {...props} />;
// };

// export const useAuthDataContext = () => useContext(AuthDataContext);

// export default AuthDataProvider;