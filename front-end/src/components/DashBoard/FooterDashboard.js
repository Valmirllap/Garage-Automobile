import React from 'react'
import styled from "styled-components";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa"
import { Link } from "react-router-dom";
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
    Axios.get('http://localhost:3002/get/opening')
      .then((response) => {
        setDataDB(response.data);
      })
  }, [])
  // =========================== UPDATE SCHEDULE ===========================
  const updateOpeningTime = (id) => {
    Axios.put('http://localhost:3002/update/opening', {
      openingTime: open,
      id: id,
    });
    setOpen("");
  }

  // =========================== ACCES TO THE PAGE /DASHBOARD/FOOTER ONLY THE ADMIN ===========================
  useEffect(() => {
    Axios.get('http://localhost:3002/login', { withCredentials: true })
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

  const data = [
    { id: 1, contact: "Tél.: +33 123456789" },
    { id: 2, contact: "Email: Example@gmail.com" },
    { id: 3, contact: "Réseau sociaux:" },
    {
      id: 4, contact: [
        <Link to="https://www.facebook.com"><FaFacebookSquare className="social-logo" /></Link>,
        <Link to="https://www.instagram.com"><FaInstagramSquare className="social-logo" /></Link>,
        <Link to="https://www.twitter.com"><FaTwitterSquare className="social-logo" /></Link>
      ]
    },
    { id: 5, contact: "" },
    { id: 6, contact: "" },
    { id: 7, contact: "" },
  ];
  return (
    <Container>
      <SideBar />
      <Wrapper>
        <ContainerTable>
          <table>
            <tbody>
              <tr>
                <th>Location</th>
                <th>Menu</th>
                <th>Contact</th>
                <th>Horaire d'ouverture</th>
              </tr>
              {dataDB.map((value, index) => (
                <tr key={index}>
                  <td>{value.Location}</td>
                  <td><Link className="menu" to={value.link}>{value.menu}</Link></td>
                  {data.map((social) => {
                    if (social.id === value.id) {
                      return (
                        <td key={social.id}>{social.contact}</td>
                      )
                    }
                    return null
                  })}
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
  width: 50%;
  @media screen and (max-width: 768px){
    font-size: 13px;
    width: 100%;
  }
`;

const InputChange = styled.input`
  width: 100%;
  @media screen and (max-width: 768px){
    font-size: 13px;
  }
`;