import React, { useEffect, useState } from "react";
import {db} from '../services/firestore';
import useDocument from '../hooks/useDocument';
import {useParams} from 'react-router-dom';
import {CategoryType, StatType} from '../types';

function StatsPage() {

  const {categoryId} = useParams<{categoryId:string}>();
  const category = useDocument<CategoryType>('categories', categoryId, true);
  console.log('USE DOC RESULT', category);

  if (!category) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <div>STATS LIST</div>
      <ul>
        { Object.entries(category.stats).map(([statKey, stat])  => (
          <InputEdit categoryId={categoryId} category={category} statKey={statKey} stat={stat}/>
        ))}
        <InputCreate categoryId={categoryId} category={category} />
      </ul>
    </>
  )
}

function InputEdit({categoryId, category, statKey, stat}: any) {
  const [title, setTitle] = useState(stat.title);

  function handleUpdate() {
    const updatedStat: {[id: string]: StatType} = {}; 
    updatedStat[`stats.${statKey}`] = {title};
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
      <input 
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
      />  
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </>
  )
}

function InputCreate({categoryId, category}: {categoryId: string; category: CategoryType}) {
  const [title, setTitle] = useState<string>('');

  function handleCreate() {
    category.stats[title] = {title};
    db.collection('categories').doc(categoryId).set(category);
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