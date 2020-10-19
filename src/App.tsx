import React, { useCallback, useEffect, useState } from 'react';
import { Container, Table, Image, Flag, FlagNameValues, Segment, Header, Button, Icon, Message } from 'semantic-ui-react';
import {CardType, CategoryType} from './types';
import _variants from './variants';

// console.log('CATS', categories);
// console.log('CARDS', cards);
console.log('VARS', _variants);
// const {classic} = _variants;
// const {categories, cards} = classic;

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

type PlayerType = 1 | 2;
type ResultType = null | 0 | 1 | 2;

const PLAYER1_RESULT = ['DRAWS!', 'WINS!', 'LOSES!']
const PLAYER2_RESULT = ['DRAWS!', 'LOSES!', 'WINS!']

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

function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

function App() {

  const [variant, setVariant] = useState<string>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);

  const handleSelectVariant = useCallback(
    (variant) => {
      if (_variants && _variants.hasOwnProperty(variant)) {
        const {categories, cards} = prop(_variants, variant);
        setVariant(variant);
        setCategories(categories);
        setCards(cards);
      }
    },
    [_variants]
  )

  const {
    currentPlayer,
    player1Stack,
    player2Stack,
    drawnStack,
    categoryIndex,
    result,
    handleSelectCategory,
    handleTurn,
  } = useGame(categories, cards);

  if (!variant || !categories || !cards) {
    return (
      <Container>
        <br/>
        <Message warning>
          <Message.Header>Top Trumps. Tap that category!</Message.Header>
        </Message>
        <br/>
        {Object.keys(_variants).map(variant => (
          <><Button positive fluid size='big' onClick={() => handleSelectVariant(variant)}>{variant.toUpperCase()}</Button><br/></>
        ))}
      </Container>
    )
  }

  console.log('1UP STACK', player1Stack);
  console.log('2UP STACK', player2Stack);
  console.log('DRAWN STACK', drawnStack);
  console.log('CAT IDX', categoryIndex);
  // console.log('RESULT', result);
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
              categories={categories}
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
              categories={categories}
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

type CardPropsType = CardType & {
  categories: CategoryType[];
  categoryIndex: number | null;
  player: PlayerType;
  result: number | null;
  onSelectCatgory: (categoryIndex: number) => void;
}

function CardComponent(props: CardPropsType) {
  console.log('CARD PROPS', props);
  if (!props.name) {
    return null
  }
  const { name, countryCode, img, values, player, categories, categoryIndex, result, onSelectCatgory } = props;
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
        {categories.map((category, i) => {
          const { title } = category;
          const stat = values[i];
          if (categoryIndex === i && result === 0) {
            return (
              <Table.Row warning key={title} onClick={() => onSelectCatgory(i)}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{stat}</Table.Cell>
                <Table.Cell><Icon name='checkmark' /></Table.Cell>
              </Table.Row>
            )
          } else if (categoryIndex === i && result === player) {
            return (
              <Table.Row positive key={title} onClick={() => onSelectCatgory(i)}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{stat}</Table.Cell>
                <Table.Cell><Icon name='checkmark' /></Table.Cell>
              </Table.Row>
            )
          } else if (categoryIndex === i && result !== player) {
            return (
              <Table.Row negative key={title} onClick={() => onSelectCatgory(i)}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{stat}</Table.Cell>
                <Table.Cell><Icon name='close' /></Table.Cell>
              </Table.Row>
            )
          }
          return (
            <Table.Row key={title} onClick={() => onSelectCatgory(i)}>
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