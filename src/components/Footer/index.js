import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Footer() {
  const data = [
    {location:"Localisation 1: 89 av. de l'Astronaute Bondy, FR 93140", menu: "Accueil", link:"/", contact:"Tél.: +33 123456789", openingTime:"lun.: 08:45 - 12:00, 14:00 - 18:00"},
    {location:"Localisation 2: 17 rue M. A. gardient Allek, FR 90070", menu: "Achat", link:"/achat", contact:"Email: Example@gmail.com", openingTime:"mar.: 08:45 - 12:00, 14:00 - 18:00"},
    {location:"Localisation 3: 48 Place de la Gare Colomiers, FR 31770", menu: "Contactez-nous", link:"/contactez-nous", contact:"Réseau sociaux:", openingTime:"mer.: 08:45 - 12:00, 14:00 - 18:00"},
    {location:"Localisation 4: 56 Place de la République, FR 31560",menu: "Connexion", link:"/connexion", contact:" instagram - facebook - twitter", openingTime:"jeu.: 08:45 - 12:00, 14:00 - 18:00"},
    {openingTime:"ven.: 08:45 - 12:00, 14:00 - 18:00"},
    {openingTime:"sam.: 08:45 - 12:00"},
    {openingTime:"dim.: Fermé"},
  ]
return (
  <Wrapper>
   <table>
    <tr>
      <th>Location</th>
      <th>Menu</th>
      <th>Contact</th>
      <th>Horaire d'ouverture</th>
    </tr>
    {data.map((val, key) => {
      return (
        <tr key={key}>
          <td>{val.location}</td>
          <td><Link to={val.link}>{val.menu}</Link></td>
          <td>{val.contact}{val.media}</td>
          <td>{val.openingTime}</td>
        </tr>
      )
    })}
   </table>
  </Wrapper>
)
}

const Wrapper = styled.footer`
height: 350px;
padding: 20px;
display: flex;
justify-content: space-between;
background-color: #242425;
color: #CFDBD5;
& table {
  width: 100%;
  height: 350px;
}
& th {
  font-size: 20px;
  text-decoration: underline;
  text-align: left;
}
& a{
  text-decoration: none;
  color: #CFDBD5;
  &:hover{
    transition: linear 0.2s;
    font-size: 20px;
    border-bottom: 1px solid #CFDBD5;
  }
}
`;