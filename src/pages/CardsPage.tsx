import React, { useEffect, useState } from "react";
import { db } from '../services/firestore';
import useDocument from '../hooks/useDocument';
import { useParams } from 'react-router-dom';
import { CategoryType, CardType, CardsType } from '../types';
import { Form, Button, Container, Tab, Input, Image, Segment } from 'semantic-ui-react'
import { TitleBar } from '../components/Layout';
import Loading from '../components/Loading';
import CardForm from '../forms/CardForm';
import { storage } from "../services/firestore";
import CSVReader from '../components/CSVReader';

const IMG_NAMES = ['ant', 'ben', 'dan', 'didun', 'dt', 'grant', 'mike', 'morgan', 'nick', 'pearce', 'rob', 'scouse', 'stevooo', 'sunny', 'will', 'vinnie'];

function CardsPage() {

  const { categoryId } = useParams<{ categoryId: string }>();
  const category = useDocument<CategoryType>('categories', categoryId, true);
  const [error, setError] = useState<string|null>(null);
  // const [imgUrl, setImgUrl] = useState("");

  // console.log('ING_URL', imgUrl);

  if (!category) {
    return (
      <Loading />
    )
  }

  async function handleOnFileLoad(data: any) {

    try {
      setError(null);
      const [header, ...rows] = data;
      const [title, ...statKeys] = header.data;

      const stats = Object.fromEntries(statKeys.map((stat: string) => [stat, { title: stat }]));

      const cards = rows.reduce((cards: any, row: any, i: number) => {
        const [title, ...statValues] = row.data;
        console.log(title, statValues);
        const cardId = `card${i + 1}`;
        cards[cardId] = { title };
        statKeys.forEach((key: string, i: number) => {
          cards[cardId][key] = statValues[i];
        });
        return cards;
      }, {});
      const result = await db.collection('categories').doc(categoryId).set({ title: category?.title, stats, cards });
    } catch (e) {
      console.error('Error uploading CSV', e);
      setError('Error uploading CSV File.  Check the format.')
    }
  }

  // async function onSubmit(card: CardFormType) {
  //   console.log('CARD PAGE ONSUBMIT', card, imgUrl);
  //   // const [img] = card.img;
  //   card['imgUrl'] = imgUrl;
  //   // return;
  //   if (category && imgUrl) {
  //     delete card.img;
  //     category.cards[card.title] = card;
  //     console.log('SET CATEGORY', category);
  //     const result = await db.collection('categories').doc(categoryId).set(category);
  //     console.log('RESULT', result);
  //   }
  // }  

  const panes = [
    {
      menuItem: 'Create', render: () => (
        <Container>
          <CardForm categoryId={categoryId} category={category} />
        </Container>
      )
    },
    {
      menuItem: `Edit (${Object.keys(category.cards).length})`, render: () => (
        <Container>
          <Form>
            {Object.entries(category.cards)
              .sort((a, b) => b[0].localeCompare(a[0]))
              .reverse()
              .map(([cardKey, card]) => (
                // <InputEdit categoryId={categoryId} category={category} cardKey={cardKey} cardItem={card} />
                <>
                  <CardForm categoryId={categoryId} category={category} card={card} />
                  <hr />
                </>
              ))}
          </Form>
        </Container>
      )
    },
    {
      menuItem: 'CSV Upload', render: () => (
        <Container>
          <br />
          <h2>Example CSV Format</h2>
          <Segment>
            Title,Height,Strength,Skill,Weight<br />
            Adam,170,8,5,79<br />
            Ben,175,10,5,85<br />
          </Segment>
          <CSVReader
            handleOnFileLoad={handleOnFileLoad}
          // handleFileUpload={(data: any) => {
          //   console.log();
          //   const [header, ...rows] = data;
          //   const [title, ...stats] = rows;
          //   console.log('STATS', title, stats);  
          // }}
          />
        </Container>
      )
    },
  ];

  return (
    <>
      {error && <Segment inverted color="red">{error}</Segment>}
      <TitleBar.Source>{category.title}</TitleBar.Source>
      <Tab panes={panes} />
    </>
  );
}

function InputEdit({ categoryId, category, cardKey, cardItem }: { categoryId: string; category: CategoryType, cardKey: string, cardItem: CardType }) {
  const [card, setCard] = useState<CardType>(cardItem);

  const handleChange = (e: any) => {
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
        <Input
          label="Title"
          name="title"
          value={card.title}
          onChange={handleChange}
          required
        />
      </Form.Field>
      <div>
        {card.imgUrl}
      </div>
      <Image src={card.imgUrl} />
      <br />
      {Object.entries(category.stats)
        .sort((a, b) => b[0].localeCompare(a[0]))
        .reverse()
        .map(([statKey, stat]) => (
          <>
            <Form.Field>
              <Input
                label={stat.title}
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

  async function handleCreate() {
    category.cards[card.title] = card;
    await db.collection('categories').doc(categoryId).set(category);
    setCard({ title: '', countryCode: '' });
  }

  return (
    <>
      <br />
      <Form.Field>
        <Input
          label="Title" t
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
      {Object.entries(category.stats).map(([statKey, stat]) => (
        <>
          <Form.Field>
            <Input
              label={stat.title}
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