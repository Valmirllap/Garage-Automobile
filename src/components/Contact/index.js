import styled from "styled-components";
import MainTitle from "../hook/MainTitle";
import ContactForm from "./ContactForm";


export default function Contact() {
  return (
    <Wrapper>
      <MainTitle text="Formulaire de contact" />
      <ContactForm/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
`;

