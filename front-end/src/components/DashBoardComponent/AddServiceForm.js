import { useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios';

export default function AddServiceForm() {

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState();

  // ============================== CREATE A SERVICE ==============================
  const handleSubmitService = () => {
    if (image && title && price) {
      Axios.post('https://garage-automobile-627012dfc93e.herokuapp.com/service/add', {
        image: image,
        title: title,
        price: price,
      })
    }
  }

  return (
    <Wrapper>
      <H1>Ajouter un service</H1>
      <Form>
        <Label>Ajouter l'image</Label>
        <Input type='text' value={image} onChange={(e) => setImage(e.target.value)} required />

        <Label>Ajouter le titre</Label>
        <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />

        <Label>Ajouter le prix</Label>
        <Input type='text' value={price} onChange={(e) => setPrice(e.target.value)} required />
        <ButtonSend onClick={handleSubmitService}>Envoyer</ButtonSend>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
 width: 70%;
`;

const H1 = styled.h1`
  font-family: Libre Baskerville;
  font-size: 25px;
  font-weight: 700;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  padding: 10px;
  margin-top: 10px;
`;

const Label = styled.label`
  font-family: Libre Baskerville;
  font-weight: 700;
  @media screen and (max-width: 605px) {
  font-size: 13px;
}
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0 10px 0;
  border: 1px solid ;
  background-color: ${(props) => props.theme.card};
  @media screen and (max-width: 605px) {
  font-size: 13px;
}
`;

const ButtonSend = styled.button`
font-size: 20px;
background-color: #242425;
color: #F5CB5C;
border: none;
padding: 10px;
width: 150px;
cursor: pointer;
border-radius: 10px;
@media screen and (max-width: 605px) {
  font-size: 15px;
  width: 100px;
}
`;
