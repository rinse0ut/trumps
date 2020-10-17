import React, { useCallback, useEffect, useState } from 'react';
import { Container, Table, Image, Flag, FlagNameValues, Segment, Header, Icon } from 'semantic-ui-react';

type CategoryType = 'status' | 'banter' | 'weight' | 'chess' | 'rounds';

type CardType = {
  name: string;
  countryCode: FlagNameValues;
  values: number[];
}

const CATEGORIES: CategoryType[] = ['status', 'banter', 'weight', 'chess', 'rounds'];

const META_DATA = [
  {
    category: 'status',
    title: 'Status',
    subCategories: ['🐌', '🛎', '🛋', '🐿', '🌎 🚀'],
  },
  {
    category: 'banter',
    title: 'Banter Level',
    subCategories: ['GNVQ', 'GCSE', 'A Level', 'Archbishop'],
  },
  {
    category: 'weight',
    title: 'Weight (kg)',
  },
  {
    category: 'chess',
    title: 'Chess Rating',
  },
  {
    category: 'rounds',
    title: 'Drink Rounds',
  },
]

const DATA: CardType[] = [
  {
    name: 'Dan',
    countryCode: 'uk',
    values: [2, 1, 125, 640, 5, 5]
  },
  {
    name: 'Mike',
    countryCode: 'uk',
    values: [0, 2, 3, 400, 5]
  },
  {
    name: 'Grant',
    countryCode: 'gb wls',
    values: [3, 2, 3, 0, 5]
  },
  {
    name: 'Will',
    countryCode: 'gb sct',
    values: [1, 2, 3, 700, 5]
  },
];

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

type PlayerType = 1 | 2;
type ResultType = null | 0 | 1 | 2;

const PLAYER1_RESULT = ['DRAWS!', 'WINS!', 'LOSES!']
const PLAYER2_RESULT = ['DRAWS!', 'LOSES!', 'WINS!']

function useGame() {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [player1Stack, setPlayer1Stack] = useState<CardType[]>([]);
  const [player2Stack, setPlayer2Stack] = useState<CardType[]>([]);
  const [drawnStack, setDrawnStack] = useState<CardType[]>([]);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [categoryIndex, setCategoryIndex] = useState<number | null>(null);
  const [result, setResult] = useState<ResultType>(null);

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

  // const handleTurn = useCallback((categoryIndex: number) => {
  //   setShowCard(true);
  //   delay(1).then(() => {
  //     // setShowCard(false);
  //     setCategoryIndex(categoryIndex)
  //   });
  // }, [player1Stack, player2Stack, drawnStack]);

  const handleTurn = useCallback((categoryIndex: number) => {
    const player1Card = player1Stack[0];
    const player2Card = player2Stack[0];
    const player1Value = player1Card['values'][categoryIndex];
    const player2Value = player2Card['values'][categoryIndex];
    const _player1Stack = player1Stack.slice(1);
    const _player2Stack = player2Stack.slice(1);

    setResult(null);
    setCategoryIndex(categoryIndex);

    if (player1Value > player2Value) {
      setPlayer1Stack([..._player1Stack, player2Card, player1Card, ...drawnStack]);
      setPlayer2Stack([..._player2Stack]);
      setDrawnStack([]);
      setCurrentPlayer(1);
      setResult(1);
    } else if (player1Value < player2Value) {
      setPlayer1Stack([..._player1Stack]);
      setPlayer2Stack([..._player2Stack, player2Card, player1Card, ...drawnStack]);
      setDrawnStack([]);
      setCurrentPlayer(2);
      setResult(2);
    } else {
      setPlayer1Stack([..._player1Stack]);
      setPlayer2Stack([..._player2Stack]);
      setDrawnStack([...drawnStack, player2Card, player1Card]);
      setResult(0);
    }
  }, [player1Stack, player2Stack, drawnStack, categoryIndex, result])

  return { currentPlayer, categoryIndex, result, player1Stack, player2Stack, drawnStack, handleTurn }
}

function App() {

  const {
    currentPlayer,
    player1Stack,
    player2Stack,
    drawnStack,
    categoryIndex,
    result,
    handleTurn
  } = useGame();

  console.log('1UP STACK', player1Stack);
  console.log('2UP STACK', player2Stack);
  console.log('DRAWN STACK', drawnStack);
  console.log('RESULT', result);
  if (player1Stack.length === 0 && player2Stack.length === 0) {
    return (<h1>ITS A DRAW!</h1>);
  }
  if (player1Stack.length === 0) {
    return (<h1>2UP WINS!</h1>);
  }
  if (player2Stack.length === 0) {
    return (<h1>1UP WINS!</h1>);
  }
  // return (
  //   <Container>
  //     {/* <Segment inverted color='red'>Player {currentPlayer}</Segment> */}
  //     <Segment color='red'><Header as='h1'>Player {currentPlayer} Go!</Header></Segment>
  //     <CardComponent categories={CATEGORIES} onTurn={handleTurn} {...player1Stack[0]} />
  //     {/* <CardComponent categories={CATEGORIES} onTurn={handleTurn} {...player1Stack[1]} />
  //     <CardComponent categories={CATEGORIES} onTurn={handleTurn} {...player2Stack[0]} />
  //     <CardComponent categories={CATEGORIES} onTurn={handleTurn} {...player2Stack[1]} /> */}
  //   </Container>
  // );  
  return (
    <Container>
      {/* <h1>Player 1 ({player1Stack.length} Cards)</h1> */}
      <Segment inverted color='red'><Header as='h2'>Player 1 {result && PLAYER1_RESULT[result]}</Header></Segment>
      {currentPlayer === 1 || result
        ? <CardComponent
          categories={CATEGORIES}
          categoryIndex={categoryIndex}
          player={1}
          result={result}
          onTurn={handleTurn}
          {...player1Stack[0]} /> : null}
      <Segment inverted color='blue'><Header as='h2'>Player 2 {result && PLAYER2_RESULT[result]}</Header></Segment>
      {currentPlayer === 2 || result
        ? <CardComponent
          categories={CATEGORIES}
          categoryIndex={categoryIndex}
          player={2}
          result={result}
          onTurn={handleTurn}
          {...player2Stack[0]} /> : null}
    </Container>
  );
}

function player1Result(result: ResultType) {
  if (result === 1) {
    return 'WINS!';
  } else if (result === 2) {
    return 'LOSES!'
  } else {
    return 'DRAWS!'
  }
}

type CardPropsType = CardType & {
  categories: CategoryType[];
  categoryIndex: number | null;
  player: PlayerType;
  result: number | null;
  onTurn: (categoryIndex: number) => void;
}

function CardComponent(props: CardPropsType) {
  console.log('CARD PROPS', props);
  const { name, countryCode, values, player, categoryIndex, result, onTurn } = props;
  return (
    <Table celled selectable unstackable size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='2'>{name.toUpperCase()}</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>
            <Flag name={countryCode} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='small' />
          </Table.Cell>
        </Table.Row>
        {CATEGORIES.map((category, i) => {
          const metaData = META_DATA.find(x => x.category === category);
          console.log('META', metaData);
          if (!metaData) return;
          const { title, subCategories } = metaData;
          const value = values[i];
          const stat = subCategories ? subCategories[value] : value;
          let status;
          if (categoryIndex === i && result === 0) {
            return (
              <Table.Row warning key={category} onClick={() => onTurn(i)}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{stat}</Table.Cell>
                <Table.Cell><Icon name='checkmark' /></Table.Cell>
              </Table.Row>
            )
          } else if (categoryIndex === i && result === player) {
            return (
              <Table.Row positive key={category} onClick={() => onTurn(i)}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{stat}</Table.Cell>
                <Table.Cell><Icon name='checkmark' /></Table.Cell>
              </Table.Row>
            )
          } else if (categoryIndex === i && result !== player) {
            return (
              <Table.Row negative key={category} onClick={() => onTurn(i)}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{stat}</Table.Cell>
                <Table.Cell><Icon name='close' /></Table.Cell>
              </Table.Row>
            )
          }
          return (
            <Table.Row key={category} onClick={() => onTurn(i)}>
              <Table.Cell>{title}</Table.Cell>
              <Table.Cell>{stat}</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  );
}

export default App;

//   { name: 'Captain Morgan', values: [45, 178, 60, 8] },
//   { name: 'Will', values: [33, 188, 95, 9] },
//   { name: 'Sunny', values: [37, 187, 0, -1] },
//   { name: 'American Ben', values: [32, 185, 90, 8] },
//   { name: 'Ant', values: [38, 187, 85, 6] },
//   { name: 'Dan', values: [33, 170, 96, 7] },
//   { name: 'Didun', values: [26, 171, 70, 8] },
//   { name: 'Mike', values: [34, 172, 87, 1] },
//   { name: 'Nick', values: [43, 188, 89, 5] },
//   { name: 'Pierce', values: [42, 188, 55, 7] },
//   { name: 'Rob', values: [42, 188, 52, 9] },
//   { name: 'Scouse', values: [34, 188, 61, 8] },
//   { name: 'Vinnie', values: [35, 173, 42, 7] },
//   { name: 'Grant', values: [35, 44, 79, 9] },
//   { name: 'Hitchy', values: [35, 45, 75, 3] },
//   { name: 'Tom Ted', values: [35, 191, 91, 2] },
//   { name: 'La Rocca Andy', values: [51, 178, 35, 8] },
//   { name: 'Donald Trump', values: [73, 190, 20, 2] },
//   { name: 'Adolf Hitler', values: [56, 160, 30, 5] },