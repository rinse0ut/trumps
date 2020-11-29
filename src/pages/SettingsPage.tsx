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

export const defaultSettings = {
  theme: 'arcade',
  membership: 'basic',
  showOpponentsCard: 'yes',
}

function SettingsPage() {

  const { user } = useAuthContext();
  const history = useHistory();
  const categories = useCollection<CategoryType>('categories');
  const users = useCollection<any>('users');

  console.log('SETTING USER', user);

  const settings = user.settings ? user.settings : defaultSettings;
  const [form, setForm] = useState<{theme: string; membership: string, showOpponentsCard: string}>(settings);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  async function handleCreate() {
    const result = user?.uid && await db.collection('users').doc(user.uid).update({settings: {
      theme: form.theme,
      membership: form.membership,
      showOpponentsCard: form.showOpponentsCard,
    }});
    console.log('RESULT', result);
  }

  console.log('SETTINGS FORM', form);

  if (!user) {
    return (
      <Loading />
    )
  }

  return (
    <Container>
      <TitleBar.Source>Settings ⚙️</TitleBar.Source>
      <br /><br />
      <Form>
        <Form.Field>
          <label htmlFor="theme">Theme</label>
          <select
            name="theme"
            value={form.theme}
            onChange={handleChange}
          >
            {/* <option value="">Select...</option> */}
            <option value="arcade">Arcade</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </Form.Field>
        <Form.Field>
          <label htmlFor="theme">Membership</label>
          <select
            name="membership"
            value={form.membership}
            onChange={handleChange}
          >
            {/* <option value="">Select...</option> */}
            <option value="basic">Basic</option>
            <option value="moderator">Gold</option>
            <option value="creator">Platinium</option>
            <option value="admin">Diamond</option>
          </select>
        </Form.Field>        
        <Form.Field>
          <label htmlFor="showOpponentsCard">Show opponent's cards</label>
          <select
            name="showOpponentsCard"
            value={form.showOpponentsCard}
            onChange={handleChange}
          >
            {/* <option value="">Select...</option> */}
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </Form.Field>
      </Form>
      <br></br>
      <Button color="red" circular onClick={handleCreate}>Save Settings</Button>
    </Container>
  )
}

export default SettingsPage;