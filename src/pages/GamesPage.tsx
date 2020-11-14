import React, { useEffect, useState } from "react";
import {getUsers} from '../services/firestore';
import { Link } from "react-router-dom";
import useCollection from '../hooks/useCollection';
function GamesPage() {

  const games = useCollection<any>('games');

  if (games && !games.length) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
    <div>GAME LIST</div>
    <ul>
      { games && games.map(game => (
        <li><Link to={`/game/${game?.id}`}>{game?.pack?.title} {game?.player2Id}</Link></li>
      )) }
    </ul>
    </>
  )
}

export default GamesPage;