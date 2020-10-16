import React, { useCallback, useEffect, useState } from 'react';
import { Container, Card, Table, Icon } from 'semantic-ui-react';

type CardType = {
  name: string;
  description: string;
  age: number;
  height: number;
  bench: number;
  banter: number;
}

type StatsType = 'age' | 'height' | 'bench' | 'banter';

const DATA: CardType[] = [
  { name: 'DT', description: 'Intro...', age: 40, height: 188, bench: 60, banter: 100 },
  { name: 'Sunny', description: 'Intro...', age: 37, height: 188, bench: 60, banter: 100 },
  { name: 'Morgan', description: 'Intro...', age: 45, height: 177, bench: 70, banter: 100 },
  { name: 'Grant', description: 'Intro...', age: 36, height: 150, bench: 60, banter: 100 },
  { name: 'Rob', description: 'Intro...', age: 36, height: 180, bench: 60, banter: 100 },
  { name: 'Will', description: 'Intro...', age: 33, height: 150, bench: 60, banter: 100 },
  { name: 'Stevooo', description: 'Intro...', age: 41, height: 180, bench: 60, banter: 100 },
  { name: 'Scouse', description: 'Intro...', age: 35, height: 150, bench: 60, banter: 100 },
];

function useGame() {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [player1Stack, setPlayer1Stack] = useState<CardType[]>([]);
  const [player2Stack, setPlayer2Stack] = useState<CardType[]>([]);
  const [drawnStack, setDrawnStack] = useState<CardType[]>([]);

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

  const handleTurn = useCallback((stat: StatsType) => {

    const player1Card = player1Stack[0];
    const player2Card = player2Stack[0];
    const player1Value = player1Card[stat];
    const player2Value = player2Card[stat];
    const _player1Stack = player1Stack.slice(1);
    const _player2Stack = player2Stack.slice(1);

    if (player1Value > player2Value) {
      console.log('1UP WINS', _player1Stack)
      setPlayer1Stack([..._player1Stack, player2Card, player1Card, ...drawnStack]);
      setPlayer2Stack([..._player2Stack]);
      setDrawnStack([]);
    } else if (player1Value < player2Value) {
      setPlayer1Stack([..._player1Stack]);
      setPlayer2Stack([..._player2Stack, player2Card, player1Card, ...drawnStack]);
      setDrawnStack([]);
    } else {
      console.log('DRAW!')
      setPlayer1Stack([..._player1Stack]);
      setPlayer2Stack([..._player2Stack]);
      setDrawnStack([...drawnStack, player2Card, player1Card]);
    }
    console.log('SELECTED VALUES', player1Value, player2Value);
  }, [player1Stack, player2Stack, drawnStack])

  return { currentPlayer, player1Stack, player2Stack, drawnStack, handleTurn }
}

function App() {

  const { player1Stack, player2Stack, drawnStack, handleTurn } = useGame();
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
      <h1>1up Stack ({player1Stack.length} Cards)</h1>
      <CardComponent {...player1Stack[0]} onTurn={handleTurn} />
      {/* {player1Stack.map((props: CardType) => <CardComponent {...props} onTurn={handleTurn} />)} */}
      <h1>2up Stack ({player2Stack.length} Cards)</h1>
      <CardComponent {...player2Stack[0]} onTurn={handleTurn} />
      {/* {player2Stack.map((props: CardType) => <CardComponent {...props} onTurn={handleTurn} />)} */}
    </Container>
  );
}

type CardPropsType = CardType & {
  onTurn: (stat: StatsType) => void;
}

function CardComponent(props: CardPropsType) {
  const { name, description, age, height, bench, banter, onTurn } = props;
  return (
    <Card>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        {/* <Card.Description>
          {description}
        </Card.Description> */}
      </Card.Content>
      <Card.Content extra>
        <Table celled selectable size="small">
          <Table.Body>
            <Table.Row onClick={() => onTurn('age')}>
              <Table.Cell>Age</Table.Cell>
              <Table.Cell>{age}</Table.Cell>
            </Table.Row>
            <Table.Row onClick={() => onTurn('height')}>
              <Table.Cell>Height</Table.Cell>
              <Table.Cell>{height}</Table.Cell>
            </Table.Row>
            <Table.Row onClick={() => onTurn('bench')}>
              <Table.Cell>Bench Press</Table.Cell>
              <Table.Cell>{bench}</Table.Cell>
            </Table.Row>
            <Table.Row onClick={() => onTurn('banter')}>
              <Table.Cell>Banter</Table.Cell>
              <Table.Cell>{banter}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
}

export default App;
