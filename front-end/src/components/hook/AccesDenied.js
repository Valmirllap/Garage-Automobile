import styled from "styled-components";

export default function AccesDenied() {
  return (
    <ErrorContainer>
      <Denied>Accès refusé ! Vous n'avez pas accès à cette page.</Denied>
    </ErrorContainer>
  )
}

const ErrorContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
background-color: rgba(255, 50, 50, 0.8);
`;
const Denied = styled.h1`
color: #242425;
font-size: 32px;
`;
