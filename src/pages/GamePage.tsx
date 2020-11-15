import React, { useEffect, useCallback } from "react";
import {getUsers} from '../services/firestore';
import {useParams} from 'react-router-dom';
import {db} from '../services/firestore';
import useCollection from '../hooks/useCollection';
import useDocument from '../hooks/useDocument';
import {CardsType, GameType} from '../types';
import Card from '../components/Card';
import { useAuthContext } from '../components/AuthProvider';

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

function deal(items: CardsType) {
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

function useGame(gameId: string) {
  const game = useDocument<GameType>('games', gameId, true);

  const {currentUser} = useAuthContext();
  const uid = currentUser?.uid;
  let currentPlayer: 1|2;
  if (game?.p1Id === uid) {
    currentPlayer = 1;
  } else if (game?.p2Id === uid) {
    currentPlayer = 2;
  } else {
    console.error('PLAYER NOT FOUND');
  }
  
  const turnCount = game?.turnCount;
  const p1Card = game?.p1Cards ? game.pack.cards[game.p1Cards[0]] : null; // @TODO add check length
  const p2Card = game?.p2Cards ? game.pack.cards[game.p2Cards[0]] : null;

  console.log('CARDS', p1Card, p2Card);

  // Shuffle and deal cards - should be a serverless cloud function but that requires a Blaze payment plan :(
  useEffect(() => {
    console.log('DEAL CARDS?');
    const cards = game?.pack?.cards;
    const {p1InitialCards, p2InitialCards} = game || {} ;
    if (!cards || (p1InitialCards && p2InitialCards)) return;
    console.log('DEALING...');
    const [hand1, hand2] = deal(cards);

    async function updateCards() {
      await db.collection('games').doc(gameId).update({
        p1InitialCards: hand1, 
        p2InitialCards: hand2,
        p1Cards: hand1, 
        p2Cards: hand2
      });
    }
    updateCards();    
    
  }, [gameId, game]);  // @TODO change game to cards

  const handleSelectStat = useCallback((statKey: string) => {

    let result;
    const p1Value = p1Card && p1Card[statKey];
    const p12Value = p2Card && p2Card[statKey];

    if (!p1Value || !p12Value) {
      return null;
    }

    if (p1Value > p12Value) {
      console.log('P1 WINS');
      result = 1;
    } else if (p1Value < p12Value) {
      result = 2;
      console.log('P2 WINS');
    } else {
      result = 0;
      console.log('DRAW!');
    }

    let turn = {
      player: currentPlayer,
      statKey: statKey,
      result,
    };

    console.log('TURN', turn);

    async function updateTurn() {
      if (turnCount == undefined) {
        return null;
      }
      await db.collection('games').doc(gameId).update({
        [`turns.turn${turnCount}`]: turn,
        turnCount: turnCount + 1,
      });
    }
    updateTurn();      

  } , [p1Card, p2Card, turnCount]);

  if (!game || !uid) {
    return {game, cards: null, handleSelectStat}
  }

  let cards = null;

  if (game.p1Id === uid) {
    cards = game.p1Cards;
  } else if (game.p2Id === uid) {
    cards = game.p2Cards;
  }

  return {game, cards, handleSelectStat};
}

function GamePage() {

  const {gameId} = useParams<{gameId:string}>();
  // const gameId = 'wB0ZnPS016xrqQwng7EV';

  const {game, cards, handleSelectStat} = useGame(gameId);

  if (!game || !cards) return (
    <div>Loading...</div>
  );

  console.log('GAME', gameId, cards);

  const [firstCard] = cards
  const showCard = game.pack.cards[firstCard];

  return (
    <>
    <div>GAME PAGE</div>
    <Card 
      card={showCard} 
      stats={game.pack.stats}
      selectedStatKey={null}
      onSelectStat={handleSelectStat}
     />
    </>
  )
}

export default GamePage;