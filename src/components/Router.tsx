import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import AuthRoute from './AuthRoute';
import { useAuthContext } from './AuthProvider';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Game from './Game';

const HomePage = () => (
  <> 
    <div>HOME</div>
    <Link to="/game">Play</Link>
    <SignOut/>
  </> 
);  

// const GamePage = () => {
//   const {currentUser} = useAuthContext();
//   console.log('GAME CURR USER', currentUser);
//   return (
//     <> 
//       <div>GAME</div>
//       <Link to="/home">Home</Link>
//       <SignOut/>
//     </> 
//   )  
// };

function Router() {
  return (
    <Switch>

       {/* Public Routes */}
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />

       {/* Private Routes */}
      <AuthRoute path="/home" component={HomePage} />
      <AuthRoute path="/game" component={Game} />
      <AuthRoute path="/signout" component={SignOut} />

      <Redirect from="/" to="/signin" />
    </Switch>
  )
};

export default Router;