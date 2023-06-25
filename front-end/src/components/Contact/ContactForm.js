import styled from "styled-components";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Link } from "react-router-dom";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xayzryed"); //xayzryed ceci est donné lorsqu'on crée un projet sur formspree/react
  if (state.succeeded) {
    return (
      <ValidForm>
        <Info>
          <Title>Merci de nous avoir envoyé votre message</Title>
          <UserInfo>Nous allons vous contactez dès que possible dans les 5 jours ouvrables.</UserInfo>
          <UserInfo>N'hésiter pas de nouveau à parcourir notre site web en cliquant juste <Link to="/">ici</Link></UserInfo>
        </Info>
      </ValidForm>
    );
  };
  return (
    <ContainerForm>
      <ContainerInfoForm>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="lastname">Nom</Label>
          <Input className="container-input" id="lastname" type="lastname" name="lastname" required />
          <ValidationError prefix="Lastname" field="lastname" errors={state.errors} />

          <Label htmlFor="firstname">Prénom</Label>
          <Input className="container-input" id="firstname" type="firstname" name="firstname" required />
          <ValidationError prefix="Firstname" field="firstname" errors={state.errors} />

          <Label htmlFor="email">E-mail</Label>
          <Input className="container-input" id="email" type="email" name="email" required />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <Label htmlFor="phone">Téléphone</Label>
          <Input className="container-input" id="phone" type="tel" name="phone" pattern="\+?\d{2,3}-\d{2,3}/\d{2}\d{2}\d{2}" placeholder="+xx-xxx/xx-xx-xx" required />
          <ValidationError prefix="phone" field="phone" errors={state.errors} />

          <Label htmlFor="message">Message</Label>
          <Message className="container-input" id="message" name="message" required />
          <ValidationError prefix="Message" field="message" errors={state.errors} />

          <SubmitButton type="submit" disabled={state.submitting}>Envoyer</SubmitButton>
        </Form>
      </ContainerInfoForm>
    </ContainerForm>
  )
}

const ContainerForm = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 500px;
& .container-input{
  background-color: ${(props) => props.theme.card};
  border: 1px solid ${(props) => props.theme.mainColor};
  font-family: barlow;
  font-size: 20px;
}
`;

const ContainerInfoForm = styled.div`
width: 50%;
`;

const Form = styled.form`
display: flex;
flex-direction: column;

`;
const Label = styled.label`
margin-top: 15px;
font-family: Libre baskerville;
font-weight: 600;
font-size: 18px;
@media screen and (max-width: 576px){
  font-size: 15px;
}
`;
const Input = styled.input`
height: 25px;
`;
const Message = styled.textarea`
height: 100px;
`;
const SubmitButton = styled.button`
margin: 25px 0 25px 0;
width: 30%;
font-family: barlow; 
font-weight: 600;
font-size: 22px;
background-color: #F5CB5C;
color: #242425;
padding: 5px;
border: none;
cursor: pointer;
`;

// THANK MESSAGE TO THE USER \\
const ValidForm = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
`;

const Info = styled.div`
background-color: lightgreen; 
width: 40%;
height: 200px;
padding: 20px;
`;
const Title = styled.div`
font-family:libre baskerville;
font-weight: 600;
font-size: 25px;
margin-bottom: 50px;
`
const UserInfo = styled.p`
font-family: Barlow;
font-size: 18px;
margin-top: 15px;
`;