import React, { useCallback, useState } from 'react';
import { Container, Segment, Header, Button, Message } from 'semantic-ui-react';
import { CardType, CategoryType } from './types';
import useGame from './hooks/useGame';
import Card from './components/Card';
import _variants from './variants';

const PLAYER1_RESULT = ['DRAWS!', 'WINS!', 'LOSES!']
const PLAYER2_RESULT = ['DRAWS!', 'LOSES!', 'WINS!']

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
        const { categories, cards } = prop(_variants, variant);
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
        <br />
        <Message warning>
          <Message.Header>Top Trumps. Tap that category!</Message.Header>
        </Message>
        <br />
        {Object.keys(_variants).map(variant => (
          <><Button positive fluid size='big' onClick={() => handleSelectVariant(variant)}>{variant.toUpperCase()}</Button><br /></>
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
            <Segment inverted color='red'><Header as='h3'>Player 1 {result !== null && PLAYER1_RESULT[result]}</Header></Segment>
            <Card
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
            <Segment inverted color='blue'><Header as='h3'>Player 2 {result !== null && PLAYER2_RESULT[result]}</Header></Segment>
            <Card
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

export default App;