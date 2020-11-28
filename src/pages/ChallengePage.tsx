import React, { useState } from "react";
import { db } from '../services/firestore';
import { useAuthContext } from '../components/AuthProvider';
import useCollection from '../hooks/useCollection';
import { CategoryType, UserType, GameFormType } from '../types';
import { Form, Button, Container } from 'semantic-ui-react';
import Loading from '../components/Loading';
import { TitleBar } from '../components/Layout';
import { useHistory } from "react-router-dom";
import Can from '../auth/Can';

function ChallengePage() {

  const { user } = useAuthContext();
  const history = useHistory();
  const categories = useCollection<CategoryType>('categories');
  const users = useCollection<any>('users');

  const [form, setForm] = useState<GameFormType>({ categoryId: '', player2Id: '' });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  async function handleCreate() {
    const category = categories && Object.values(categories).find(x => x.id === form.categoryId);
    if (category && user) {
      const p2User = users?.find(u => u.id === form.player2Id);
      const doc = await db.collection('games').add({
        pack: category,
        p1Id: user.uid,
        p1Username: user.username,
        p2Id: form.player2Id,
        p2Username: p2User.username,
        p1TurnNumber: 0,
        p2TurnNumber: 0,
        turnNumber: 0,
        created: Date.now(),
      });
      history.push(`/game/${doc.id}`);
      // alert('CREATED GAME', doc));
    }
    // db.collection('forms').doc(categoryId).update(updatedCard);
  }

  console.log('CHALLENGE FORM', form);
  console.log('CHALLENGE DATA', categories, users);

  if (!categories || !users) {
    return (
      <Loading />
    )
  }

  return (
    <Container>
      <TitleBar.Source>Challenge</TitleBar.Source>
      <br /><br />
      <Form>
        <Form.Field>
          <label htmlFor="player2Id">Friend</label>
          <select
            name="player2Id"
            value={form.player2Id}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            {Object.values(users).map((x: UserType) => (
              <option value={x.id}>{x.username}</option>
            ))}
          </select>
        </Form.Field>
        <Form.Field>
          <label htmlFor="categoryId">Pack</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            {Object.values(categories).map((pack: CategoryType) => (
              <Can
                role={user?.role}
                perform="game:play"
                data={{
                  packGroupId: pack?.group,
                  userGroupIds: user?.groups,
                }}                
                yes={() => (
                  <option value={pack.id}>{pack.title}</option>
                )}
              />              
            ))}
          </select>
        </Form.Field>
      </Form>
      <br></br>
      <Button color="red" circular onClick={handleCreate}>Create New Game</Button>
    </Container>
  )
}

export default ChallengePage;