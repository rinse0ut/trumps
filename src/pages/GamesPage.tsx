import React from "react";
import useCollection from '../hooks/useCollection';
import { GameType } from '../types';
import List from '../components/List';
import {Footer} from '../components/Layout';
import SignOut from '../components/SignOut';
import { Button } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import { useAuthContext } from '../components/AuthProvider';

function GamesPage() {

  const history = useHistory();
  const {user} = useAuthContext();
  const games = useCollection<any>('games', true);
  const items = games?.filter((game: GameType) => {
    // const p1CardCount = game?.turns[`turn${game.turnNumber}`]?.p1Cards?.length;
    // const p2CardCount = game?.turns[`turn${game.turnNumber}`]?.p2Cards?.length;   
    // const inProgress = p1CardCount !== 0 && p2CardCount !== 0;
    const hasUser = user?.uid === game.p1Id || user?.uid === game.p2Id;
    return hasUser; 
  })
  .sort((a, b) => (b.created - a.created))
  .map((game: GameType) => {
    const p1CardCount = game.turns[`turn${game.turnNumber}`]?.p1Cards?.length;
    const p2CardCount = game.turns[`turn${game.turnNumber}`]?.p2Cards?.length;
    return {
      title: `${game?.p1Username} (${p1CardCount}) vs ${game?.p2Username} (${p2CardCount})`,
      description: `${game?.pack?.title}: Round ${game?.turnNumber}`,
      url: `/game/${game?.id}`
    }
  });

  return (
    <>
      <List title="Games 🚀" items={items} user={user} />
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

export default GamesPage;