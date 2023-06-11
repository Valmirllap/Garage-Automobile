import styled from "styled-components";
import EquipmentData from "../UI/equipementData/equipementData.json";
import { useParams } from "react-router-dom";

export default function Equipement() {
  const { id } = useParams();

  const equipment = EquipmentData.equipmentCar.find((item) => item.id === id);
  return (
    <div>
      {equipment ? (
      <WrapperEquipment>
        <TitleEquipment>Equipement</TitleEquipment>
        <ul>
        {equipment.contentLi.map((item) => (
          <Item key={item.id}><b>{item.li}</b></Item>
        ))}
        </ul>
      </WrapperEquipment>
      ): null}
    </div>
  );
};

const WrapperEquipment = styled.div`
margin: 25px 0 25px 0;
padding: 20px;
background-color: ${(props) => props.theme.card};
`;

const TitleEquipment = styled.h2`
text-decoration:underline; 
font-family: libre baskerville;
font-size: 24px;
font-weight: 600;
`;

const Item = styled.li`
margin-top: 10px;
color: #242425;
font-size: 19px;
`;