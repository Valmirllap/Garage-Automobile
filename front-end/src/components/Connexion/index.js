import styled from "styled-components";
import MainTitle from "../hook/MainTitle";
import Connexion from "./Connexion";

export default function ConnexionForm() {

  return (
    <Wrapper>
      <MainTitle text="Connexion" />
      <Connexion/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
`;
