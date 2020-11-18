import React, { useEffect, useCallback, useState } from "react";
import {getUsers} from '../services/firestore';
import {useParams} from 'react-router-dom';
import {db} from '../services/firestore';
import useCollection from '../hooks/useCollection';
import useDocument from '../hooks/useDocument';
import {CardsType, GameType, StatParamType} from '../types';
import Card from '../components/Card';
import { useAuthContext } from '../components/AuthProvider';

/*
Pack class
  init(cards)
  deal(hands)
  getCard()
*/

function useGame(gameId: string) {

  const game = useDocument<GameType>('games', gameId, true);
  const stats = game?.pack.stats;

  // console.log('GAME', gameId, game);

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
    if (!cards || turns) return;
    const [p1Cards, p2Cards] = deal(cards);
    async function updateCards() {
      await db.collection('games').doc(gameId).update({
        turnNumber: 1,
        p1TurnNumber: 1,
        p2TurnNumber: 1,
        "turns.turn1":  {
          id: 1,
          player: currentPlayer,
          p1Cards, 
          p2Cards,
          statKey: null,
          result: null,
        }  
      });
    }
    updateCards();    
  }, [gameId, game]);  // @TODO change game to cards

  // TURN
  let turnNumber = game?.turnNumber;
  const playerTurnNumber: number = game ? game[`p${currentPlayer}TurnNumber`] : 1;

  let [currentTurn, setCurrentTurn] = useState<number>(playerTurnNumber); // rename to playerTurn
  if (currentTurn !== playerTurnNumber) {
    setCurrentTurn(playerTurnNumber);
  }


  const handleNextTurn = useCallback(() => {
    const nextTurn = currentTurn+1;
    if (nextTurn > turnNumber) {
      console.log('HANDLE NEXT TURN STOP?', nextTurn, turnNumber);
      // return null;
    }
    async function updateTurn() {
      await db.collection('games').doc(gameId).update({
        [`p${currentPlayer}TurnNumber`]: nextTurn,
      });
    }
    updateTurn();   
    setCurrentTurn(nextTurn);
  } , [currentTurn, currentPlayer]);
  
  if (!currentPlayer) {
    console.error('PLAYER NOT FOUND');
  }

  const turn = game && getTurn(game, currentTurn);
  const turnPlayer = turn?.player;
  const p1Cards = game && getTurnCards(game, currentTurn, 1);
  const p2Cards = game && getTurnCards(game, currentTurn, 2);

  // STATS
  const [selectedStat, setSelectedStat] = useState<StatParamType|null>(null);

  const handleSelectStat = useCallback((params: StatParamType) => {
    if (turnPlayer === currentPlayer) {
      setSelectedStat(params); 
    }
  }, [turnPlayer, currentPlayer]);

  const handleTurn = useCallback(() => {
    if (!selectedStat || p1Cards.length === 0 || p2Cards.length === 0) {
      return null;
    }
    let result: number;
    let p1UpdatedCards: string[];
    let p2UpdatedCards: string[];
    let drawCards: string[] = [];

    const {statKey} = selectedStat;
    const [p1TopCard, ...p1HandCards] = p1Cards;
    const [p2TopCard, ...p2HandCards] = p2Cards;
    const p1Value = game?.pack.cards[p1TopCard][statKey];
    const p2Value = game?.pack.cards[p2TopCard][statKey];

    if (!p1Value || !p2Value) {
      return null;
    }

    if (p1Value > p2Value) {
      result = 1;
      p1UpdatedCards = [...p1HandCards, p2TopCard, ...drawCards, p1TopCard];
      p2UpdatedCards = [...p2HandCards]
    } else if (p1Value < p2Value) {
      result = 2;
      p1UpdatedCards = [...p1HandCards];
      p2UpdatedCards = [...p2HandCards, p1TopCard, ...drawCards, p2TopCard]
    } else { // @TODO make first condition ===
      result = 0;
      p1UpdatedCards = [...p1HandCards];
      p2UpdatedCards = [...p2HandCards]; 
      drawCards = [...drawCards, p1TopCard, p2TopCard,];
    }

    async function updateTurn() {
      if (currentTurn == undefined) {
        console.log('TURN COUNT UNDEFINED');
        return null;
      }
      const nextTurn = currentTurn + 1;
      const nextPlayer = result === 0 ? currentPlayer : result;
      await db.collection('games').doc(gameId).update({
        [`turns.turn${currentTurn}.statKey`]: statKey,
        [`turns.turn${currentTurn}.result`]: result,
        [`turns.turn${nextTurn}`]: {
          id: nextTurn,
          player: nextPlayer, 
          p1Cards: p1UpdatedCards,
          p2Cards: p2UpdatedCards,
          drawCards,
          statKey: null,
          result: null,
        },
        turnNumber: nextTurn,
      });
    }
    updateTurn();
    
    setSelectedStat(null);

  }, [selectedStat, game, p1Cards, p2Cards, currentTurn]);

  if (!game || !p1Cards || !p2Cards) return {game, turn, currentTurn, currentPlayer, topCards: [], handleSelectStat};
  const [p1TopCardKey] = p1Cards; 
  const p1TopCard = game?.pack.cards[p1TopCardKey];
  const [p2TopCardKey] = p2Cards; 
  const p2TopCard = game?.pack.cards[p2TopCardKey];
  const topCards = [p1TopCard, p2TopCard];

  const debug = {
    turnId: turn?.id, 
    turnNo: game.turnNumber,
    p1TurnNo: game.p1TurnNumber,
    p2TurnNo: game.p2TurnNumber,
    currentPlayer, 
    turnPlayer, 
    turn
  };

  console.table({turnId: turn?.id, 
    turnNo: game.turnNumber,
    p1TurnNo: game.p1TurnNumber,
    p2TurnNo: game.p2TurnNumber,
    currentPlayer, 
    turnPlayer,
  });
  console.table(game?.turns);
  
  console.log(debug);

  return {game, turn, currentTurn, turnPlayer, currentPlayer, topCards, selectedStat, handleSelectStat, handleTurn, handleNextTurn, debug};
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
  if (!game.turns || turn === 0) return null;
  const turnKey = `turn${turn}`;
  return turnKey in game.turns ? game.turns[turnKey] : null;
}

function getTurnCards(game: GameType, turn: number, playerNum: null|1|2) {
  if (!game.turns || turn === 0) return [];
  console.log('TURN DUMP', turn);
  return game.turns[`turn${turn}`][`p${playerNum}Cards`];
}

function GamePage() {

  const {gameId} = useParams<{gameId:string}>();
  // const gameId = 'HBqQxN5sDoLwqiGkABRu';

  const {game, turn, currentTurn, turnPlayer, currentPlayer, topCards, selectedStat, handleSelectStat, handleTurn, handleNextTurn, debug} = useGame(gameId);
  const [p1TopCard, p2TopCard] = topCards;

  const currentCard = currentPlayer === 1 ? p1TopCard : p2TopCard;
  const opponentCard = currentPlayer === 1 ? p2TopCard : p1TopCard;
  const statKey = turn?.statKey;

  let resultMsg;

  if (turn?.result === currentPlayer) {
    resultMsg = 'Yay! You won the round! :)';
  } else if (turn?.result === 0) {
    resultMsg = 'Ok! You drew the round! :)';
  } else if (turn?.result) {
    resultMsg = 'Oh noes! You lost the round! :(';
  }

  if (!game) return (
    <div>Loading...</div>
  );

  return (
    <>
    <div>GAME PAGE</div>
    { !p1TopCard && <div>Player 2 Wins</div> }
    { !p2TopCard && <div>Player 1 Wins</div> }

    {currentPlayer === turnPlayer ? (
      <Message username="Games Master">Round {currentTurn}. Your turn. Tap that stat!</Message>
    ) : (
      <Message username="Games Master">Round {currentTurn}. {turn?.result ? 'Their go' : 'Please wait for them to choose'}</Message>
    )}
    {statKey && (
      <>
        {currentPlayer === turnPlayer ? (
          <>
            <Message username="You" align="right">{game.pack.stats[statKey].title}: {currentCard[statKey]}</Message>
            <Message username="Them">{game.pack.stats[statKey].title}: {opponentCard[statKey]}</Message>
          </>
        ) : (
          <>
            <Message username="Them">{game.pack.stats[statKey].title}: {opponentCard[statKey]}</Message>
            <Message username="You" align="right">{game.pack.stats[statKey].title}: {currentCard[statKey]}</Message>
          </>
        )}        
      </>
    )}         
    {resultMsg && (
      <Message username="Games Master">{resultMsg}</Message>
    )}
    { currentCard && 
      <Card 
        card={currentCard} 
        stats={game.pack.stats}
        selectedStatKey={null}
        onSelectStat={handleSelectStat}
      />
     }
    {selectedStat && (
      <>
        <button onClick={handleTurn}>Play Card?</button>
      </>
    )}     
    {(currentTurn < game.turnNumber && turn?.result != null) && ( 
      <button onClick={handleNextTurn}>
        Next Card {currentTurn + 1}
      </button>
    )}    
     <pre>
       {JSON.stringify(debug, null, 2)}
     </pre>
    </>
  )
}

function Message({username, children, align = 'left'}: {username: string, children: any; align?: 'left'|'right'}) {
  return (
    <div style={{
      float: align,
      width: '90%',
      margin: 5,
      padding: 5,
      border: '1px solid grey',
      borderRadius: 5,
    }}>
      <b>{username}:</b><br/>
      {children}
    </div>
  )  
}

export default GamePage;