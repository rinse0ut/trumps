import React, { useCallback, useEffect, useState } from 'react';
import { Container, Label, Table, Icon } from 'semantic-ui-react';

type CategoryType = 'Age' | 'Height' | 'Bench' | 'Banter';

type CardType = {
  name: string;
  values: number[];
}

const CATEGORIES: CategoryType[] = ['Age', 'Height', 'Bench', 'Banter'];

const DATA: CardType[] = [
  { name: 'DT', values: [40, 188, 50, 100] },
  { name: 'Morgan', values: [45, 188, 50, 100] },
  { name: 'Will', values: [33, 188, 50, 100] },
  { name: 'Sunny', values: [37, 188, 50, 100] },
];

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function useGame() {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [player1Stack, setPlayer1Stack] = useState<CardType[]>([]);
  const [player2Stack, setPlayer2Stack] = useState<CardType[]>([]);
  const [drawnStack, setDrawnStack] = useState<CardType[]>([]);
  const [showCard, setShowCard] = useState<boolean>(false);

  // Shuffle and setup each player decks
  useEffect(() => {
    const numCards = DATA.length / 2;
    const index = Math.floor(Math.random() * numCards);
    for (let i = 0; i < numCards; i++) {
      const index = Math.floor(Math.random() * numCards);
      const [item] = DATA.splice(index, 1);
      setPlayer1Stack(prevState => [...prevState, item]);
    }
    setPlayer2Stack(DATA);
  }, [])

  const handleTurn = useCallback((categoryIndex: number) => {
    setShowCard(true);
    delay(3000).then(() => { 
      alert('Next turn?')
      setShowCard(false);
      handleCards(categoryIndex)
    });
  }, [player1Stack, player2Stack, drawnStack]);  
    
  const handleCards = useCallback((categoryIndex: number) => {
    const player1Card = player1Stack[0];
    const player2Card = player2Stack[0];
    const player1Value = player1Card['values'][categoryIndex];
    const player2Value = player2Card['values'][categoryIndex];
    const _player1Stack = player1Stack.slice(1);
    const _player2Stack = player2Stack.slice(1);

    if (player1Value > player2Value) {
      setPlayer1Stack([..._player1Stack, player2Card, player1Card, ...drawnStack]);
      setPlayer2Stack([..._player2Stack]);
      setDrawnStack([]);
      setCurrentPlayer(1);
    } else if (player1Value < player2Value) {
      setPlayer1Stack([..._player1Stack]);
      setPlayer2Stack([..._player2Stack, player2Card, player1Card, ...drawnStack]);
      setDrawnStack([]);
      setCurrentPlayer(2);
    } else {
      setPlayer1Stack([..._player1Stack]);
      setPlayer2Stack([..._player2Stack]);
      setDrawnStack([...drawnStack, player2Card, player1Card]);
    }
  }, [player1Stack, player2Stack, drawnStack])

  return { currentPlayer, showCard, player1Stack, player2Stack, drawnStack, handleTurn }
}

function App() {

  const { currentPlayer, showCard, player1Stack, player2Stack, drawnStack, handleTurn } = useGame();
  console.log('1UP STACK', player1Stack);
  console.log('2UP STACK', player2Stack);
  console.log('DRAWN STACK', drawnStack);
  if (player1Stack.length === 0 && player2Stack.length === 0) {
    return (<h1>ITS A DRAW!</h1>);
  }
  if (player1Stack.length === 0) {
    return (<h1>2UP WINS!</h1>);
  }
  if (player2Stack.length === 0) {
    return (<h1>1UP WINS!</h1>);
  }
  return (
    <Container>
      <h1>Player 1 ({player1Stack.length} Cards)</h1>
      {currentPlayer === 1 || showCard ? <CardComponent categories={CATEGORIES} onTurn={handleTurn} {...player1Stack[0]} /> : null}
      <h1>Player 2 ({player2Stack.length} Cards)</h1>
      {currentPlayer === 2 || showCard ? <CardComponent categories={CATEGORIES} onTurn={handleTurn} {...player2Stack[0]} /> : null}
    </Container>
  );
}

type CardPropsType = CardType & {
  categories: CategoryType[];
  onTurn: (categoryIndex: number) => void;
}

function CardComponent(props: CardPropsType) {
  const { name, values, onTurn } = props;
  return (
    <Table celled selectable unstackable size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='3'>{name.toUpperCase()}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {CATEGORIES.map((category, i) => (
          <Table.Row onClick={() => onTurn(i)}>
            <Table.Cell>{category}</Table.Cell>
            <Table.Cell>{values[i]}</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default App;
