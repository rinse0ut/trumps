import React, { useCallback, useEffect, useState } from 'react';
import { Container, Table, Image, Flag, FlagNameValues, Segment, Header, Button, Icon, Message } from 'semantic-ui-react';
import will from './img/will.jpeg';
import dan from './img/dan.jpeg';
import ben from './img/ben.jpeg';
import sunny from './img/sunny.jpeg';
import morgan from './img/morgan.jpeg';
import didun from './img/didun.jpeg';
import mike from './img/mike.jpeg';
import ant from './img/ant.jpeg';
import nick from './img/nick.jpeg';
import pierce from './img/pierce.jpeg';
import scouse from './img/scouse.jpeg';
import vinnie from './img/vinnie.jpeg';
import grant from './img/grant.jpeg';
import rob from './img/rob.jpeg';
import dt from './img/dt.jpeg';
import stevooo from './img/stevooo.jpeg';

type CategoryType = 'status' | 'banter' | 'weight' | 'chess';

type CardType = {
  name: string;
  countryCode: FlagNameValues;
  img: any;
  values: (string | number)[];
}

const CATEGORIES: CategoryType[] = ['status', 'banter', 'weight', 'chess'];

const META_DATA = [
  {
    category: 'status',
    title: 'Status',
    ranking: ['🐌', '🛎', '🛋', '🐿', '🌎 🚀'],
  },
  {
    category: 'banter',
    title: 'Banter Level',
    ranking: ['GNVQ', 'GCSE', 'A Level', 'Covid20'],
  },
  {
    category: 'weight',
    title: 'Weight (kg)',
  },
  {
    category: 'chess',
    title: 'Chess Rating',
  }
]

const DATA: CardType[] = [
  {
    name: 'DT',
    countryCode: 'uk',
    img: dt,
    values: ['🛋', 'Covid20', 88, 935]
  },
  {
    name: 'Grant',
    countryCode: 'gb wls',
    img: grant,
    values: ['🐿', 'GNVQ', 65, 0]
  },
  // {
  //   name: 'Captain Morgan',
  //   countryCode: 'gb sct',
  //   img: morgan,
  //   values: [2, 1, 68, 1078]
  // },  
  // {
  //   name: 'Sunny',
  //   countryCode: 'uk',
  //   img: sunny,
  //   values: [1, 0, 94, 1261]
  // },    
  // {
  //   name: 'American Ben',
  //   countryCode: 'us',
  //   img: ben,
  //   values: [4, 1, 95, 0]
  // },     
  // {
  //   name: 'Will',
  //   countryCode: 'gb sct',
  //   img: will,
  //   values: [4, 2, 90, 669]
  // },  
  // {
  //   name: 'Rob',
  //   countryCode: 'uk',
  //   img: rob,
  //   values: [3, 2, 70, 600]
  // },
  // {
  //   name: 'Scouse',
  //   countryCode: 'gb sct',
  //   img: scouse,
  //   values: [2, 1, 85, 1149]
  // },
  // {
  //   name: 'Vinnie',
  //   countryCode: 'gb wls',
  //   img: vinnie,
  //   values: [4, 2, 80, 0]
  // },
  // {
  //   name: 'Didun',
  //   countryCode: 'gb wls',
  //   img: didun,
  //   values: [4, 1, 80, 600]
  // },  
  // {
  //   name: 'Nick',
  //   countryCode: 'uk',
  //   img: nick,
  //   values: [0, 1, 99, 500]
  // },
  // {
  //   name: 'Pierce',
  //   countryCode: 'uk',
  //   img: pierce,
  //   values: [2, 1, 70, 0]
  // },
  // {
  //   name: 'Dan',
  //   countryCode: 'gb sct',
  //   img: dan,
  //   values: [2, 1, 125, 746]
  // },  
  // {
  //   name: 'Ant',
  //   countryCode: 'uk',
  //   img: ant,
  //   values: [2, 1, 90, 0]
  // },  
  // {
  //   name: 'Mike',
  //   countryCode: 'uk',
  //   img: mike,
  //   values: [0, 1, 97, 300]
  // }, 
  // {
  //   name: 'Stevooo',
  //   countryCode: 'uk',
  //   img: stevooo,
  //   values: [3, 1, 95, 0]
  // },   
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

  const handleSelectCategory = useCallback((categoryIndex: number) => {
    if (result) {
      return;
    }
    setCategoryIndex(categoryIndex);
    const category = META_DATA[categoryIndex]
    let player1Value = player1Stack[0]['values'][categoryIndex];
    let player2Value = player2Stack[0]['values'][categoryIndex];

    console.log('CATEGORY', category);
    console.log('P1_VALUE', player1Value);

    if (category.ranking && typeof player1Value === 'string' && typeof player2Value === 'string') {
      console.log('IDX OF', category.ranking.indexOf(player1Value));
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

  }, [player1Stack, player2Stack, result]);

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

function App() {

  const {
    currentPlayer,
    player1Stack,
    player2Stack,
    drawnStack,
    categoryIndex,
    result,
    handleSelectCategory,
    handleTurn,
  } = useGame();

  console.log('1UP STACK', player1Stack);
  console.log('2UP STACK', player2Stack);
  console.log('DRAWN STACK', drawnStack);
  console.log('CAT IDX', categoryIndex);
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
  return (
    <Container>
      <br />
      <div>
        <Button
          color='red'
          content='Cards'
          icon='user'
          label={{ basic: true, color: 'red', pointing: 'left', content: player1Stack.length }}
        />
        <Button
          color='blue'
          content='Cards'
          icon='user'
          label={{
            as: 'a',
            basic: true,
            color: 'blue',
            pointing: 'left',
            content: player2Stack.length,
          }}
        />
        {result !== null
          ? <Button circular color='green' icon='arrow right' floated='right' onClick={handleTurn} />
          : <Button circular color='green' icon='arrow right' floated='right' disabled />}
      </div>
      {
        result == null ? (
          <Message warning>
            <Message.Header>Top Trumps. Tap that stat!</Message.Header>
          </Message>
        ) : (
            <Message warning>
              <Message.Header>Tap the green button for the next hand</Message.Header>
            </Message>
          )
      }
      {currentPlayer === 1 || result !== null
        ? (
          <>
            <Segment inverted color='red'><Header as='h2'>Player 1 {result !== null && PLAYER1_RESULT[result]}</Header></Segment>
            <CardComponent
              categories={CATEGORIES}
              categoryIndex={categoryIndex}
              player={1}
              result={result}
              onSelectCatgory={handleSelectCategory}
              {...player1Stack[0]} />
          </>
        ) : null}

      {currentPlayer === 2 || result !== null
        ? (
          <>
            <Segment inverted color='blue'><Header as='h2'>Player 2 {result !== null && PLAYER2_RESULT[result]}</Header></Segment>
            <CardComponent
              categories={CATEGORIES}
              categoryIndex={categoryIndex}
              player={2}
              result={result}
              onSelectCatgory={handleSelectCategory}
              {...player2Stack[0]} />
          </>
        ) : null}
      <br />
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
  onSelectCatgory: (categoryIndex: number) => void;
}

function CardComponent(props: CardPropsType) {
  console.log('CARD PROPS', props);
  const { name, countryCode, img, values, player, categoryIndex, result, onSelectCatgory } = props;
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
            <Image src={img} size='small' />
          </Table.Cell>
        </Table.Row>
        {CATEGORIES.map((category, i) => {
          const metaData = META_DATA.find(x => x.category === category);
          if (!metaData) return;
          const { title } = metaData;
          const stat = values[i];
          if (categoryIndex === i && result === 0) {
            return (
              <Table.Row warning key={category} onClick={() => onSelectCatgory(i)}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{stat}</Table.Cell>
                <Table.Cell><Icon name='checkmark' /></Table.Cell>
              </Table.Row>
            )
          } else if (categoryIndex === i && result === player) {
            return (
              <Table.Row positive key={category} onClick={() => onSelectCatgory(i)}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{stat}</Table.Cell>
                <Table.Cell><Icon name='checkmark' /></Table.Cell>
              </Table.Row>
            )
          } else if (categoryIndex === i && result !== player) {
            return (
              <Table.Row negative key={category} onClick={() => onSelectCatgory(i)}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{stat}</Table.Cell>
                <Table.Cell><Icon name='close' /></Table.Cell>
              </Table.Row>
            )
          }
          return (
            <Table.Row key={category} onClick={() => onSelectCatgory(i)}>
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