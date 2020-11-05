import React, { useState } from "react";
import { Link } from "react-router-dom";
import {db} from '../services/firestore';
import {CategoryType} from '../types';
import useCollection from '../hooks/useCollection';

function CategoryPage() {

  const categories = useCollection<CategoryType>('categories');

  // if (categories && !categories.length) {
  //   return (
  //     <div>Loading...</div>
  //   )
  // }

  return (
    <>
      <div>CATEGORY LIST</div>
      <ul>
        { categories?.map(category => (<li>{category.title}<Link to={`/category/${category?.id}/stats`}>Stats</Link></li>)) }
        {/* { categories.map(category => (<li>{category.title}</li>)) } */}
        {/* { categories.map(category => (<InputEdit category={category}/>)) } */}
        <InputCreate/>
      </ul>
    </>
  )
}

type CreatePropsType = {
  category: {id: string; title?: string};
}

function InputEdit({category}: CreatePropsType) {
  const [title, setTitle] = useState(category.title);

  function handleUpdate() {
    db.collection('categories').doc(category.id).set({...category, title});
  }

  return (
    <>
      <input 
        value={title}
        onChange={e => {
          setTitle(e.target.value)
        }}
      />  
      <button onClick={handleUpdate}>Update</button>
    </>
  )
}

function InputCreate() {
  const [title, setTitle] = useState('');

  function handleCreate() {
    db.collection('categories').add({title, stats: {}})
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