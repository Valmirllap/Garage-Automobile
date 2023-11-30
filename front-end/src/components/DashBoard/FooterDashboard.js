import React from 'react'
import styled from "styled-components";
import { useState, useEffect } from "react";
import Axios from 'axios';
import SideBar from './SideBar';
import AccesDenied from '../hook/AccesDenied';

export default function FooterDashboard() {
  const [dataDB, setDataDB] = useState([]);
  const [open, setOpen] = useState("");
  const [logged, setLogged] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // =========================== READ SCHEDULE ===========================
  useEffect(() => {
    Axios.get('https://garage-automobile-627012dfc93e.herokuapp.com/get/opening')
      .then((response) => {
        setDataDB(response.data);
      })
  }, [])
  // =========================== UPDATE SCHEDULE ===========================
  const updateOpeningTime = (id) => {
    Axios.put('https://garage-automobile-627012dfc93e.herokuapp.com/update/opening', {
      openingTime: open,
      id: id,
    });
    window.location.reload();
  }

  // =========================== ACCES TO THE PAGE /DASHBOARD/FOOTER ONLY THE ADMIN ===========================
  useEffect(() => {
    Axios.get('https://garage-automobile-627012dfc93e.herokuapp.com/login', { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          setLogged(true);
          setAdmin(response.data.isAdmin);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  })

  if (loading) {
    return null;
  }

  if (!logged || !admin) {
    return (
      <AccesDenied />
    )
  }

  return (
    <Container>
      <SideBar />
      <Wrapper>
        <ContainerTable>
          <table>
            <tbody>
              <tr>
                <th>Horaire d'ouverture</th>
              </tr>
              {dataDB.map((value, index) => (
                <tr key={index}>
                  <td className='update'>{value.openingTime}
                    <InputChange type='text' defaultValue={value.openingTime} onChange={(e) => {
                      setOpen(e.target.value)
                    }} />
                    <ButtonModify onClick={() => { updateOpeningTime(value.id) }}>Modifier</ButtonModify>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContainerTable>
      </Wrapper>
    </Container>
  )
}

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Container = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerTable = styled.footer`
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.backgroundColor};
  @media screen and (max-width: 768px){
    width: 100%;
  }
   & table {
    width: 100%;
    height: 350px;
}
    & th {
      font-family: barlow;
      font-size: 20px;
      text-decoration: underline;
      text-align: left;
      padding: 10px;
      @media screen and (max-width: 998px){
        font-size: 18px;
}
    @media screen and (max-width: 768px){
      font-size: 16px;
}
    @media screen and (max-width: 576px){
      font-size: 14px;
  }
}
    & td {
      font-family: barlow;
      font-size: 14px;
      padding: 10px;
      @media screen and (max-width: 998px){
        font-size: 13px;
  }
      @media screen and (max-width: 768px){
        font-size: 11px;
  }
      @media screen and (max-width: 576px){
        font-size: 10px;
  }
}
    & .update {
      display:flex;
      flex-direction: column;
    }
      & a{
        text-decoration: none;
        color: #CFDBD5;
}
  & .menu{
    color: ${(props) => props.theme.backgroundColor};
    &:hover{
        transition: linear 0.2s;
      font-size: 20px;
      border-bottom: 1px solid #CFDBD5;
      @media screen and (max-width: 998px){
        font-size: 18px;
      }
      @media screen and (max-width: 768px){
        font-size: 16px;
      }
      @media screen and (max-width: 576px){
        font-size: 14px;
      }
    }
}
`;

const ButtonModify = styled.button`
  width: 30%;
  @media screen and (max-width: 768px){
    font-size: 13px;
    width: 30%;
  }
`;

const InputChange = styled.input`
  width: 50%;
  @media screen and (max-width: 768px){
    font-size: 13px;
    width: 70%;
  }
`;