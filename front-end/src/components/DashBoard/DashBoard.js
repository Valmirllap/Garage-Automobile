import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import SideBar from './SideBar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AccesDenied from '../hook/AccesDenied';
import Urus from '../../Images/Urus.jpg';

export default function DashBoard() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  // =========================== ACCES TO THE PAGE /DASHBOARD ===========================
  useEffect(() => {
    Axios.get("https://garage-automobile-627012dfc93e.herokuapp.com/login", { withCredentials: true })
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

  if (loading) {
    return null;
  }

  if (!logged) {
    navigate("/dashboard")
    return (
      <AccesDenied />
    );
  }

  return (
    <Wrapper>
      <SideBar />
      <BackgroundImg src={Urus} alt='Urus' />
      <DashboardHome>
        <DashboardContent>
          <Title>Bienvenue sur le tableau de bord</Title>
          <Paragraphe>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Paragraphe>
        </DashboardContent>
      </DashboardHome>
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
@media screen and (max-width: 768px){
    flex-direction: column;
  }
`;


const DashboardHome = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const DashboardContent = styled.div`
  width: 100%;
  @media screen and (max-width: 768px){
    width: 80%;
    margin-top: 10px;
  }
  @media screen and (max-width: 576px){
    width: 90%;
  }
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 700;
  font-family: Libre Baskerville;
  line-height: 1.2;
  @media screen and (max-width: 768px){
    font-size: 35px;
  }
`;

const Paragraphe = styled.p`
  font-size: 17px;
  font-family: barlow;
  margin: 20px 0 40px;
  line-height: normal;
  @media screen and (max-width: 768px){
   font-size: 15px;
  }
`;

const BackgroundImg = styled.img`
  width: 30%;
  margin-right: 30px;
  &:hover {
    border-radius: 30%;
    transition: 1s;
    opacity: 0.6;
  }
  @media screen and (max-width: 768px){
    width: 60%;
    margin-top: 10px;
  }
  @media screen and (max-width: 576px){
    width: 85%;
  }
`;