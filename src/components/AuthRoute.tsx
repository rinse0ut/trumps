import React from 'react';
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthContext } from './AuthProvider';

type PropType = RouteProps & {
  component: any;
}

function AuthRoute({ component: Component, ...rest }: PropType) {
  const {currentUser} = useAuthContext();
  console.log('AUTH_ROUTE USER', currentUser);
  return (
    <Route 
      {...rest} 
      render={(routeProps) => (
        !!currentUser ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to='/signin' />
        )  
    )} />
  );  
}

export default AuthRoute;