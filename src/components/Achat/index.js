import styled from "styled-components";

import Cars from "./Cars";
import MainTitle from "../hook/MainTitle";

export default function Achat (){
return (
  <Wrapper>
    <MainTitle text="Vendeur voiture d'occasion"/>
    
    <Cars/>
  </Wrapper>
  )
};
// Body
const Wrapper = styled.div`
overflow-x:hidden;
`;