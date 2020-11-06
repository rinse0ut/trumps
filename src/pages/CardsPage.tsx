import React, { useEffect, useState } from "react";
import {db} from '../services/firestore';
import useDocument from '../hooks/useDocument';
import {useParams} from 'react-router-dom';
import {CategoryType, CardType} from '../types';

const IMG_NAMES = ['ant', 'ben', 'dan', 'didun', 'dt', 'grant', 'mike', 'morgan', 'nick', 'pearce', 'rob', 'scouse', 'stevooo', 'sunny'];

function CardsPage() {

  const {categoryId} = useParams<{categoryId:string}>();
  const category = useDocument<CategoryType>('categories', categoryId);
  console.log('USE DOC RESULT', category);

  if (!category) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <div>CARD LIST</div>
      <ul>
        { Object.entries(category.cards).map(([cardKey, card])  => (
          <InputEdit categoryId={categoryId} category={category} cardKey={cardKey} cardItem={card}/>
        ))}
        <hr/>
        <InputCreate categoryId={categoryId} category={category} />
      </ul>
    </>
  )
}

function InputEdit({categoryId, category, cardKey, cardItem}:  {categoryId: string; category: CategoryType, cardKey: string, cardItem: CardType}) {
  const [card, setCard] = useState<CardType>(cardItem);

  const handleChange = (e: any) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    })
  };

  function handleUpdate() {
    const updatedCard: {[id: string]: CardType} = {}; 
    updatedCard[`card.${cardKey}`] = card;
    db.collection('categories').doc(categoryId).update(updatedCard);
  }

  return (
    <>
      <div>
        <label htmlFor="title">Title</label>   
        <input 
          name="title"
          value={card.title}
          onChange={handleChange}
        />
      </div>
      <br/>  
      <div>
        <label htmlFor="countryCode">Country Code</label>   
        <select
          name="countryCode"
          value={card.countryCode}
          onChange={handleChange}
        >
          <option value="uk">UK</option>
          <option value="us">US</option>
        </select>
      </div>
        { Object.entries(category.stats).map(([statKey, stat])  => (
          <>    
            <div>
              <label htmlFor={statKey}>{stat.title}</label>   
              <input 
                name={statKey}
                type="number"
                value={card[statKey]}
                onChange={handleChange}
              />
            </div>
            <br/>            
          </>    
        ))} 
      <button onClick={handleUpdate}>Update</button>
      <br/>
    </>
  )
}

function InputCreate({categoryId, category}: {categoryId: string; category: CategoryType}) {
  const [card, setCard] = useState<CardType>({
    title: '',
    countryCode: '',
  });

  const handleChange = (e: any) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    })
  };

  function handleCreate() {
    category.cards[card.title] = card;
    db.collection('categories').doc(categoryId).set(category);
  }

  return (
    <>
      <div>
        <label htmlFor="title">Title</label>   
        <input 
          name="title"
          value={card.title}
          onChange={handleChange}
        />
      </div>
      <br/>  
      <div>
        <label htmlFor="countryCode">Country Code</label>   
        <select
          name="countryCode"
          value={card.countryCode}
          onChange={handleChange}
        >
          <option value="uk">UK</option>
          <option value="us">US</option>
        </select>
      </div>
      <br/>  
      <div>
        <label htmlFor="img">Image</label>   
        <select
          name="img"
          value={card.img}
          onChange={handleChange}
        >
          {IMG_NAMES.map(img => (
            <option value={img}>{img}</option>
          ))}
          <option value="us">US</option>
        </select>
      </div>
      <br/>        
        { Object.entries(category.stats).map(([statKey, stat])  => (
          <>    
            <div>
              <label htmlFor={statKey}>{stat.title}</label>   
              <input 
                name={statKey}

                // value={stat.title}
                onChange={handleChange}
              />
            </div>
            <br/>            
          </>    
        ))} 
      <button onClick={handleCreate}>Add</button>
    </>
  )
}

export default CardsPage;