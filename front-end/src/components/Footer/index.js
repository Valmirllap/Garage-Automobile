import styled from "styled-components";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function Footer() {
  const [dataDB, setDataDB] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3002/get/opening').then((response) => {
      setDataDB(response.data);
    })
  }, [])

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
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <th>Location</th>
            <th>Menu</th>
            <th>Contact</th>
            <th>Horaire d'ouverture</th>
          </tr>
          {dataDB.map((value) => {
            return (
              <tr key={value.id}>
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
                <td className='update'>{value.openingTime}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Wrapper>
  )
}

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Wrapper = styled.footer`
height: 350px;
display: flex;
justify-content: space-between;
background-color: #242425;
color: #CFDBD5;
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
  font-size: 15px;
  padding: 10px;
  @media screen and (max-width: 998px){
    font-size: 13px;
  }
  @media screen and (max-width: 768px){
    font-size: 11px;
  }
  @media screen and (max-width: 576px){
    font-size: 9px;
  }
}
& a{
  text-decoration: none;
  color: #CFDBD5;
}
& .menu{
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