import React, { useEffect, useCallback, useState } from "react";
import {getUsers} from '../services/firestore';
import {useParams} from 'react-router-dom';
import {db} from '../services/firestore';
import useCollection from '../hooks/useCollection';
import useDocument from '../hooks/useDocument';
import {CardsType, GameType} from '../types';
import Card from '../components/Card';
import { useAuthContext } from '../components/AuthProvider';

function useGame(gameId: string) {

  const game = useDocument<GameType>('games', gameId, true);
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

  const handleNextTurn = useCallback(() => {
    turnNum++;
    setTurnNum(turnNum)
  } , [turnNum]);
  
  if (!currentPlayer) {
    console.error('PLAYER NOT FOUND');
  }
  
  const p1Cards = game && getTurnCards(game, turnNum, 1);
  const p2Cards = game && getTurnCards(game, turnNum, 2);
  
  // const p1Cards = game && getTurnCards(game, turnNum, currentPlayer);
  // const p2Cards = game && getTurnCards(game, turnNum, otherPlayer);

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

  const handleSelectStat = useCallback((statKey: string) => {

    if (!p1Cards || !p2Cards) {
      return null;
    }

    let result;
    let p1UpdatedCards;
    let p2UpdatedCards;
    let drawnCards;

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
      p1UpdatedCards = [...p1HandCards, p1TopCard, p2TopCard];
      p2UpdatedCards = [...p2HandCards]
    } else if (p1Value < p2Value) {
      result = 2;
      console.log('P2 WINS');
      p1UpdatedCards = [...p1HandCards];
      p2UpdatedCards = [...p2HandCards, p2TopCard, p1TopCard]
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
        [`p${currentPlayer}TurnIndex`]: turnCount,

      });
    }
    updateTurn();      

  } , [game, p1Cards, p2Cards, turnCount]);

  const cards = currentPlayer === 1 ? p1Cards : p2Cards;
  console.log('CARDS', cards);
  if (!game || !cards) return {game, cards: [], handleSelectStat};
  const [topCard] = cards;
  const currentCard = topCard && game.pack.cards[topCard];

  return {game, currentCard, handleSelectStat, handleNextTurn};
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

  const {game, currentCard, handleSelectStat, handleNextTurn} = useGame(gameId);

  if (!game || !currentCard) return (
    <div>Loading...</div>
  );

  return (
    <>
    <div>GAME PAGE</div>
    <button onClick={handleNextTurn}>
      Next Turn
    </button>
    <Card 
      card={currentCard} 
      stats={game.pack.stats}
      selectedStatKey={null}
      onSelectStat={handleSelectStat}
     />
    </>
  )
}

export default GamePage;