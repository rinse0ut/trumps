import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import AuthRoute from './AuthRoute';
import { useAuthContext } from './AuthProvider';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
// import Game from './Game.txt';
import FriendsPage from '../pages/FriendsPage';
import PackPage from '../pages/PackPage';
import StatsPage from '../pages/StatsPage';
import CardsPage from '../pages/CardsPage';
import ChallengePage from '../pages/ChallengePage';
import GameListPage from '../pages/GamesPage';
import GamePage from '../pages/GamePage';
import AboutPage from '../pages/AboutPage';
import List from '../components/List';
import {Footer} from '../components/Layout';
import { useHistory } from "react-router-dom";
import { Button } from 'semantic-ui-react';


function HomePage() {
  const listItems = [
    {title: 'Games', url: '/games'},
    {title: 'Packs', url: '/categories'},
    {title: 'Friends', url: '/friends'},
    {title: 'About', url: '/about'},
  ];
  const history = useHistory();

  return (
    <> 
      <List title="Top Trumps 🛋️" items={listItems}/>
      <SignOut/>
      <Footer>
        <Button circular 
          color='green' 
          icon='add' 
          size='huge' 
          onClick={() => history.push(`/challenge`)} 
        />
     </Footer>      
    </> 
  )
}    

function Router() {
  // return <FriendsPage/>
  return (
    <Switch>

       {/* Public Routes */}
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />

       {/* Private Routes */}
      {/* <AuthRoute path="/home" component={GameListPage} />
      <AuthRoute path="/challenge" component={ChallengePage} />
      <AuthRoute path="/game/:gameId" component={GamePage} /> */}

      <AuthRoute path="/home" component={HomePage} />
      <AuthRoute path="/about" component={AboutPage} />
      <AuthRoute path="/friends" component={FriendsPage} />
      <AuthRoute path="/categories" component={PackPage} />
      <AuthRoute path="/challenge" component={ChallengePage} />
      <AuthRoute path="/games" component={GameListPage} />
      <AuthRoute path="/game/:gameId" component={GamePage} />
      <AuthRoute path="/category/:categoryId/stats" component={StatsPage} />
      <AuthRoute path="/category/:categoryId/cards" component={CardsPage} />
      <AuthRoute path="/signout" component={SignOut} />

      <Redirect from="/" to="/signin" />
    </Switch>
  )
};

export default Router;