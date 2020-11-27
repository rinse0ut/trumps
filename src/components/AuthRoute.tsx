import React from 'react';
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthContext } from './AuthProvider';

type PropType = RouteProps & {
  component: any;
}

function AuthRoute({ component: Component, ...rest }: PropType) {
  const {authenticated} = useAuthContext();
  console.log('AUTH_ROUTE AUTHENTICATED', authenticated);
  return (
    <Route 
      {...rest} 
      render={(routeProps) => (
        !!authenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to='/signin' />
        )  
    )} />
  );  
}

export default AuthRoute;