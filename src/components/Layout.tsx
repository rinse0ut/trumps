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
    <div>
      {currentUser?.displayName}
    </div>
    {children}
    </>
  )
}

export default Layout;