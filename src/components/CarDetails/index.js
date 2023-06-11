import styled from "styled-components";
import SmallDetails from "./SmallDetails";
import GeneralData from "./GeneralData";
import Equipement from "./Equipement";


export default function CarDetails() {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>Détail voiture d'occasion</Title>
      </TitleContainer>
      <SmallDetails/>
      <GeneralData/>
      <Equipement/>
    </Wrapper>

  );
};

const Wrapper = styled.div`

`;

const TitleContainer = styled.div`
diplay: flex;
align-items: center;
justify-content: center;
width: 100vw;
padding: 20px;
background-color: #242425;
color: #CFDBD5;
margin-top: 25px;
`;

const Title = styled.h1`
font-family: libre baskerville;
font-weight: 600;
font-size:24px;
text-align: center;
`;



