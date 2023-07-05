import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Error() {
  return (
    <ErrorContainer className="error-container">
      <ErrorTitle>Error 404. Cette page n'existe pas!</ErrorTitle>
      <ErrorText>S'il vous ErrorTextlait vérifier l'URL et réessayez</ErrorText>
      <Link className='linkStyle' to="/">Accueil</Link>
    </ErrorContainer>
  )
}


const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  text-align: center;
  background-color: lightpink;
  & .linkStyle {
    text-decoration: none;
    color: blue;
    &:hover{
      transition: linear 0.1s;
      font-size: 20px;
    }
  }
`;

const ErrorTitle = styled.h2`
  font-size: 24px;
  color: #f44336;
  margin-bottom: 15px;
`;

const ErrorText = styled.p`
  font-size: 18px;
  color: #888;
  margin-bottom: 10px;
`;