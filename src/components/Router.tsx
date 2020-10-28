import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import AuthRoute from './AuthRoute';
import { useAuthContext } from './AuthProvider';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';

const HomePage = () => (
  <> 
    <div>HOME</div>
    <Link to="/game">Play</Link>
    <SignOut/>
  </> 
);  

const GamePage = () => {
  const {hasAuth, auth, setAuthData} = useAuthContext();
  console.log('GAME AUTH VAL', auth);
  return (
    <> 
      <div>GAME</div>
      <SignOut/>
    </> 
  )  
};

function Router() {
  const {hasAuth, auth, setAuthData} = useAuthContext();
  console.log('ROUTER', {hasAuth, auth, setAuthData});
  return (
    <Switch>

       {/* Public Routes */}
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />

       {/* Private Routes */}
      <AuthRoute path="/home" component={HomePage} auth={hasAuth} />
      <AuthRoute path="/game" component={GamePage} auth={hasAuth} />
      <AuthRoute path="/signout" component={SignOut} auth={hasAuth} />

      <Redirect from="/" to="/signin" />
    </Switch>
  )
};

export default Router;