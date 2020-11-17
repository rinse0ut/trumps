import React, { useEffect, useCallback, useState } from "react";
import {getUsers} from '../services/firestore';
import {useParams} from 'react-router-dom';
import {db} from '../services/firestore';
import useCollection from '../hooks/useCollection';
import useDocument from '../hooks/useDocument';
import {CardsType, GameType, StatParamType} from '../types';
import Card from '../components/Card';
import { useAuthContext } from '../components/AuthProvider';

function useGame(gameId: string) {

  const game = useDocument<GameType>('games', gameId, true);
  const stats = game?.pack.stats;

  console.log('GAME', gameId, game);

  // CURRENT PLAYER
  const {currentUser} = useAuthContext();
  const uid = currentUser?.uid;
  let currentPlayer: null|1|2 = null;
  if (game?.p1Id === uid) {
    currentPlayer = 1;
  } else if (game?.p2Id === uid) {
    currentPlayer = 2;
  }

  // Shuffle and deal cards - should be a serverless cloud function but that requires a Blaze payment plan :(
  useEffect(() => {
    const cards = game?.pack?.cards;
    const turns = game?.turns;
    console.log('DEALING...?', cards, turns, (!cards || turns));
    if (!cards || turns) return;
    console.log('DEALING...');
    const [p1Cards, p2Cards] = deal(cards);
    async function updateCards() {
      await db.collection('games').doc(gameId).update({
        turnNumber: 1,
        p1TurnNumber: 1,
        "turns.turn1":  {p1Cards, p2Cards},
      });
    }
    updateCards();    
  }, [gameId, game]);  // @TODO change game to cards

  // TURN
  let turnNumber = game?.turnNumber;
  const playerTurnNumber = game && game[`p${currentPlayer}TurnNumber`];

  let [currentTurn, setCurrentTurn] = useState<number>(playerTurnNumber || 1);
  console.log('CURRENT TURN NUMBER', currentTurn);

  const handleNextTurn = useCallback(() => {
    currentTurn++;
    setCurrentTurn(currentTurn)
  } , [currentTurn]);
  
  if (!currentPlayer) {
    console.error('PLAYER NOT FOUND');
  }

  const turn = game && getTurn(game, currentTurn);;
  const p1Cards = game && getTurnCards(game, currentTurn, 1);
  const p2Cards = game && getTurnCards(game, currentTurn, 2);

  console.log('CARDS', p1Cards, p2Cards);
  // STATS

  const [selectedStat, setSelectedStat] = useState<StatParamType>();

  const handleSelectStat = useCallback((params: StatParamType) => {
    setSelectedStat(params); 
  }, []);

  const handleTurn = useCallback(() => {

    if (!selectedStat || !p1Cards || !p2Cards) {
      return null;
    }

    let result;
    let p1UpdatedCards;
    let p2UpdatedCards;
    let drawnCards;

    const {statKey} = selectedStat;
    const [p1TopCard, ...p1HandCards] = p1Cards;
    const [p2TopCard, ...p2HandCards] = p2Cards;
    const p1Value = game?.pack.cards[p1TopCard][statKey];
    const p2Value = game?.pack.cards[p2TopCard][statKey];

    if (!p1Value || !p2Value) {
      return null;
    }
    console.log('CARD DUMP', p1TopCard)

    console.log(`You said: ${game?.pack.stats[statKey].title} ${p1Value}`);

    if (p1Value > p2Value) {
      console.log('P1 WINS');
      result = 1;
      // p1UpdatedCards = [...p1HandCards, p2TopCard, p1TopCard];
      // p2UpdatedCards = [...p2HandCards]
    } else if (p1Value < p2Value) {
      result = 2;
      console.log('P2 WINS');
      // p1UpdatedCards = [...p1HandCards];
      // p2UpdatedCards = [...p2HandCards, p1TopCard, p2TopCard]
    } else { // @TODO make first condition ===
      result = 0;
      console.log('DRAW!');
    }

    let turn = {
      player: currentPlayer,
      result,
      statKey: statKey,
      // p1Cards: p1UpdatedCards,
      // p2Cards: p2UpdatedCards,
      p1Value,
      p2Value,
    };

    console.log('TURN', turn);

    async function updateTurn() {
      if (currentTurn == undefined) {
        console.log('TURN COUNT UNDEFINED');
        return null;
      }
      console.log('UPDATE TURN');
      currentTurn++;
      await db.collection('games').doc(gameId).update({
        [`turns.turn${currentTurn}`]: turn,
        currentTurn,
        // [`p${currentPlayer}TurnIndex`]: turnCount,
      });
    }
    updateTurn();      

  } , [selectedStat, game, p1Cards, p2Cards, currentTurn]);

  if (!game || !p1Cards || !p2Cards) return {game, cards: [], handleSelectStat};
  const [p1TopCardKey] = p1Cards; 
  const p1TopCard = game.pack.cards[p1TopCardKey];
  const [p2TopCardKey] = p2Cards; 
  const p2TopCard = game.pack.cards[p2TopCardKey];

  return {game, turn, p1TopCard, p2TopCard, selectedStat, handleSelectStat, handleTurn, handleNextTurn};
}

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

function getTurn(game: GameType, turn: number) {
  if (turn === 0) return null;
  const turnKey = `turn${turn}`;
  return turnKey in game.turns ? game.turns[turnKey] : null;
}

function getTurnCards(game: GameType, turn: number, playerNum: null|1|2) {
  if (turn === 0) return [];
  return game.turns[`turn${turn}`][`p${playerNum}Cards`];
}

function GamePage() {

  const {gameId} = useParams<{gameId:string}>();
  // const gameId = 'HBqQxN5sDoLwqiGkABRu';

  const {game, turn, p1TopCard, p2TopCard, selectedStat, handleSelectStat, handleTurn, handleNextTurn} = useGame(gameId);
  console.log('TURN', turn);
  console.log('SELECTED STAT', selectedStat);

  if (!game || !p1TopCard) return (
    <div>Loading...</div>
  );

  return (
    <>
    <div>GAME PAGE</div>
    {selectedStat && (
      <>
        <div>You selected: {selectedStat.title} {selectedStat.value}</div>
        <button onClick={handleTurn}>Play Card</button>
      </>
    )}
    <button onClick={handleNextTurn}>
      Next Turn
    </button>
    <Card 
      card={p1TopCard} 
      stats={game.pack.stats}
      selectedStatKey={null}
      onSelectStat={handleSelectStat}
     />
    </>
  )
}

export default GamePage;