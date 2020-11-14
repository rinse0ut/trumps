import React, { useEffect, useState } from "react";
import {db} from '../services/firestore';
import { useAuthContext } from '../components/AuthProvider';
import useDocument from '../hooks/useDocument';
import useCollection from '../hooks/useCollection';
import {useParams} from 'react-router-dom';
import {CategoryType, UserType, GameFormType} from '../types';

const IMG_NAMES = ['ant', 'ben', 'dan', 'didun', 'dt', 'grant', 'mike', 'morgan', 'nick', 'pearce', 'rob', 'scouse', 'stevooo', 'sunny'];

function ChallengePage() {

  const {currentUser} = useAuthContext();
  console.log({currentUser});
  const categories = useCollection<CategoryType>('categories');
  const users = useCollection<any>('users');

  const [form, setForm] = useState<GameFormType>({categoryId: '', player2Id: ''});

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  async function handleCreate() {
    const category = categories && Object.values(categories).find(x => x.id = form.categoryId);
    if (category && currentUser) {
      // const doc = await db.collection('games').add({stats: category.stats, cards: category.cards, player1Id: currentUser.uid, player2Id: form.player2Id});
      const doc = await db.collection('games').add({pack: category, player1Id: currentUser.uid, player2Id: form.player2Id});
      // alert('CREATED GAME', doc));
    }
    // db.collection('forms').doc(categoryId).update(updatedCard);
  }

  console.log('CHALLENGE DATA', form, categories, users);

  if (!categories || !users) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <div>NEW GAME</div>
      <div>
        <label htmlFor="categoryId">Category</label>   
        <select
           name="categoryId"
           value={form.categoryId}
           onChange={handleChange}
         >
            <option value="">Select...</option> 
           {Object.values(categories).map((x: CategoryType) => ( 
            <option value={x.id}>{x.title}</option> 
           ))}
         </select>
       </div>
       <div>
        <label htmlFor="player2Id">User</label>   
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
       </div>
       <button onClick={handleCreate}>New Game</button>       
    </>
  )
}

// function InputEdit({categoryId, category, cardKey, cardItem}:  {categoryId: string; category: CategoryType, cardKey: string, cardItem: CardType}) {
//   const [card, setCard] = useState<CardType>(cardItem);

//   const handleChange = (e: any) => {
//     setCard({
//       ...card,
//       [e.target.name]: e.target.value,
//     })
//   };

//   function handleUpdate() {
//     const updatedCard: {[id: string]: CardType} = {}; 
//     updatedCard[`card.${cardKey}`] = card;
//     db.collection('categories').doc(categoryId).update(updatedCard);
//   }

//   function handleDelete() {
//     console.log('CAT PRE DELETE', category, cardKey);
//     delete category.cards[cardKey];
//     console.log('CAT POST DELETE', category);
//     db.collection('categories').doc(categoryId).set(category);
//   }

//   return (
//     <>
//       <div>
//         <label htmlFor="title">Title</label>   
//         <input 
//           name="title"
//           value={card.title}
//           onChange={handleChange}
//         />
//       </div>
//       <br/>  
//       <div>
//         <label htmlFor="countryCode">Country Code</label>   
//         <select
//           name="countryCode"
//           value={card.countryCode}
//           onChange={handleChange}
//         >
//           <option value="uk">UK</option>
//           <option value="us">US</option>
//         </select>
//       </div>
//         { Object.entries(category.stats).map(([statKey, stat])  => (
//           <>    
//             <div>
//               <label htmlFor={statKey}>{stat.title}</label>   
//               <input 
//                 name={statKey}
//                 type="number"
//                 value={card[statKey]}
//                 onChange={handleChange}
//               />
//             </div>
//             <br/>            
//           </>    
//         ))} 
//       <button onClick={handleUpdate}>Update</button>
//       <button onClick={handleDelete}>Delete</button>
//       <br/>
//     </>
//   )
// }

// function InputCreate({categoryId, category}: {categoryId: string; category: CategoryType}) {
//   const [card, setCard] = useState<CardType>({
//     title: '',
//     countryCode: '',
//   });

//   const handleChange = (e: any) => {
//     setCard({
//       ...card,
//       [e.target.name]: e.target.value,
//     })
//   };

//   function handleCreate() {
//     category.cards[card.title] = card;
//     db.collection('categories').doc(categoryId).set(category);
//   }

//   return (
//     <>
//       <div>
//         <label htmlFor="title">Title</label>   
//         <input 
//           name="title"
//           value={card.title}
//           onChange={handleChange}
//         />
//       </div>
//       <br/>  
//       <div>
//         <label htmlFor="countryCode">Country Code</label>   
//         <select
//           name="countryCode"
//           value={card.countryCode}
//           onChange={handleChange}
//         >
//           <option value="uk">UK</option>
//           <option value="us">US</option>
//         </select>
//       </div>
//       <br/>  
//       <div>
//         <label htmlFor="img">Image</label>   
//         <select
//           name="img"
//           value={card.img}
//           onChange={handleChange}
//         >
//           {IMG_NAMES.map(img => (
//             <option value={img}>{img}</option>
//           ))}
//           <option value="us">US</option>
//         </select>
//       </div>
//       <br/>        
//         { Object.entries(category.stats).map(([statKey, stat])  => (
//           <>    
//             <div>
//               <label htmlFor={statKey}>{stat.title}</label>   
//               <input 
//                 name={statKey}

//                 // value={stat.title}
//                 onChange={handleChange}
//               />
//             </div>
//             <br/>            
//           </>    
//         ))} 
//       <button onClick={handleCreate}>Add</button>
//     </>
//   )
// }

export default ChallengePage;