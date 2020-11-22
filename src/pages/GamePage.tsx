import React, { useEffect, useCallback, useState } from "react";
import {useParams} from 'react-router-dom';
import {db} from '../services/firestore';
import useDocument from '../hooks/useDocument';
import {CardsType, GameType, StatParamType} from '../types';
import Card from '../components/Card';
import { useAuthContext } from '../components/AuthProvider';
import {TitleBar, Footer} from '../components/Layout';
import { Button, Container } from 'semantic-ui-react';
import Loading from '../components/Loading';
import styled from 'styled-components';

function useGame(gameId: string) {

  const game = useDocument<GameType>('games', gameId, true);
  const stats = game?.pack.stats;
  const [error, setError] = useState<string>();

  // console.log('GAME', gameId, game);

  // CURRENT PLAYER
  const {currentUser} = useAuthContext();
  const uid = currentUser?.uid;
  let currentPlayer: null|1|2 = null;
  let currentUsername;
  let opponentUsername;
  if (game?.p1Id === uid) {
    currentPlayer = 1;
    currentUsername = game?.p1Username;
    opponentUsername = game?.p2Username;
  } else if (game?.p2Id === uid) {
    currentPlayer = 2;
    currentUsername = game?.p2Username;
    opponentUsername = game?.p1Username;
  }
  //  else {
  //   currentPlayer = 1;
  //   game && setError('You are not a player in this game!')
  // }
  const startingPlayer = Math.floor(Math.random() * 2) + 1;

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
          player: 1,
          // player: startingPlayer,
          p1Cards, 
          p2Cards,
          drawCards: [],
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
  const drawCards = game && getTurnCards(game, currentTurn, 0);

  console.log('DRAW CARDS', drawCards);

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
    let drawUpdatedCards: string[] = [];

    const {statKey} = selectedStat;
    const [p1TopCard, ...p1HandCards] = p1Cards;
    const [p2TopCard, ...p2HandCards] = p2Cards;
    const p1Value = Number(game?.pack.cards[p1TopCard][statKey]);
    const p2Value = Number(game?.pack.cards[p2TopCard][statKey]);

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
      drawUpdatedCards = drawCards.length > 0 ? [...drawCards, p1TopCard, p2TopCard] : [p1TopCard, p2TopCard];
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
          drawCards: drawUpdatedCards,
          statKey: null,
          result: null,
        },
        turnNumber: nextTurn,
      });
    }
    updateTurn();
    
    setSelectedStat(null);

  }, [selectedStat, game, p1Cards, p2Cards, drawCards, currentTurn]);

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

  console.log((selectedStat && !turn?.result), selectedStat, !turn?.result);

  return {game, error, turn, currentTurn, turnPlayer, currentPlayer, currentUsername, opponentUsername, topCards, selectedStat, handleSelectStat, handleTurn, handleNextTurn, debug};
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

function getTurnCards(game: GameType, turn: number, playerNum: null|0|1|2) {
  if (!game.turns || turn === 0) return [];
  if (playerNum === 0) return game.turns[`turn${turn}`][`drawCards`]; 
  console.log('TURN DUMP', turn);
  return game.turns[`turn${turn}`][`p${playerNum}Cards`];
}

function GamePage() {

  const {gameId} = useParams<{gameId:string}>();
  // const gameId = 'HBqQxN5sDoLwqiGkABRu';

  const {game, error, turn, currentTurn, turnPlayer, currentPlayer, currentUsername, opponentUsername, topCards, selectedStat, handleSelectStat, handleTurn, handleNextTurn, debug} = useGame(gameId);
  const [p1TopCard, p2TopCard] = topCards;

  const currentCard = currentPlayer === 1 ? p1TopCard : p2TopCard;
  const opponentCard = currentPlayer === 1 ? p2TopCard : p1TopCard;
  const statKey = turn?.statKey;

  let resultMsg;
  let currentEmoji;
  let opponentEmoji;

  if (turn?.result === currentPlayer) {
    resultMsg = 'You won the round! ✅';
    currentEmoji = '😃';
    opponentEmoji = '😢';
  } else if (turn?.result === 0) {
    resultMsg = 'You drew the round! ↔️';
    currentEmoji = '😮';
    opponentEmoji = '😮';
  } else if (turn?.result) {
    resultMsg = 'You lost the round! ❌';
    currentEmoji = '😢';
    opponentEmoji = '😃';
  }

  if (!game) return (
    <Loading/> 
  );

  // if (error) return (
  //   <Message username="Games Master">{error}</Message>
  // );  

  if (!currentCard && !opponentCard) {
    return (
      <>
        <TitleBar.Source>Game Over!</TitleBar.Source>
        <Message username="Games Master" color="green">Good game! It's a draw! 🤷‍♂️</Message>
      </>
    )
    } else if (!opponentCard) {
    return (
      <>
        <TitleBar.Source>Game Over!</TitleBar.Source>
        <Message username="Games Master" color="green">Good game! {currentUsername} wins! 🎉</Message>
      </>
    )
  } else if (!currentCard) {
    return (
      <>
        <TitleBar.Source>Game Over!</TitleBar.Source>
        <Message username="Games Master" color="green">Good game! {opponentUsername} wins! ☠️</Message>
      </>
    )
  }
  return (
    <Container>
    <TitleBar.Source>Game On!</TitleBar.Source>
    {currentPlayer === turnPlayer ? (
      <Message username="Games Master" color="green">Round {currentTurn}. Your turn {currentUsername}. Tap that stat!</Message>
    ) : (
      <Message username="Games Master" color="green">Round {currentTurn}. {opponentUsername}'s turn.</Message>
    )}
    {statKey && (
      <>
        {currentPlayer === turnPlayer ? (
          <>
            <Message username={currentUsername} align="right" color="CornflowerBlue">{game.pack.stats[statKey].title}: {currentCard[statKey]}</Message>
            <Message username={opponentUsername} color="orange">{game.pack.stats[statKey].title}: {opponentCard[statKey]} {opponentEmoji}</Message>
          </>
        ) : (
          <>
            <Message username={opponentUsername} color="orange">{game.pack.stats[statKey].title}: {opponentCard[statKey]}</Message>
            <Message username={currentUsername} align="right" color="CornflowerBlue">{game.pack.stats[statKey].title}: {currentCard[statKey]} {currentEmoji}</Message>
          </>
        )}        
      </>
    )}         
    {resultMsg && (
      <Message username="Games Master" color="green">{resultMsg}</Message>
    )}
    { currentCard && 
      <Card 
        card={currentCard} 
        stats={game.pack.stats}
        selectedStatKey={turn?.statKey}
        player={currentPlayer}
        result={turn?.result && turn.result} // TODO fix
        onSelectStat={handleSelectStat}
        disabled={(turn?.result != null || turnPlayer !== currentPlayer)}
      />
     }
     {/* <pre>
       {JSON.stringify(debug, null, 2)}
     </pre>      */}
     <Footer>
      {/* {(!selectedStat || !turn?.result) && 'You have X Cards in your hand'}  */}
      {/* {(selectedStat || turn?.result === null) && ( */}
      {(selectedStat && currentTurn === game.turnNumber && currentPlayer === turnPlayer) && (
        <Button circular color='green' icon='play' size='huge' onClick={handleTurn} />
      )}     
      {(currentTurn < game.turnNumber && turn?.result != null) && ( 
        <Button circular color='green' icon='fast forward' size='huge' onClick={handleNextTurn} />
      )}    
     </Footer>
    </Container>
  )
}

const StyledMessage = styled.div<{align: 'left'|'right', color: string}>`
  float: ${props => props.align === 'right' ? 'right' : 'left' };
  width: 90%;
  margin: 5px;
  padding: 5px;
  border-radius: ${props => props.align === 'right' ? '10px 0px 10px 10px' : '0px 10px 10px 10px' };
  background: ${props => props.align === 'right' ? '#dcf8c6' : 'white' };
  border: 1px solid grey;
  color: ${props => props.color};
`;

function Message({username, children, align = 'left', color}: {username: string, children: any; align?: 'left'|'right', color: string}) {
  return (
    <StyledMessage align={align} color={color}>
      <b>{username}:</b><br/>
      <span style={{color: 'black'}}>{children}</span>
    </StyledMessage>
  )  
}

export default GamePage;