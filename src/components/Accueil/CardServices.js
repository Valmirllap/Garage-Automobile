import styled from "styled-components"
import Revision from "../../Images/revision.jpg";
import Kit from "../../Images/kit-de-distribution.jpg";
import Brakes from "../../Images/brakes.jpg";
import Clutch from "../../Images/clutch.jpg";
import Ac from "../../Images/AC.jpg";

export default function CardServices() {
  const services = [
    { id: 1, image: Revision, title: "Révision Auto", price: "à partir de 50€" },
    { id: 2, image: Kit, title: "Kit de distribution", price: "à partir de 350€" },
    { id: 3, image: Brakes, title: "Disques et plaquettes de frein", price: "à partir de 59€" },
    { id: 4, image: Clutch, title: "Embrayage", price: "à partir de 279€" },
    { id: 5, image: Ac, title: "Climatisation", price: "à partir de 55€" },
  ];
  return (
    <Display>
      {services.map((value) => {
        return (
          <ContainerService>
            <Img src={value.image} alt={value.title} />
            <ServiceText key={value.id}>
              <h1>{value.title}</h1>
              <p>{value.price}</p>
            </ServiceText>
          </ContainerService>
        );
      })}
    </Display>
  );
};


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
    font-size: 20px;
  }
}
& p {
  margin-top: 10px;
  font-size: 20px;
  color: #F5CB5C;
  @media screen and (max-width: 768px){
    font-size: 16px;
  }
}
`;