import styled from "styled-components";
import SmallDetails from "./SmallDetails";
import GeneralData from "./GeneralData";
import Equipement from "./Equipement";
import MainTitle from "../hook/MainTitle";


export default function CarDetails() {
  return (
    <Wrapper>
      <MainTitle text="Détail voiture d'occasion"/>
      <SmallDetails/>
      <GeneralData/>
      <Equipement/>
    </Wrapper>

  );
};

const Wrapper = styled.div`

`;



