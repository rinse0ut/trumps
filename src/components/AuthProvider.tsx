// import React, { createContext, useState, useEffect, useMemo, useContext } from "react";

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as firebase from 'firebase/app';
import { onAuthStateChanged } from '../services/firestore';
import { promises } from 'dns';

type AuthContextType = {
  currentUser: firebase.User|null;
}

export const AuthContext = createContext<AuthContextType|undefined>(undefined);

function AuthProvider({ children }: any) {

  const [currentUser, setCurrentUser] = useState<firebase.User|null>(null);

  useEffect(() => {
    const unsubsribe = onAuthStateChanged((user: any) => {
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