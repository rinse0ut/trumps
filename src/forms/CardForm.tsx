import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Image } from 'semantic-ui-react'
import { CategoryType, CardType } from "../types";
import { storage } from "../services/firestore";
import styled from "styled-components";

const Error = styled.div`
  color: red;
`;

type PropsType = {
  category: CategoryType;
  imgUrl: string;
  setImgUrl: (url: string) => void;
  // onUpload: (data: any) => void;
  onSubmit: (data: any) => void;
}

function CardForm({category, imgUrl, setImgUrl, onSubmit}: PropsType) {
  const form = useForm();
  const { register, errors, getValues, setValue, handleSubmit } = form;
  console.log('FORM', form);
  const img = getValues('imgURL');
  console.log('CARD FORM IMG', imgUrl);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
      <Button color="blue" type="submit">Create</Button>
    </Form>
  );
}

export default CardForm;

function ImageField({imgUrl, setImgUrl}: any) {
  const [file, setFile] = useState<any>(null);

  console.log('IMAGE FIELD IMGURL', imgUrl);

  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e: any) {
    e.preventDefault();
    console.log('FILE', typeof file, file);
      const uploadTask = storage.ref(`/images/${file.name}`).put(file);
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
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <Button primary disabled={!file}>Upload</Button>
        <Image src={imgUrl} />
      </form>
    </div>
  );
}