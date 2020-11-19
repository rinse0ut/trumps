import React, { ReactChild } from 'react';
import { useAuthContext } from '../components/AuthProvider';

type PropsType = {
  children: ReactChild;
}

function Layout(props: PropsType) {
  const {children} = props;
  const {currentUser} = useAuthContext();

  return (
    <>
    <div style={{
      position: 'fixed',
      height: 50,
      backgroundColor: 'blue',
      top: 0,
      left: 0,
      right: 0,
    }}>
      {currentUser?.displayName}
    </div>
    <div style={{
      height: 50,
    }}>
    </div>
    {children}
    </>
  )
}

export default Layout;