import { useCallback, useEffect, useState } from 'react';
import { CardType, CategoryType } from '../types';

type ResultType = null | 0 | 1 | 2;

function useGame(categories: CategoryType[], cards: CardType[]) {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [player1Stack, setPlayer1Stack] = useState<CardType[]>([]);
  const [player2Stack, setPlayer2Stack] = useState<CardType[]>([]);
  const [drawnStack, setDrawnStack] = useState<CardType[]>([]);
  const [categoryIndex, setCategoryIndex] = useState<number | null>(null);
  const [result, setResult] = useState<ResultType>(null);

  // Shuffle and deal cards
  useEffect(() => {
    const numCards = cards.length / 2;
    const index = Math.floor(Math.random() * numCards);
    for (let i = 0; i < numCards; i++) {
      const index = Math.floor(Math.random() * numCards);
      const [item] = cards.splice(index, 1);
      setPlayer1Stack(prevState => [...prevState, item]);
    }
    setPlayer2Stack(cards);
  }, [cards])

  const handleSelectCategory = useCallback((categoryIndex: number) => {
    if (result) {
      return;
    }
    setCategoryIndex(categoryIndex);
    const category = categories[categoryIndex]
    let player1Value = player1Stack[0]['values'][categoryIndex];
    let player2Value = player2Stack[0]['values'][categoryIndex];

    if (category.ranking && typeof player1Value === 'string' && typeof player2Value === 'string') {
      player1Value = category.ranking.indexOf(player1Value);
      player2Value = category.ranking.indexOf(player2Value);
    }

    if (player1Value > player2Value) {
      setCurrentPlayer(1);
      setResult(1);
    } else if (player1Value < player2Value) {
      setCurrentPlayer(2);
      setResult(2);
    } else {
      setResult(0);
    }

  }, [categories, player1Stack, player2Stack, result]);

  const handleTurn = useCallback(() => {
    const player1Card = player1Stack[0];
    const player2Card = player2Stack[0];
    const _player1Stack = player1Stack.slice(1);
    const _player2Stack = player2Stack.slice(1);

    if (result === 1) {
      setPlayer1Stack([..._player1Stack, player2Card, player1Card, ...drawnStack]);
      setPlayer2Stack([..._player2Stack]);
      setDrawnStack([]);
      setCurrentPlayer(1);
      setResult(1);
    } else if (result === 2) {
      setPlayer1Stack([..._player1Stack]);
      setPlayer2Stack([..._player2Stack, player2Card, player1Card, ...drawnStack]);
      setDrawnStack([]);
      setCurrentPlayer(2);
      setResult(2);
    } else if (result === 0) {
      setPlayer1Stack([..._player1Stack]);
      setPlayer2Stack([..._player2Stack]);
      setDrawnStack([...drawnStack, player2Card, player1Card]);
      setResult(0);
    }
    setResult(null);
    setCategoryIndex(null);
  }, [player1Stack, player2Stack, drawnStack, result])

  return { currentPlayer, categoryIndex, result, player1Stack, player2Stack, drawnStack, handleSelectCategory, handleTurn }
}

export default useGame;