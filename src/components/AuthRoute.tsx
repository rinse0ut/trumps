import React from 'react';
import { Route, Redirect, RouteProps } from "react-router-dom";

type PropType = RouteProps & {
  component: any;
  auth: boolean;

}

function AuthRoute({ component: Component, auth, ...rest }: PropType) {
  console.log('AUTH_ROUTE', auth);
  return (
    <Route {...rest} render={(props) => (
        auth ? <Component {...props} />
             : <Redirect to='/signin' />
    )} />
  );  
}

export default AuthRoute;