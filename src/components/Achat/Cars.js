import styled from "styled-components";
import Mercedes from "../../Images/mercedes.jpg";
import Fiat from "../../Images/fiat.jpg";
import Toyota from "../../Images/toyota.jpg";
import Audi from "../../Images/audi.jpg";
import Slider from '@mui/material/Slider';
import { Link } from "react-router-dom";
import { useState } from "react";


export default function Cars() {

  const [caracteristicsCar] = useState([
    {
      id: 1,
      image: Mercedes,
      car: 'Voiture Mercedes',
      title: 'Mercedes GLA 200 - AMG d Line 150 CH - Diesel',
      year: 2020,
      gas: 'Diesel',
      miles: 177986,
      price: 45768,
      link: '/achat/details/mercedes', // this path we can find it in the app component and the id = mercedes
      picsLink: "/achat/pics/mercedes",
    },
    {
      id: 2,
      image: Fiat,
      car: 'Voiture Fiat',
      title: 'Fiat 1.2i Lounge 69 CH - Essence',
      year: 2009,
      gas: 'Essence',
      miles: 145676,
      price: 6899,
      link: '/achat/details/fiat',
      picsLink: "/achat/pics/fiat",
    },
    {
      id: 3,
      image: Toyota,
      car: 'Voiture Toyota',
      title: 'Toyota 1.8 GR Sport 122 CH -Hybride',
      year: 2017,
      gas: 'Hybride',
      miles: 17236,
      price: 23544,
      link: '/achat/details/toyota',
      picsLink: "/achat/pics/toyota",
    },
    {
      id: 4,
      image: Audi,
      car: 'Voiture Audi',
      title: 'Audi SB 35TFSI S-Tronic 150 CH - Essence',
      year: 2021,
      gas: 'Essence',
      miles: 100776,
      price: 34067,
      link: '/achat/details/audi',
      picsLink: "/achat/pics/audi",
    },
  ]);

  const [kilometerRange, setKilometerRange] = useState([0, 250000]);
  const [priceRange, setPriceRange] = useState([2000, 150000]);
  const [yearRange, setYearRange] = useState([2000, 2023]);

  const handleKilometerChange = (event, newValue) => {
    setKilometerRange(newValue);
  };
  const handleResetKilometrage = () => {
    setKilometerRange([0, 250000]);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const handleResetPrice = () => {
    setPriceRange([2000, 150000]);
  }

  const handleYearChange = (event, newValue) => {
    setYearRange(newValue);
  };
  const handleResetYear = () => {
    setYearRange([2000, 2023]);
  }

  const filterCars = () => {
    return caracteristicsCar.filter((car) => {
      return (
        car.miles >= kilometerRange[0] &&
        car.miles <= kilometerRange[1] &&
        car.price >= priceRange[0] &&
        car.price <= priceRange[1] &&
        car.year >= yearRange[0] &&
        car.year <= yearRange[1]
      );
    });
  };

  return (
    <div>
      <Filters>
        <TitleFilters>Kilometrage</TitleFilters>
        <Slider
          className="range-slider"
          value={kilometerRange}
          onChange={handleKilometerChange}
          valueLabelDisplay="auto"
          min={0}
          step={1}
          max={250000}
        />
        <Displayfilters>
          <SmallText>{kilometerRange.join(' - ')}</SmallText>
          <ResetBtn onClick={handleResetKilometrage}>Réinitialiser</ResetBtn>
        </Displayfilters>
        <TitleFilters>Price</TitleFilters>
        <Slider
          className="range-slider"
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={2000}
          step={1}
          max={150000}
        />
        <Displayfilters>
          <SmallText>{priceRange.join(' - ')}</SmallText>
          <ResetBtn onClick={handleResetPrice}>Réinitialiser</ResetBtn>
        </Displayfilters>
        <TitleFilters>Année</TitleFilters>
        <Slider
          className="range-slider"
          value={yearRange}
          onChange={handleYearChange}
          valueLabelDisplay="auto"
          min={2000}
          step={1}
          max={2023}
        />
        <Displayfilters>
          <SmallText>{yearRange.join(' - ')}</SmallText>
          <ResetBtn onClick={handleResetYear}>Réinitialiser</ResetBtn>
        </Displayfilters>
      </Filters>
      {filterCars().map((value) => {
        return (
          <Wrapper key={value.id}>
            <Card>
              <Link to={value.picsLink}>
                <CardImage src={value.image} alt={value.car} />
              </Link>
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
                  <Link to={value.link}>
                    <ButtonCard className="font">Détails</ButtonCard>
                  </Link>
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

const Filters = styled.div`
margin: 20px 0 0 20px;
display: flex;
flex-direction: column;
& .range-slider{
  width: 270px;
  margin: 20px 0 0 20px;
  color: ${(props) => props.theme.mainColor};
  @media screen and (max-width: 576px){
    font-size: 16px;
    width: 200px;
  }
}
`;
const TitleFilters = styled.h2`
font-size: 20px;
font-weight: 600;
font-family: barlow;
@media screen and (max-width: 576px){
  font-size: 16px;
}
`;

const Displayfilters = styled.div`
display: flex;
justify-content: space-between;
width: 300px;
margin: 10px 0 10px 0;
@media screen and (max-width: 576px){
  font-size: 16px;
  width: 230px;
}
`;

const SmallText = styled.div`
margin-top: 7px;
font-size: 15px;
@media screen and (max-width: 576px){
  font-size: 13px
}
`;
const ResetBtn = styled.button`
background-color: #242425;
padding: 5px;
color: #F5CB5C;
border: none;
cursor: pointer;
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
