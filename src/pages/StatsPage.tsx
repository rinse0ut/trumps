import React, { useEffect, useState } from "react";
import { db } from '../services/firestore';
import useDocument from '../hooks/useDocument';
import { useParams } from 'react-router-dom';
import { CategoryType, StatType } from '../types';
import { Form, Button, Container } from 'semantic-ui-react'
import { TitleBar } from '../components/Layout';
import Loading from '../components/Loading';
import List, {ListItem} from '../components/List';

function StatsPage() {

  const { categoryId } = useParams<{ categoryId: string }>();
  const category = useDocument<CategoryType>('categories', categoryId, true);
  console.log('USE DOC RESULT', category);

  if (!category) {
    return (
      <Loading/>
    )
  }

  return (
    <Container>
      <TitleBar.Source>Stats</TitleBar.Source>
      <Form>
        <InputCreate categoryId={categoryId} category={category} />
        <hr/>
        <br/>
        {Object.entries(category.stats).map(([statKey, stat]) => (
          <InputEdit categoryId={categoryId} category={category} statKey={statKey} stat={stat} />
        ))}
      </Form>
    </Container>
  )
}

function InputEdit({ categoryId, category, statKey, stat }: any) {
  const [title, setTitle] = useState(stat.title);

  function handleUpdate() {
    const updatedStat: { [id: string]: StatType } = {};
    updatedStat[`stats.${statKey}`] = { title };
    db.collection('categories').doc(categoryId).update(updatedStat);
  }

  function handleDelete() {
    delete category.stats[statKey];
    // Remove stat from each card
    for (let cardKey in category.cards) {
      delete category.cards[cardKey][statKey];
    }
    db.collection('categories').doc(categoryId).set(category);
  }

  return (
    <>
      <Form.Field>
        <input
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
      </Form.Field>
      <Button color="blue" onClick={handleUpdate}>Update</Button>
      <Button color="red" onClick={handleDelete}>Delete</Button>
      <br/><br/>
    </>
  )
}

function InputCreate({ categoryId, category }: { categoryId: string; category: CategoryType }) {
  const [title, setTitle] = useState<string>('');

  function handleCreate() {
    category.stats[title] = { title };
    db.collection('categories').doc(categoryId).set(category);
  }

  return (
    <>
      <Form.Field>
        <input
          value={title}
          placeholder="New Stat"
          onChange={e => {
            setTitle(e.target.value)
          }}
        />
      </Form.Field>
      <Button color="blue" onClick={handleCreate}>Create</Button>
      <br/><br/>
    </>
  )
}

export default StatsPage;