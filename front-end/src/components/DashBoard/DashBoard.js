import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import SideBar from './SideBar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AccesDenied from '../hook/AccesDenied';

export default function DashBoard() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:3002/login", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          setLogged(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  if(loading) {
    return null;
  }

  if (!logged) {
    navigate("/dashboard")
    return (
      <AccesDenied/>
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