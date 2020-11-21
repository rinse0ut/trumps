import React from "react";
import useCollection from '../hooks/useCollection';
import {GameType} from '../types';
import List from '../components/List';

function GamesPage() {

  const games = useCollection<any>('games');

  const items = games?.map((game: GameType) => ({
    title: `${game?.pack?.title}`,
    description: `${game?.p1Username} vs ${game?.p2Username}`,
    url: `/game/${game?.id}`
  }));

  return (
    <List title="Games" items={items}/>
  )
}

export default GamesPage;