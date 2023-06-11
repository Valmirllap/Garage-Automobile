import styled from "styled-components";
import Mercedes from "../../Images/mercedes.jpg";
import Fiat from "../../Images/fiat.jpg";
import Toyota from "../../Images/toyota.jpg";
import Audi from "../../Images/audi.jpg";
import { Link } from "react-router-dom";


export default function Cars() {

const caracteristicsCar = [
  {
    id: 1, 
    image: Mercedes,
    car: 'Voiture Mercedes', 
    title: 'Mercedes GLA 200 - AMG d Line 150 CH - Diesel', 
    year: '2020',
    gas: 'Diesel',
    miles: '177986',
    price: '45768',
    link: '/achat/details/mercedes', // this path we can find it in the app component and the id = mercedes
  },
  {
    id: 2, 
    image: Fiat, 
    car: 'Voiture Fiat',
    title: 'Fiat 1.2i Lounge 69 CH - Essence', 
    year: '2009',
    gas: 'Essence',
    miles: '145676',
    price: '6899',
    link: '/achat/details/fiat',
  },
  {
    id: 3, 
    image: Toyota, 
    car: 'Voiture Toyota',
    title: 'Toyota 1.8 GR Sport 122 CH -Hybride', 
    year: '2017',
    gas: 'Hybride',
    miles: '17236',
    price: '23544',
    link: '/achat/details/toyota', 
  },
  {
    id: 4, 
    image: Audi,
    car: 'Voiture Audi', 
    title: 'Audi SB 35TFSI S-Tronic 150 CH - Essence', 
    year: '2021',
    gas: 'Essence',
    miles: '100776 km',
    price: '34067',
    link: '/achat/details/audi',
  },
]

  return (
    <div>
    { caracteristicsCar.map((value) => {
      return (
        <Wrapper key={value.id}>
        <Card>
          <CardImage src={value.image} alt={value.car}/>
          <Content>
            <Title>{value.title}</Title>
            <ul>
              <Text>Année: {value.year}</Text>
              <Text>{value.gas}</Text>
              <Text>{value.miles} km</Text>
              <Link to='/contactez-nous'><Text className="contact">Contactez-nous</Text></Link>
            </ul>
            <Price>
              <p className="font">{value.price} €</p>
              <Link to={value.link}><ButtonCard className="font">Détails</ButtonCard></Link>
            </Price>
          </Content>
        </Card>
      </Wrapper>
      )
    })}
    </div>
  );
};


// ===> STYLED <=== \\

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 10px 0 40px 0;
& a {
  text-decoration: none;
}
& .contact {
  color: #242425;
  width: 40%;
  &:hover{
    font-size:16px;
    text-decoration: underline;
    }
}
`;

const Card = styled.div`
background-color: ${(props) => props.theme.card};
width: 45%;
box-shadow: 7px 13px 20px black;
border-radius: 10px;
`;

const CardImage = styled.img`
width: 100%;
border-radius: 10px;
`;

const Content = styled.div`
padding: 10px;
color: #242425;
`;

const Title = styled.h2`
margin-bottom: 15px;
font-family: libre baskerville;
font-weight: 600;
font-size: 18px;
@media screen and (max-width: 605px) {
  font-size: 16px;
}
`;

const Text = styled.li`
font-family: barlow;
font-size: 14px;
margin-bottom: 5px;
@media screen and (max-width: 605px) {
  font-size: 12px;
}
`;

const Price = styled.div`
& .font {
  font-size: 18px;
  font-weight: 600;
  font-family: barlow;
  @media screen and (max-width: 605px) {
    font-size: 16px;
  }
}
display: flex;
justify-content: space-between;
margin-top: 15px;
`;

const ButtonCard = styled.button`
background-color: #242425;
color: #F5CB5C;
border: none;
padding: 10px;
width: 150px;
margin-top: -15px;
cursor: pointer;
border-radius: 10px;
@media screen and (max-width: 605px) {
  width: 100px;
}
`;
