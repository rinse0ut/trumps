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
import MembershipPage from '../pages/MembershipPage';
import GameListPage from '../pages/GamesPage';
import GamePage from '../pages/GamePage';
import AboutPage from '../pages/AboutPage';
import List from '../components/List';
import {Footer} from '../components/Layout';
import { useHistory } from "react-router-dom";
import { Container, Button } from 'semantic-ui-react';
import ImageUpload from '../components/ImageUpload';
import CardForm from '../forms/CardForm';
import Can from '../auth/Can';
import { HeaderRightLink } from '../components/Layout';

function HomePage() {
  const listItems = [
    {title: 'Games', url: '/games', action:'games:visit'},
    {title: 'Packs', url: '/categories', action:'packs:visit'},
    {title: 'Friends', url: '/friends', action:'friends:visit'},
    {title: 'About', url: '/about', action:'about:visit'},
    {title: 'Membership', url: '/membership', action:'membership:visit'},
  ];
  const history = useHistory();
  const { currentUser, role } = useAuthContext();

  return (
    <Container> 
      <p>Welcome {role == 'visitor' ? 'Visitor' : currentUser?.displayName}</p>
      <HeaderRightLink to="/signin">LOG IN</HeaderRightLink>
      <List title="Top Trumps" items={listItems} user={currentUser} />
      {/* <Can
        role={currentUser?.role}
        perform="about:visit"
        yes={() => (
          <div>About Link</div>
        )}
        // no={() => <Redirect to="/" />}
      /> */}

      <SignOut/>
      <Footer>
        <Button circular 
          color='green' 
          icon='add' 
          size='huge' 
          onClick={() => history.push(`/challenge`)} 
        />
     </Footer>      
    </Container> 
  )
}    

function Router() {
  const { currentUser } = useAuthContext();

  return (
    <Switch>

       {/* Public Routes */}
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/home" component={HomePage} />

       {/* Private Routes */}
      {/* <AuthRoute path="/home" component={GameListPage} />
      <AuthRoute path="/challenge" component={ChallengePage} />
      <AuthRoute path="/game/:gameId" component={GamePage} /> */}

      <AuthRoute path="/about" component={AboutPage} />
      <AuthRoute path="/friends" component={FriendsPage} />
      <AuthRoute path="/categories" component={PackPage} />
      <AuthRoute path="/membership" component={MembershipPage} />
      {/* <AuthRoute path="/challenge" component={ChallengePage} /> */}
      <AuthRoute path="/games" component={GameListPage} />
      <AuthRoute path="/game/:gameId" component={GamePage} />
      <AuthRoute path="/category/:categoryId/stats" component={StatsPage} />
      <AuthRoute path="/category/:categoryId/cards" component={CardsPage} />
      <AuthRoute path="/signout" component={SignOut} />

      {/* <Can
        role={currentUser?.role}
        perform="dashboard-page:visit"
        yes={() => (
          <AuthRoute path="/categories" component={PackPage} />
        )}
        // no={() => <Redirect to="/" />}
      /> */}

      <Redirect from="/" to="/home" />
    </Switch>
  )
};

export default Router;