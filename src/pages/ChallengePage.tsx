import React, { useState } from "react";
import { db } from '../services/firestore';
import { useAuthContext } from '../components/AuthProvider';
import useCollection from '../hooks/useCollection';
import { CategoryType, UserType, GameFormType } from '../types';
import { Form, Button, Container } from 'semantic-ui-react';
import Loading from '../components/Loading';
import { TitleBar } from '../components/Layout';
import { useHistory } from "react-router-dom";


function ChallengePage() {

  const { currentUser } = useAuthContext();
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
    if (category && currentUser) {
      const p2User = users?.find(u => u.id === form.player2Id);
      const doc = await db.collection('games').add({
        pack: category,
        p1Id: currentUser.uid,
        p1Username: currentUser.displayName,
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
      <br/><br/>
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
            {Object.values(categories).map((x: CategoryType) => (
              <option value={x.id}>{x.title}</option>
            ))}
          </select>
        </Form.Field>
      </Form>
      <br></br>
      <Button color="blue" onClick={handleCreate}>Create</Button>
    </Container>
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