import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Connexion() {

  return(
    <ContainerConnexion>
        <ContainerInfoConnexion>
          <ContainerTitleText>
            <Title className="font-title">Garage V.Parrot</Title>
            <Text className="font-text">Connexion accessible seulement pour les employés et administrateur du site.</Text>
          </ContainerTitleText>
          <Form>
            <InputTitle className="font-title">Connectez-vous</InputTitle>

            <Label className="font-text">E-mail</Label>
            <Input type="email" id="email" name="email" required/>

            <Label className="font-text">Mot de passe</Label>
            <Input type="password" id="password" name="password" required/>

            <Link className="font-text">Mot de passe oublié?</Link>

            <ConnectButton>Se connecter</ConnectButton>
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
margin-bottom: 60px;
`;

const Title = styled.h1`
font-family: Libre baskerville;
font-weight: 600;
font-size: 25px;
`;

const Text = styled.p`
margin-top: 15px;
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