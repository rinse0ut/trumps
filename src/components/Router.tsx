import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import AuthRoute from './AuthRoute';
import { useAuthContext } from './AuthProvider';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Game from './Game';
import FriendsPage from '../pages/FriendsPage';

const HomePage = () => (
  <> 
    <div>HOME</div>
    <ul>
      <li><Link to="/friends">Friends</Link></li>
      <li><Link to="/game">Play</Link></li>
    </ul>
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
  // return <FriendsPage/>
  return (
    <Switch>

       {/* Public Routes */}
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />

       {/* Private Routes */}
      <AuthRoute path="/home" component={HomePage} />
      <AuthRoute path="/friends" component={FriendsPage} />
      <AuthRoute path="/game" component={Game} />
      <AuthRoute path="/signout" component={SignOut} />

      <Redirect from="/" to="/signin" />
    </Switch>
  )
};

export default Router;