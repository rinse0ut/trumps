import React, { useEffect, useState } from "react";
import { db } from '../services/firestore';
import useDocument from '../hooks/useDocument';
import { useParams } from 'react-router-dom';
import { CategoryType, CardType } from '../types';
import { Form, Button, Container, Tab } from 'semantic-ui-react'
import { TitleBar } from '../components/Layout';
import Loading from '../components/Loading';

const IMG_NAMES = ['ant', 'ben', 'dan', 'didun', 'dt', 'grant', 'mike', 'morgan', 'nick', 'pearce', 'rob', 'scouse', 'stevooo', 'sunny', 'will', 'vinnie'];

function CardsPage() {

  const { categoryId } = useParams<{ categoryId: string }>();
  const category = useDocument<CategoryType>('categories', categoryId, true);
  console.log('USE DOC RESULT', category);

  if (!category) {
    return (
      <Loading />
    )
  }

  const panes = [
    {
      menuItem: 'Create', render: () => (
        <Container>
          <Form>
            <InputCreate categoryId={categoryId} category={category} />
          </Form>
        </Container>
      )
    },
    {
      menuItem: `Edit (${Object.keys(category.cards).length})`, render: () => (
        <Container>
          <Form>
            {Object.entries(category.cards).map(([cardKey, card]) => (
              <InputEdit categoryId={categoryId} category={category} cardKey={cardKey} cardItem={card} />
            ))}
          </Form>
        </Container>
      )
    },
  ];

  return (
    <>
      <TitleBar.Source>Cards</TitleBar.Source>
      <Tab panes={panes} />;
    </>
  );
}

function InputEdit({ categoryId, category, cardKey, cardItem }: { categoryId: string; category: CategoryType, cardKey: string, cardItem: CardType }) {
  const [card, setCard] = useState<CardType>(cardItem);

  const handleChange = (e: any) => {
    if (e.target.value === '') return;
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    })
  };

  function handleUpdate() {
    const updatedCard: { [id: string]: CardType } = {};
    updatedCard[`cards.${cardKey}`] = card;
    db.collection('categories').doc(categoryId).update(updatedCard);
  }

  function handleDelete() {
    console.log('CAT PRE DELETE', category, cardKey);
    delete category.cards[cardKey];
    console.log('CAT POST DELETE', category);
    db.collection('categories').doc(categoryId).set(category);
  }

  return (
    <>
      <br />
      <Form.Field>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          value={card.title}
          onChange={handleChange}
          required
        />
      </Form.Field>
      <br />
      <Form.Field>
        <label htmlFor="countryCode">Country Code</label>
        <select
          name="countryCode"
          value={card.countryCode}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="bb">Barbados</option>
          <option value="fr">France</option>
          <option value="ru">Russia</option>
          <option value="gb sct">Scotland</option>
          <option value="uk">UK</option>
          <option value="us">USA</option>
          <option value="gb wls">Wales</option>
        </select>
      </Form.Field>
      { Object.entries(category.stats).map(([statKey, stat]) => (
        <>
          <Form.Field>
            <label htmlFor={statKey}>{stat.title}</label>
            <input
              name={statKey}
              type="number"
              value={card[statKey]}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <br />
        </>
      ))}
      <Button color="blue" onClick={handleUpdate}>Update</Button>
      <Button color="red" onClick={handleDelete}>Delete</Button>
      <br /><br />
      <hr />
    </>
  )
}

function InputCreate({ categoryId, category }: { categoryId: string; category: CategoryType }) {
  const [card, setCard] = useState<CardType>({
    title: '',
    countryCode: '',
  });

  const handleChange = (e: any) => {
    if (e.target.value === '') return;
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    })
  };

  function handleCreate() {
    category.cards[card.title] = card;
    db.collection('categories').doc(categoryId).set(category);
  }

  return (
    <>
      <br />
      <Form.Field>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          value={card.title}
          onChange={handleChange}
          required
        />
      </Form.Field>
      <br />
      <Form.Field>
        <label htmlFor="countryCode">Country Code</label>
        <select
          name="countryCode"
          value={card.countryCode}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="bb">Barbados</option>
          <option value="fr">France</option>
          <option value="ru">Russia</option>
          <option value="gb sct">Scotland</option>
          <option value="uk">UK</option>
          <option value="us">USA</option>
          <option value="gb wls">Wales</option>
        </select>
      </Form.Field>
      <br />
      <Form.Field>
        <label htmlFor="img">Image</label>
        <select
          name="img"
          value={card.img}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          {IMG_NAMES.map(img => (
            <option value={img}>{img}</option>
          ))}
        </select>
      </Form.Field>
      <br />
      { Object.entries(category.stats).map(([statKey, stat]) => (
        <>
          <Form.Field>
            <label htmlFor={statKey}>{stat.title}</label>
            <input
              name={statKey}
              type="number"
              onChange={handleChange}
              required
            />
          </Form.Field>
          <br />
        </>
      ))}
      <Button color="blue" onClick={handleCreate}>Create</Button>
      <br /><br />
    </>
  )
}

export default CardsPage;