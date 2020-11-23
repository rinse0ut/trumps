import React, { useState } from "react";
import { Link } from "react-router-dom";
import {db} from '../services/firestore';
import {CategoryType, CardsType} from '../types';
import useCollection from '../hooks/useCollection';
import List, {ListHeader, ListItem} from '../components/List';
import { Form, Button, Container } from 'semantic-ui-react'
import { useAuthContext } from '../components/AuthProvider';

const CARDS: CardsType = {
  "ant": {
    title: 'Ant',
    img: 'ant',
    countryCode: 'uk',
  },
  ben: {
    title: 'American Ben',
    img: 'ben',
    countryCode: 'us',
  },
  dan: {
    title: 'Karate Dan',
    img: 'dan',
    countryCode: 'gb sct',
  },
  didun: {
    title: 'Dids',
    img: 'didun',
    countryCode: 'gb wls',
  },
  dt: {
    title: 'DT',
    img: 'dt',
    countryCode: 'uk',
  },
  grant: {
    title: 'G Dawg',
    img: 'grant',
    countryCode: 'gb wls',
  },
  mike: {
    title: 'Mike',
    img: 'mike',
    countryCode: 'fr',
  },
  morgan: {
    title: 'Captain Morgan',
    img: 'morgan',
    countryCode: 'gb sct',
  },
  nick: {
    title: 'Nick',
    img: 'nick',
    countryCode: 'uk',
  },  
  pearce: {
    title: 'Pearce',
    img: 'pearce',
    countryCode: 'gb sct',
  },
  rob: {
    title: 'Landers',
    img: 'rob',
    countryCode: 'uk',
  },
  scouse: {
    title: 'Scouse',
    img: 'scouse',
    countryCode: 'gb sct',
  },
  stevooo: {
    title: 'Stevooo',
    img: 'stevooo',
    countryCode: 'uk',
  },
  sunny: {
    title: 'Sunny',
    img: 'sunny',
    countryCode: 'uk',
  },
  will: {
    title: 'The Flying Scotsman',
    img: 'will',
    countryCode: 'bb',
  },
  vinnie: {
    title: 'Master of Weights and Measures',
    img: 'vinnie',
    countryCode: 'bb',
  }  
}

function PackPage() {

  const categories = useCollection<CategoryType>('categories', true)
  
  console.log('CATS', categories);

  return (
    <Container>
      <List 
        title="Packs 🐺" 
        items={categories} 
        renderItem={(item) => (
          <ListItem>
            <ListHeader>
              {item.title}
            </ListHeader>
            <Link to={`/category/${item?.id}/stats`}> Stats</Link> 
            {console.log('DUMP', Object.keys(item.stats))}
            {!item.stats || Object.keys(item.stats).length > 0 ? <> | <Link to={`/category/${item?.id}/cards`}> Cards</Link></> : null}<br/>
            Author: {item.author}
          </ListItem>
      )}/>
      <InputCreate/>
    </Container>
  )
}

type CreatePropsType = {
  category: {id: string; title?: string};
}

// function InputEdit({category}: CreatePropsType) {
//   const [title, setTitle] = useState(category.title);

//   function handleUpdate() {
//     db.collection('categories').doc(category.id).set({...category, title});
//   }

//   return (
//     <>
//       <input 
//         value={title}
//         onChange={e => {
//           setTitle(e.target.value)
//         }}
//       />  
//       <button onClick={handleUpdate}>Update</button>
//     </>
//   )
// }

function InputCreate() {
  const [title, setTitle] = useState('');
  const { currentUser } = useAuthContext();

  function handleCreate() {
    if (title !== '') {
      db.collection('categories').add({title, stats: {}, cards: CARDS, author: currentUser?.displayName})
    }
  }

  return (
    <Form>
      <Form.Input>
        <input 
          placeholder="New Pack Title eg 'Classic Pioneers'"
          value={title}
          onChange={e => {
            setTitle(e.target.value)
          }}
          required
        />  
      </Form.Input>
      <Button color="blue" onClick={handleCreate}>Create</Button>
    </Form>
  )
}

export default PackPage;