import React, { useEffect, useState } from "react";
import {getUsers} from '../services/firestore';
import {useParams} from 'react-router-dom';
import {db} from '../services/firestore';
import useCollection from '../hooks/useCollection';
import useDocument from '../hooks/useDocument';
import {CardsType, GameType} from '../types';

  /*
    if there are no p1InitCards and p2InitCards
      - shuffle and init them
      - p1InitCards: {"1": "Tom", "2": "Jerry"}
    
    start with player1
      - if user is player1
      - show first card of their deck
      - allow them to pick a stat
      - record stat as a move
      = "moves": {"1": { player: 1, card: Tom, stat: Jerry, result: 1}}  

      - if user is player2
      - show greyed out first card of their pack
      - 
  */

function shuffleAndDeal(items: CardsType) {
  let hand1 = [];
  let hand2 = [];
  const cards = Object.keys(items);
  const numCards = cards.length / 2;

  for (let i = 0; i < numCards; i++) {
   const index = Math.floor(Math.random() * numCards);
   const [item] = cards.splice(index, 1);
   hand1.push(item);
  }
  hand2 = cards;
  return [hand1, hand2];
}

function useGame(id: string) {
  const game = useDocument<GameType>('games', id);

  // Shuffle and deal cards - should be a serverless cloud function but that requires a Blaze payment plan :(
  useEffect(() => {
    const cards = game?.pack?.cards;
    const {p1InitialCards, p2InitialCards} = game || {} ;
    if (!cards || (p1InitialCards && p2InitialCards)) return;
    const [hand1, hand2] = shuffleAndDeal(cards);

    async function updateData() {
      await db.collection('games').doc(id).update({
        p1InitialCards: hand1, 
        p2InitialCards: hand2
      });
    }
    updateData();    
    
  }, [id, game]);

  return game;
}

function GamePage() {

  // const {gameId} = useParams<{gameId:string}>();
  const gameId = 'I53rrdNMAf4iTz5yTZpV';

  const game = useGame(gameId);
  console.log('GAME', gameId, game);

  return (
    <>
    <div>GAME PAGE</div>
    </>
  )
}

export default GamePage;