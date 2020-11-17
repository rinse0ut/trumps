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

  const {currentUser} = useAuthContext();
  const uid = currentUser?.uid;
  let currentPlayer: null|1|2 = null;
  let otherPlayer: null|1|2 = null;
  if (game?.p1Id === uid) {
    currentPlayer = 1;
    otherPlayer = 2;
  } else if (game?.p2Id === uid) {
    currentPlayer = 2;
    otherPlayer = 1;
  }

  let turnCount = game?.turnCount;
  const playerTurnIndex = game && game[`p${currentPlayer}TurnIndex`];

  let [turnNum, setTurnNum] = useState<number>(playerTurnIndex || 0);
  console.log('TURN NUM', turnNum);

  const handleNextTurn = useCallback(() => {
    turnNum++;
    setTurnNum(turnNum)
  } , [turnNum]);
  
  if (!currentPlayer) {
    console.error('PLAYER NOT FOUND');
  }
 
  const turn = game && getTurn(game, turnNum);;
  const p1Cards = game && getTurnCards(game, turnNum, 1);
  const p2Cards = game && getTurnCards(game, turnNum, 2);

  console.log('CARDS', p1Cards, p2Cards);

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
      });
    }
    updateCards();    
    
  }, [gameId, game]);  // @TODO change game to cards

  // STATS

  const [selectedStat, setSelectedStat] = useState<StatParamType>();

  const handleSelectStat = useCallback((params: StatParamType) => {
    setSelectedStat(params);
  }, []);

  const handleConfirmStat = useCallback(() => {

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
      p1UpdatedCards = [...p1HandCards, p2TopCard, p1TopCard];
      p2UpdatedCards = [...p2HandCards]
    } else if (p1Value < p2Value) {
      result = 2;
      console.log('P2 WINS');
      p1UpdatedCards = [...p1HandCards];
      p2UpdatedCards = [...p2HandCards, p1TopCard, p2TopCard]
    } else { // @TODO make first condition ===
      result = 0;
      console.log('DRAW!');
    }

    let turn = {
      player: currentPlayer,
      result,
      statKey: statKey,
      p1Cards: p1UpdatedCards,
      p2Cards: p2UpdatedCards,
      p1Value,
      p2Value,
    };

    console.log('TURN', turn);

    async function updateTurn() {
      if (turnCount == undefined) {
        console.log('TURN COUNT UNDEFINED');
        return null;
      }
      console.log('UPDATE TURN');
      turnCount++;
      await db.collection('games').doc(gameId).update({
        [`turns.turn${turnCount}`]: turn,
        turnCount: turnCount,
        // [`p${currentPlayer}TurnIndex`]: turnCount,

      });
    }
    updateTurn();      

  } , [selectedStat, game, p1Cards, p2Cards, turnCount]);

  if (!game || !p1Cards || !p2Cards) return {game, cards: [], handleSelectStat};
  const [p1TopCardKey] = p1Cards; 
  const p1TopCard = game.pack.cards[p1TopCardKey];
  const [p2TopCardKey] = p2Cards; 
  const p2TopCard = game.pack.cards[p2TopCardKey];

  return {game, turn, p1TopCard, p2TopCard, selectedStat, handleSelectStat, handleConfirmStat, handleNextTurn};
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

function getTurn(game: GameType, turnNum: number) {
  if (turnNum === 0) return null;
  const turnKey = `turn${turnNum}`;
  return turnKey in game.turns ? game.turns[turnKey] : null;
}

function getTurnCards(game: GameType, turnNum: number, playerNum: null|1|2) {
  console.log('GET TURN CARDS', turnNum, playerNum, game.turns);
  if (!playerNum) return [];
  if (turnNum === 0) {
    console.log('NO TURNS');
    return game[`p${playerNum}InitialCards`];
  }
  console.log('TURN DUMP', `turn${turnNum}`, game.turns[`turn${turnNum}`]);
  return game.turns[`turn${turnNum}`][`p${playerNum}Cards`];
}

function GamePage() {

  const {gameId} = useParams<{gameId:string}>();
  // const gameId = 'HBqQxN5sDoLwqiGkABRu';

  const {game, turn, p1TopCard, p2TopCard, selectedStat, handleSelectStat, handleConfirmStat, handleNextTurn} = useGame(gameId);
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
        <button onClick={handleConfirmStat}>Play Card</button>
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