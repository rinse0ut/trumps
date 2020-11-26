import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Image } from 'semantic-ui-react'
import { storage } from "../services/firestore";
import styled from "styled-components";
import { CategoryType, CardType, CardsType } from '../types';
import { db } from '../services/firestore';
import { resolvePreset } from "@babel/core";

const Error = styled.div`
  color: red;
`;

type PropsType = {
  categoryId: string;
  category: CategoryType;
  card?: CardType;
  // imgUrl: string;
  // setImgUrl: (url: string) => void;
  // onUpload: (data: any) => void;
  // onSubmit: (data: any) => void;
}

// type CardFormType = CardType & {
  // img: any;
// }

function CardForm({categoryId, category, card}: PropsType) {
  const  { register, errors, reset, handleSubmit } = useForm({defaultValues: card});
  const [imgUrl, setImgUrl] = useState(card?.imgUrl || '');
  console.log('!CARD2', card, !card);

  // async function onSubmit(card: CardFormType) {
  async function onSubmit(formData: any) {
    formData['imgUrl'] = imgUrl;
    const cardId = !card ? `card${Object.keys(category.cards).length + 1}` : card.id;
    formData.id = cardId;
    category.cards[cardId] = formData;
    const result = await db.collection('categories').doc(categoryId).set(category);
    console.log('RESULT', result);
    if (!card) {
      reset();
    }
  }

  function handleDelete() {
    console.log('DELETE CARD?', card);
    if (card) {
      const updatedCateogry = JSON.parse(JSON.stringify(category));
      const result = delete updatedCateogry['cards'][card.id];
      console.log('CAT POST DELETE', updatedCateogry);
      // const updatedCategory =
      db.collection('categories').doc(categoryId).set(updatedCateogry);
    }
  }

  return (
    <Form>
      <Form.Field>
        <label>Title</label>
        <input
          name="title"
          ref={register({ required: true })}
        />
        {errors.title && <Error>Title is required</Error>}
      </Form.Field>
      <br />
      <Form.Field>
        <label htmlFor="countryCode">Country Code</label>
        <select
          name="countryCode"
          ref={register}
        >
          <option value="">Select...</option>
          <option value="bb">Barbados</option>
          <option value="fr">France</option>
          <option value="ru">Russia</option>
          <option value="gb sct">Scotland</option>
          <option value="uk">UK</option>
          <option value="us">USA</option>
          <option value="gb wls">Wales</option>
        </select>
      </Form.Field>
      <br />
      <Form.Field>
        <ImageField imgUrl={imgUrl} setImgUrl={setImgUrl} />
      </Form.Field>
      <br />
      { Object.entries(category.stats).map(([statKey, stat]) => (
        <>
          <Form.Field>
            <label htmlFor={statKey}>{stat.title}</label>
            <input
              placeholder={stat.title}
              name={statKey}
              type="number"
              ref={register({ required: true })}              
            />
            {errors[statKey] && <Error>{stat.title} is required</Error>}
          </Form.Field>
          <br />
        </>
      ))}
      <Button color="blue" onClick={handleSubmit(onSubmit)}>{card ? 'Update' : 'Create'}</Button>
      {card && <Button color="red" onClick={handleDelete}>Delete</Button>}
    </Form>
  );
}

export default CardForm;

function ImageField({imgUrl, setImgUrl}: any) {
  const [file, setFile] = useState<any>(null);

  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e: any) {
    e.preventDefault();
    console.log('FILE', typeof file, file);
      const ts = Date.now();
      const uploadTask = storage.ref(`/images/${ts}${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setImgUrl(url);
          });
      });
  }

  return (
    <div>
      <Image src={imgUrl} />
      <input type="file" onChange={handleChange} />
      <Button primary disabled={!file} onClick={handleUpload}>Upload Image</Button>
    </div>
  );
}