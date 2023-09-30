import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Axios from 'axios'
import SideBar from './SideBar';
import AccesDenied from '../hook/AccesDenied';


export default function AchatDashboard() {
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

  if(loading){
    return null;
  }

  if (!logged) {
    return (
      <AccesDenied/>
    );
  }

  return (
    <Wrapper>
      <SideBar />
      AchatDashboard
    </Wrapper>
  )
}

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Wrapper = styled.div`

`;

