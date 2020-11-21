import React, { useState } from "react";
import { Link } from "react-router-dom";
import {db} from '../services/firestore';
import {CategoryType} from '../types';
import useCollection from '../hooks/useCollection';
import List, {ListItem} from '../components/List';

function CategoryPage() {

  const categories = useCollection<CategoryType>('categories');
  console.log('CATS', categories);

  return (
    <>
      <List 
        title="Packs" 
        items={categories} 
        renderItem={(item) => (
          <ListItem>
            <span>{item.title}:  </span>
            <Link to={`/category/${item?.id}/stats`}> Stats</Link> |
            <Link to={`/category/${item?.id}/cards`}> Cards</Link>
          </ListItem>
      )}/>
      <InputCreate/>
    </>
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
    db.collection('categories').add({title, stats: {}, cards: {}})
  }

  return (
    <>
      <input 
        value={title}
        onChange={e => {
          setTitle(e.target.value)
        }}
      />  
      <button onClick={handleCreate}>Add</button>
    </>
  )
}

export default CategoryPage;