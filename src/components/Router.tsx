import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import AuthRoute from './AuthRoute';
import { useAuthContext } from './AuthProvider';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
// import Game from './Game.txt';
import FriendsPage from '../pages/FriendsPage';
import CategoryPage from '../pages/CategoryPage';
import StatsPage from '../pages/StatsPage';
import CardsPage from '../pages/CardsPage';
import ChallengePage from '../pages/ChallengePage';
import GameListPage from '../pages/GamesPage';
import GamePage from '../pages/GamePage';
import List from '../components/List';
import {TitleBar} from '../components/Layout';

function HomePage() {
  const listItems = [
    {title: 'Friends', url: '/friends'},
    {title: 'Packs', url: '/categories'},
    {title: 'Games', url: '/games'},
    {title: 'New Game', url: '/challenge'},
  ]
  return (
    <> 
      <List title="Top Trumps 🛋️" items={listItems}/>
      <SignOut/>
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
      <AuthRoute path="/home" component={HomePage} />
      <AuthRoute path="/friends" component={FriendsPage} />
      <AuthRoute path="/categories" component={CategoryPage} />
      <AuthRoute path="/challenge" component={ChallengePage} />
      <AuthRoute path="/games" component={GameListPage} />
      <AuthRoute path="/game/:gameId" component={GamePage} />
      <AuthRoute path="/category/:categoryId/stats" component={StatsPage} />
      <AuthRoute path="/category/:categoryId/cards" component={CardsPage} />
      {/* <AuthRoute path="/game" component={Game} /> */}
      <AuthRoute path="/signout" component={SignOut} />

      <Redirect from="/" to="/signin" />
    </Switch>
  )
};

export default Router;