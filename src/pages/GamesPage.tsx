import React, { useEffect, useState } from "react";
import {getUsers} from '../services/firestore';
import { Link } from "react-router-dom";
import useCollection from '../hooks/useCollection';
import {GameType} from '../types';
import List from '../components/List';

function GamesPage() {

  const games = useCollection<any>('games');

  const listItems = games?.map((game: GameType) => ({
    title: `${game?.pack?.title}`,
    description: `${game?.p1Username} vs ${game?.p2Username}`,
    url: `/game/${game?.id}`
  }));

  if (!games) {
    return (
      <div>Loading...</div>
    )
  }

  if (!listItems) {
    return (
      <div>No games.</div>
    )
  }

  return (
    <>
      <div>GAME LIST</div>
      <List items={listItems}/>
    </>
  )
}

export default GamesPage;