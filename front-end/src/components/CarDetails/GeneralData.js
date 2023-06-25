import styled from "styled-components";
import generalData from "../UI/carGeneralData/generalData.json";
import { useParams } from "react-router-dom";

export default function GeneralData() {
  const { id } = useParams();

  const content = generalData.find(item => item.id === id);

  const items = [
    { id: 1, li: "Condition véhicule :", value: content?.state },
    { id: 2, li: "Première immat.:", value: content?.registration },
    { id: 3, li: "Kilométrage : ", value: content?.miles },
    { id: 4, li: "Carburant :", value: content?.fuel },
    { id: 5, li: "Boite de vitesse :", value: content?.gearbox },
    { id: 6, li: "Puissance :", value: content?.horsePower },
    { id: 7, li: "Cylindrée :", value: content?.cylinder },
    { id: 8, li: "Nombre de cylindre :", value: content?.nbCylinder },
    { id: 9, li: "Emissions de CO2 :", value: content?.co2 },
  ];

  const items2 = [
    { id: 10, li: "Classe d'émission :", value: content?.emission },
    { id: 11, li: "Carroserie :", value: content?.body },
    { id: 12, li: "Couleur :", value: content?.color },
    { id: 13, li: "Nombre de portes :", value: content?.nbDoor },
    { id: 14, li: "Voiture endommagée :", value: content?.hitCar },
    { id: 15, li: "Contrôle techn. jusqu'au :", value: content?.techCheck },
    { id: 16, li: "Car-Pass :", value: content?.carPass },

  ]

  return (
    <div>
      {content ? (
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
        </WrapperGeneralData> ) : null}
    </div>
  );
};

// GENERAL DATA 

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