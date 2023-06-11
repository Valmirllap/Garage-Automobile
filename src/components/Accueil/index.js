import styled from "styled-components";
import MainTitle from "../hook/MainTitle";
import CardServices from "./CardServices";
import CommentSection from "./CommentSection";


export default function Accueil (){

return (
  <Wrapper>
    <MainTitle text="Service réparation"/>
    <CardServices/>
    <CommentSection/>
  </Wrapper>
)
}

const Wrapper = styled.div`
width: 100%;
`;

