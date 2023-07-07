import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';

export default function Register() {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3002/login", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          setLogged(true);
          setAdmin(response.data.isAdmin);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Validation Email with REGEX
  const validateEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };
  const register = () => {
    if (!validateEmail(registerEmail)) {
      setEmailError(true);
      return;
    }

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
  // Tout autre personne n'étant pas admin
  // ACCÈS REFUSÈ!!!
  if (!logged || !admin) {
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
              setEmailError(false);
            }}
            required />
          { // Message d'erreur en dessous de input email si pas un Email tapez
            emailError &&
            <ErrorText className='font-text'>
              Entrer un email: exemple@worker.com
            </ErrorText>
          }

          <Label className="font-text">Mot de passe</Label>
          <Input
            type="password"
            name="password"
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
            required />
          <ConnectButton className='font-text' onClick={register}>Inscrire</ConnectButton>
          <DashBoard>
            <p>You're connected! Click down below to get access to the dashboard</p>
            <Link to="/dashboard">Go to the dashBoard</Link>
          </DashBoard>
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

const DashBoard = styled.div`
color: red;
margin-top: 10px; 
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

const ErrorText = styled.p`
color: red;
font-weight: 600;
margin-bottom: 10px;
`;