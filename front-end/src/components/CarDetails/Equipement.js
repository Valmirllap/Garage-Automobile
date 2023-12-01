import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function Equipement() {
  const { id } = useParams();

  const [equipment1, setEquipment1] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3002/get/equipment/${id}`)
    .then((response) => {
      setEquipment1(response.data.equipment);
    })
  }, [id]);

  return (
    <Wrapper>
      {equipment1.length > 0 ? (
      <WrapperEquipment>
        <TitleEquipment>Equipement</TitleEquipment>
        <ul>
        {equipment1.map((item) => (
          <Item key={item.id}><b>{item.li}</b></Item>
        ))}
        </ul>
      </WrapperEquipment>
      ): null}
    </Wrapper>
  );
};

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Wrapper = styled.div``;

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