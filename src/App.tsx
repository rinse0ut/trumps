import React, { useCallback, useEffect, useState } from 'react';
import { Container, Label, Table, Icon } from 'semantic-ui-react';

type CategoryType = 'Age' | 'Height' | 'Strength' | 'Skill';

type CardType = {
  name: string;
  values: number[];
}

const CATEGORIES: CategoryType[] = ['Age', 'Height', 'Strength', 'Skill'];

const DATA: CardType[] = [
  { name: 'DT', values: [40, 188, 50, 10] },
  { name: 'Captain Morgan', values: [45, 178, 50, 80] },
  { name: 'Will', values: [33, 188, 90, 99] },
  { name: 'Sunny', values: [37, 187, 1, 0] },
  { name: 'American Ben', values: [32, 185, 90, 8] },
  { name: 'Ant', values: [38, 187, 120, 6] },
  { name: 'Dan', values: [33, 170, 130, 7] },
  { name: 'Didun', values: [26, 171, 120, 8] },
  { name: 'Mike', values: [34, 172, 120, 1] },
  { name: 'Nick', values: [43, 188, 1250, 5] },
  { name: 'Pierce', values: [42, 188, 60, 7] },
  { name: 'Rob', values: [42, 188, 120, 9] },
  { name: 'Scouse', values: [34, 188, 70, 8] },
  { name: 'Vinnie', values: [35, 173, 40, 7] },
  { name: 'Grant', values: [35, 44, 110, 9] },
  { name: 'Hitchy', values: [35, 45, 100, 3] },
  { name: 'Tom Ted', values: [35, 191, 130, 3] },
  { name: 'La Rocca Andy', values: [51, 178, 70, 8] },
  { name: 'Donald Trump', values: [73, 190, 20, 2] },
  { name: 'Adolf Hitler', values: [56, 160, 30, 5] },
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
