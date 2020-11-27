// import React, { createContext, useState, useEffect, useMemo, useContext } from "react";

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as firebase from 'firebase/app';
import { onAuthStateChanged } from '../services/firestore';

export type UserType = firebase.User;

type AuthContextType = {
  currentUser?: UserType;
  role: 'visitor' | 'user' | 'moderator' | 'creator' | 'admin' | 'superadmin' | 'dev'
}

export const AuthContext = createContext<AuthContextType|undefined>(undefined);

function AuthProvider({ children }: any) {

  const [currentUser, setCurrentUser] = useState<UserType>();

  useEffect(() => {
    const unsubsribe = onAuthStateChanged((user: any) => {
      user['role'] = 'visitor';
      setCurrentUser(user);
    });
    return () => {
      unsubsribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{currentUser}}>
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