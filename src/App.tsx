import React, {useState} from 'react';
import { Container, Card, Table, Icon } from 'semantic-ui-react';

type CardType = {
  name: string;
  description: string;
  age: number;
  height: number;
  bench: number;
  banter: number;
}

const DATA: CardType[] = [
  { name: 'DT', description: 'Intro...', age: 40, height: 188, bench: 60, banter: 99 },
  { name: 'Sunny', description: 'Intro...', age: 37, height: 188, bench: 60, banter: 99 },
  { name: 'Morgan', description: 'Intro...', age: 45, height: 188, bench: 60, banter: 99 },
  { name: 'Grant', description: 'Intro...', age: 36, height: 188, bench: 60, banter: 99 },
]

function useGame() {
  const [currentPlayer, setCurrentPlayer] = useState<1|2>(1);
  const [player1Stack, setPlayer1Stack] = useState<CardType[]>([]);
  const [player2Stack, setPlayer2Stack] = useState<CardType[]|[]>([]);
  const [drawnStack, setDrawnStack] = useState<CardType[]|[]>([]);
  let stack1:CardType[] = [];

  return {currentPlayer, player1Stack, player2Stack, setCurrentPlayer, setPlayer1Stack, setPlayer2Stack, setDrawnStack};
}

function App() {

  const {currentPlayer, player1Stack, player2Stack, setCurrentPlayer, setPlayer1Stack, setPlayer2Stack, setDrawnStack} = useGame();
  const data = [...DATA];
  let _player1Stack:CardType[] = [];
    console.log('INIT DATA', data);

  // Split the cards into two random decks
  // for (let i = 0; i < data.length/2; i++) {
  //   const index = Math.floor(Math.random() * DATA.length);
  //   const [item] = data.splice(index, 1);
  //   console.log('DATA', data);
  //   console.log('ITEM', item);
  //   console.log('i ---->', i);
  //   _player1Stack = [..._player1Stack, item];
  //   // if (player1Stack.length < data.length / 2) {
  //     // setPlayer1Stack(prevState => [...prevState, item]);
  //   // }
  // }
  // console.log('1UP', _player1Stack);
  // setPlayer1Stack(_player1Stack);
  // setPlayer2Stack(data);
  setPlayer1Stack([DATA[0],DATA[1]]);
  setPlayer2Stack([DATA[2],DATA[3]]);
  
  if (player1Stack.length === 0 || player2Stack.length === 0) {
    return (<p>Loading</p>);
  } 
  return (
    <Container>
      <h1>1up Stack</h1>
      {player1Stack.length && player1Stack.map((props: CardType) => <CardComponent {...props}/>)}
      <h1>2up Stack</h1>
      {/* {player2Stack.map(CardCompoent)} */}
    </Container>
  );
}

function CardComponent({ name, description, age, height, bench, banter }: CardType) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Table celled selectable size="small">
          <Table.Body>
            <Table.Row onClick={() => console.log('CLICK')}>
              <Table.Cell>Age</Table.Cell>
              <Table.Cell>{age}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Height</Table.Cell>
              <Table.Cell>{height}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Bench Press</Table.Cell>
              <Table.Cell>{bench}</Table.Cell>
            </Table.Row>
            <Table.Row>
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
