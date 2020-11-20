import React, { useEffect, useState } from "react";
import {getUsers} from '../services/firestore';
import { Link } from "react-router-dom";
import useCollection from '../hooks/useCollection';
import {GameType} from '../types';
import List from '../components/List';
import Loading from '../components/Loading';
import {TitleBar} from '../components/Layout';

function GamesPage() {

  const games = useCollection<any>('games');

  const listItems = games?.map((game: GameType) => ({
    title: `${game?.pack?.title}`,
    description: `${game?.p1Username} vs ${game?.p2Username}`,
    url: `/game/${game?.id}`
  }));

  if (!games) {
    return (
      <Loading/> 
    )
  }

  if (!listItems) {
    return (
      <div>No games.</div>
    )
  }

  return (
    <>
      <TitleBar.Source>Games</TitleBar.Source>
      <List items={listItems}/>
    </>
  )
}

export default GamesPage;