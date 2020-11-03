import React, { useEffect, useState } from "react";
import {db} from '../services/firestore';
import useDocument from '../hooks/useDocument';
import {useParams} from 'react-router-dom';
import {CategoryType, StatType} from '../types';

function StatsPage() {

  const {categoryId} = useParams<{categoryId:string}>();
  const category = useDocument<CategoryType>('categories', categoryId);
  console.log('USE DOC RESULT', category);

  if (!category) {
    return (
      <div>Loading...</div>
    )
  }

  // return <div>STATS</div>; 

  return (
    <>
      <div>STATS LIST</div>
      <ul>
        { category?.stats?.map((stat: StatType) => (<li>{stat.title}</li>)) }
        {/* { stats.map(category => (<InputEdit category={category}/>)) } */}
        <InputCreate categoryId={categoryId} category={category} />
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
    window.location.reload();
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

function InputCreate({categoryId, category}: {categoryId: string; category: CategoryType}) {
  const [title, setTitle] = useState('');

  function handleCreate() {
    db.collection('categories').doc(categoryId).set({...category, stats: [...category.stats, {title}]});
    window.location.reload();
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

export default StatsPage;