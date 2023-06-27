import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';


export default function Register() {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3002/login", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          setLoggedIn(true);
          setIsAdmin(response.data.isAdmin);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const register = () => {
    Axios.post('http://localhost:3002/register', {
      email: registerEmail,
      password: registerPassword
    }, { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!loggedIn || !isAdmin) {
    navigate('/register');
    return (
      <ErrorContainer>
        <Denied>Accès refusé ! Vous n'êtes pas administrateur.</Denied>
      </ErrorContainer>
    );
  }
  return (
    <ContainerConnexion>
      <ContainerInfoConnexion>
        <ContainerTitleText>
          <Title className="font-title">Garage V.Parrot</Title>
        </ContainerTitleText>
        <Form>
          <InputTitle className="font-title">Inscrire un employer</InputTitle>
          <Label className="font-text">E-mail</Label>
          <Input
            type="email"
            name="email"
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
            required />

          <Label className="font-text">Mot de passe</Label>
          <Input
            type="password"
            name="password"
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
            required />
          <ConnectButton onClick={register}>Inscrire</ConnectButton>
        </Form>
      </ContainerInfoConnexion>
    </ContainerConnexion>
  );
};

const ContainerConnexion = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 400px;
margin-top: 35px;
margin-bottom: 50px;

& .font-text{
  font-family: Barlow;
}
& .font-title{
  font-family: libre baskerville;
}
& a{
  margin-bottom: 15px;
  color: ${(props) => props.theme.mainColor};
  font-size: 12px;
}
`;
const ContainerInfoConnexion = styled.div`

`;

const ContainerTitleText = styled.div`
margin-top: 30px;
margin-bottom: 60px;
`;

const Title = styled.h1`
font-family: Libre baskerville;
font-weight: 600;
font-size: 25px;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
`;

const InputTitle = styled.h2`
margin-bottom: 25px;
font-weight: 600;
font-size: 20px;
`;

const Label = styled.label`
font-family: barlow;
font-size: 18px;
margin-bottom: 10px;
`;

const Input = styled.input`
margin-bottom: 15px;
height: 30px;
width: 350px;
background-color: ${(props) => props.theme.card};
border: none;
@media screen and (max-width: 768px) {
  width: 250px;
}
`;

const ConnectButton = styled.button`
font-family: barlow;
font-size: 18px;
font-weight: 600;
background-color: #242425;
color: #F5CB5C;
padding: 10px;
width: 50%;
cursor: pointer;
border: none;
border-radius: 5px;
`;



const ErrorContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
background-color: rgba(255, 50, 50, 0.8);
`;
const Denied = styled.h1`
color: #242425;
font-size: 32px;
`;