import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";


export default function Connexion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;
  const login = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3002/login', {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        const isAdmin = response.data.isAdmin;
        const isEmployee = response.data.isEmployee;
        if (isAdmin) {
          navigate("/register");
        }
        else if (isEmployee) {
          navigate("/contactez-nous");
        }
      }
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:3002/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(
          <div>
            <p>You're still connected</p>
            <Link to="/">Go to the dashBoard</Link>
          </div>
        )
      }
    });
  }, []);

  return (
    <ContainerConnexion>
      <ContainerInfoConnexion>
        <ContainerTitleText>
          <Title className="font-title">Garage V.Parrot</Title>
          <Text className="font-text">Connexion accessible seulement pour les employés et administrateur du site.</Text>
        </ContainerTitleText>
        <Form>
          <InputTitle className="font-title">Connectez-vous</InputTitle>
          <Label className="font-text">E-mail</Label>
          <Input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required />

          <Label className="font-text">Mot de passe</Label>
          <Input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required />

          <Link className="font-text">Mot de passe oublié?</Link>

          <ConnectButton onClick={login}>Se connecter</ConnectButton>
          <ErrorMessage>{loginStatus}</ErrorMessage>
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

const Text = styled.p`
margin-top: 10px;
font-size: 14px;
width: 80%;
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
width: 90%;
background-color: ${(props) => props.theme.card};
border: none;
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

const ErrorMessage = styled.h1`
  font-family: libre baskreville;
  font-size: 18px;
  color: red;
  margin-top: 15px;
`;