import React, { useState } from "react";
import { Link } from "react-router-dom";
import {db} from '../services/firestore';
import {CategoryType} from '../types';
import useCollection from '../hooks/useCollection';
import List, {ListHeader, ListItem} from '../components/List';
import { Form, Button, Container } from 'semantic-ui-react'

function CategoryPage() {

  const categories = useCollection<CategoryType>('categories', true);
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
            <Link to={`/category/${item?.id}/stats`}> Stats</Link> |
            <Link to={`/category/${item?.id}/cards`}> Cards</Link>
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

  function handleCreate() {
    if (title !== '') {
      db.collection('categories').add({title, stats: {}, cards: {}})
    }
  }

  return (
    <Form>
      <Form.Input>
        <input 
          placeholder="New Pack"
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

export default CategoryPage;