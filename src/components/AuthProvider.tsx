// import React, { createContext, useState, useEffect, useMemo, useContext } from "react";

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as firebase from 'firebase/app';
import { onAuthStateChanged } from '../services/firestore';

// export type UserType = firebase.User;

// type AuthType = {
// currentUser?: UserType;
// role: 'visitor' | 'user' | 'moderator' | 'creator' | 'admin' | 'superadmin' | 'dev'
// }
export type UserType = {
  uid: string | null;
  displayName: string | null;
  role: 'visitor' | 'user' | 'moderator' | 'creator' | 'admin' | 'superadmin' | 'dev'
}

type AuthType = {
  authenticated: boolean;
  user: UserType;
}

const defaultAuth: AuthType = {
  authenticated: false,
  user: {
    uid: null,
    displayName: 'Visitor',
    role: 'visitor',
  }
}

export const AuthContext = createContext<AuthType | undefined>(undefined);

console.log('AUTH CONTEXT VALUE', AuthContext);

function AuthProvider({ children }: any) {

  const [auth, setAuth] = useState<AuthType>(defaultAuth);

  useEffect(() => {
    const unsubsribe = onAuthStateChanged((user: firebase.User) => {
      const auth: AuthType = {
        authenticated: true,
        user: {
          uid: user?.uid,
          displayName: user?.displayName,
          role: 'user',
        }
      }
      console.log('AUTH', auth);
      console.log('USER', user);
      if (user) {
        setAuth(auth);
      } else {
        setAuth(defaultAuth);
      }
    });
    return () => {
      setAuth(defaultAuth);
      unsubsribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const value = useContext(AuthContext);
  console.log('USE AUTH CONTEXT VALUE', value);
  if (value === undefined) {
    throw new Error('Expected context value to be set');
  }
  return value;
}

export default AuthProvider;