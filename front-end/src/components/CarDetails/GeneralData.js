import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function GeneralData() {
  const { id } = useParams();

  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================== READ GENERAL DATA ===========================
  useEffect(() => {
    Axios.get(`http://localhost:3002/dataone/get/${id}`)
      .then((response) => {
        setServerData(response.data.generalDataOne);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id]);

  const items = [
    { id: 1, li: "Condition véhicule :", value: serverData[0]?.state, name: 'state' },
    { id: 2, li: "Première immat.:", value: serverData[0]?.registration, name: 'registration' },
    { id: 3, li: "Kilométrage : ", value: serverData[0]?.miles, name: 'miles' },
    { id: 4, li: "Carburant :", value: serverData[0]?.fuel, name: 'fuel' },
    { id: 5, li: "Boite de vitesse :", value: serverData[0]?.gearbox, name: 'gearbox' },
    { id: 6, li: "Puissance :", value: serverData[0]?.horsePower, name: 'horsePower' },
    { id: 7, li: "Cylindrée :", value: serverData[0]?.cylinder, name: 'cylinder' },
    { id: 8, li: "Nombre de cylindre :", value: serverData[0]?.nbCylinder, name: 'nbCylinder' },
  ];

  const items2 = [
    { id: 1, li: "Emissions de CO2 :", value: serverData[0]?.co2, name: 'co2' },
    { id: 2, li: "Classe d'émission :", value: serverData[0]?.emission, name: 'emission' },
    { id: 3, li: "Carroserie :", value: serverData[0]?.body, name: 'body' },
    { id: 4, li: "Couleur :", value: serverData[0]?.color, name: 'color' },
    { id: 5, li: "Nombre de portes :", value: serverData[0]?.nbDoor, name: 'nbDoor' },
    { id: 6, li: "Voiture endommagée :", value: serverData[0]?.hitCar, name: 'hitCar' },
    { id: 7, li: "Contrôle techn. jusqu'au :", value: serverData[0]?.techCheck, name: 'techCheck' },
    { id: 8, li: "Car-Pass :", value: serverData[0]?.carPass, name: 'carPass' },
  ]

  return (
    <div>
      {loading ? (
        null
      ) : serverData[0] ? (
        <WrapperGeneralData>
          <TitleGeneralData>Données générales:</TitleGeneralData>
          <ItemContainer>
            <ul>
              {items.map((item) => (
                <Item key={item.id}>
                  <b>{item.li}</b> {item.value}
                </Item>
              ))}
            </ul>
            <ul>
              {items2.map((item2) => (
                <Item key={item2.id}>
                  <b>{item2.li}</b> {item2.value}
                </Item>
              ))}
            </ul>
          </ItemContainer>
        </WrapperGeneralData>) : null}
    </div>
  );
};

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const WrapperGeneralData = styled.div`
background-color: ${(props) => props.theme.card};
margin-top: 25px;
padding: 20px;

`;

const TitleGeneralData = styled.h3`
text-decoration: underline;
color: #242425;
font-family: libre baskerville;
font-size: 24px;
`;

const ItemContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 70%;
@media screen and (max-width: 768px){
  width: 90%;
}
@media screen and (max-width: 576px){
  flex-direction: column;
  align-items: start;
}
`;

const Item = styled.li`
color: #242425;
margin-top: 15px;
font-size: 19px;
`;