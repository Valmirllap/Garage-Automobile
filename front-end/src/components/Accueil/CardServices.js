import styled from "styled-components"
import { useState, useEffect } from "react";
import Axios from "axios";

export default function CardServices() {
  const [servicesDB, setServicesDB] = useState([]);
    // ============================== RETRIEVE A SERVICE ==============================
    useEffect(() => {
      Axios.get('https://garage-automobile-627012dfc93e.herokuapp.com/service/get')
        .then((response) => {
          setServicesDB(response.data)
        })
    }, []);

  return (
    <Display>
      {servicesDB.map((value) => {
        return (
          <ContainerService key={value.id}>
            <Img src={value.image} alt={value.title} />
            <ServiceText>
              <h1>{value.title}</h1>
              <p>à partir de {value.price}€</p>
            </ServiceText>
          </ContainerService>
        );
      })}
    </Display>
  );
};

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Display = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const ContainerService = styled.div`
margin: 50px 0;
width: 35%;
border-radius: 0 0 10px 10px;
box-shadow: 7px 13px 20px black;
@media screen and (max-width: 576px){
  width: 50%;
}
`;

const Img = styled.img`
width: 100%;
margin-bottom: -10px;
`;

const ServiceText = styled.div`
background-color: #242425;
height: 100px;
border-radius: 0 0 10px 10px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
& h1 {
  font-size: 24px;
  font-weight: 600;
  font-family: Barlow;
  color: #CFDBD5;
  @media screen and (max-width: 768px){
    font-size: 22px;
  }
  @media screen and (max-width: 576px){
    font-size: 17px;
  }
}
& p {
  margin-top: 10px;
  font-size: 20px;
  color: #F5CB5C;
  @media screen and (max-width: 768px){
    font-size: 16px;
  }
  @media screen and (max-width: 576px){
    font-size: 13px;
  }
}
`;