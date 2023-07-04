import styled from "styled-components";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa"
import { Link } from "react-router-dom";

export default function Footer() {
  const data = [
    {
      id: 1,
      location: "Localisation 1: 89 av. de l'Astronaute Bondy, FR 93140",
      menu: "Accueil",
      link: "/",
      contact: "Tél.: +33 123456789",
      openingTime: "lun.: 08:45 - 12:00, 14:00 - 18:00"
    },
    {
      id: 2,
      location: "Localisation 2: 17 rue M. A. gardient Allek, FR 90070",
      menu: "Achat",
      link: "/achat",
      contact: "Email: Example@gmail.com",
      openingTime: "mar.: 08:45 - 12:00, 14:00 - 18:00"
    },
    {
      id: 3,
      location: "Localisation 3: 48 Place de la Gare Colomiers, FR 31770",
      menu: "Contactez-nous",
      link: "/contactez-nous",
      contact: "Réseau sociaux:",
      openingTime: "mer.: 08:45 - 12:00, 14:00 - 18:00"
    },
    {
      id: 4,
      location: "Localisation 4: 56 Place de la République, FR 31560",
      menu: "Connexion",
      link: "/connexion",
      contact: [
        <Link to="https://www.facebook.com"><FaFacebookSquare className="social-logo" /></Link>,
        <Link to="https://www.instagram.com"><FaInstagramSquare className="social-logo" /></Link>,
        <Link to="https://www.twitter.com"><FaTwitterSquare className="social-logo" /></Link>
      ],
      openingTime: "jeu.: 08:45 - 12:00, 14:00 - 18:00"
    },
    { id: 5, openingTime: "ven.: 08:45 - 12:00, 14:00 - 18:00" },
    { id: 6, openingTime: "sam.: 08:45 - 12:00" },
    { id: 7, openingTime: "dim.: Fermé" },
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
          {data.map((value) => {
            return (
              <tr key={value.id}>
                <td>{value.location}</td>
                <td><Link className="menu" to={value.link}>{value.menu}</Link></td>
                <td>{value.contact}</td>
                <td>{value.openingTime}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Wrapper>
  )
}

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