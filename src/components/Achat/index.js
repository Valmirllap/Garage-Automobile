import styled from "styled-components";
import FilterComponent from "./FilterComponent";
import Cars from "./Cars";
import MainTitle from "../hook/MainTitle";

export default function Achat (){
return (
  <Wrapper>
    <MainTitle/>
    <FilterComponent/>
    <Cars/>
  </Wrapper>
  )
};
// Body
const Wrapper = styled.div`
overflow-x:hidden;
`;