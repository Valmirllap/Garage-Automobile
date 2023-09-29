import styled from "styled-components";
import Mercedes from "../../Images/mercedes.jpg";
import Fiat from "../../Images/fiat.jpg";
import Toyota from "../../Images/toyota.jpg";
import Audi from "../../Images/audi.jpg";
import { useParams, Link } from "react-router-dom";


export default function SmallDetails() {
  const { id } = useParams();

  const dataDetails = [
    {
      id: 'mercedes',
      state: 'Occasion',
      firstReg: '04/2020',
      gearbox: 'automatique',
      fuel: 'Diesel',
      miles: '177.986 km',
      image: Mercedes,
      alt: 'Voiture en détail de la mercedes',
    },
    {
      id: 'fiat',
      state: 'Occasion',
      firstReg: '05/2009',
      gearbox: 'automatique',
      fuel: 'Essence',
      miles: '145.676 km',
      image: Fiat,
      alt: 'Voiture en détail de la fiat',
    },
    {
      id: 'toyota',
      state: 'Occasion',
      firstReg: '02/2017',
      gearbox: 'automatique',
      fuel: 'Hybride',
      miles: '17.236 km',
      image: Toyota,
      alt: 'Voiture en détail de la toyota',
    },
    {
      id: 'audi',
      state: 'Occasion',
      firstReg: '08/2021',
      gearbox: 'automatique',
      fuel: 'Essence',
      miles: '100.776 km',
      image: Audi,
      alt: 'Voiture en détail de l\'audi',
    },
  ];
  const content = dataDetails.find(item => item.id === id);

  const items = [
    { id: 1, li: 'Etat :', value: content?.state },
    { id: 2, li: 'Première immatr.:', value: content?.firstReg },
    { id: 3, li: 'Boite de vitesse :', value: content?.gearbox },
    { id: 4, li: 'Carburant', value: content?.fuel },
    { id: 5, li: 'Kilométrage :', value: content?.miles },
    { id: 6, li: 'Classe d\'émission: / ' },
  ];
return (
  <div>
  {content ?
      <WrapperDetail>
        <Img src={content.image} alt={content.alt} />
        <ShortDetail>
          <ul>
            {items.map((item) => (
              <InformationsCar key={item.id}><b>{item.li}</b> {item.value}</InformationsCar>
            ))}
          </ul>
          <Form>
            <Link to='tel:+33123456789'><ButtonPhone className="btn">Téléphone</ButtonPhone></Link>
            <Link to='/contactez-nous'><ButtonContact className="btn">Contactez-nous</ButtonContact></Link>
          </Form>
        </ShortDetail>
      </WrapperDetail> : <p>Erreur 404: Cette page n'existe pas!</p>}
    </div>
);
};

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const WrapperDetail = styled.div`
display: flex;
width: 100%;
margin-top: 30px;
@media screen and (max-width: 576px) {
  flex-direction: column;
}
`;

const ShortDetail = styled.div`
padding: 20px;
width: 60%;
display: flex;
flex-direction: column;
justify-content: space-between;
@media screen and (max-width: 576px) {
  margin-left: 10px;
}
`;
const Img = styled.img`
width: 50%;
@media screen and (max-width: 768px) {
  width:60%;
}
@media screen and (max-width: 576px) {
  width: 80%;
  margin-left: 25px;
}
`;

const InformationsCar = styled.li`
margin-top: 10px;
margin-bottom: 20px;
font-size: 18px;
@media screen and (max-width: 768px) {
  font-size: 16px;
}
`;

const Form = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 95%;
@media screen and (max-width: 768px) {
  flex-direction: column;
  align-items: start;
  
}
`;

const ButtonPhone = styled.button`
background-color: #242425;
color: #F5CB5C;
@media screen and (max-width: 768px) {
  flex-direction: column;
  align-items: start;
  margin-bottom: 15px;
}
`;


const ButtonContact = styled.button`
background-color: #F5CB5C;
color: #242425;
`;