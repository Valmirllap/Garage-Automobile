import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import SideBar from './SideBar'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

export default function DashBoard() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3002/login", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          setLogged(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!logged) {
    navigate("/dashboard")
    return (
      <ErrorContainer>
        <Denied>Accès refusé ! Vous n'avez pas accès à cette page.</Denied>
      </ErrorContainer>
    );
  }

  return (
    <Wrapper>
      <SideBar/>
      hello
    </Wrapper>
    
  )
}

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Wrapper = styled.div`
  display: flex;
`;

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