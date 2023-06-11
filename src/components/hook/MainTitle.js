import styled from "styled-components";

export default function MainTitle({text}) {
  return (
    <TitleContainer>
      <Title>{text}</Title>
    </TitleContainer>
  );
};

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