import styled from "styled-components";
import FilterSlider from "./FilterSlider";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";


export default function Cars() {

  const [carInfo, setCarInfo] = useState([]);
  const [kilometerRange, setKilometerRange] = useState([0, 250000]);
  const [priceRange, setPriceRange] = useState([2000, 150000]);
  const [yearRange, setYearRange] = useState([2000, 2023]);

  useEffect(() => {
    Axios.get("http://localhost:3002/get/carinfo")
    .then((response) => {
      setCarInfo(response.data);
    })
  }, [])

  const handleChange = (setValue) => (event, newValue) => {
    setValue(newValue)
  }
  const handleReset = (setReset, defaultNb) => () => {
    setReset(defaultNb);
  };

  const filterCars = () => {
    return carInfo.filter((car) => {
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
        <FilterSlider
          value={kilometerRange}
          onChange={handleChange(setKilometerRange)}
          min={0}
          max={250000}
          title="Kilométrage"
          resetBtn={handleReset(setKilometerRange, [0, 250000])}
        />
        <FilterSlider
          value={priceRange}
          onChange={handleChange(setPriceRange)}
          min={2000}
          max={150000}
          title="Prix"
          resetBtn={handleReset(setPriceRange, [2000, 150000])}
        />
        <FilterSlider
          value={yearRange}
          onChange={handleChange(setYearRange)}
          min={2000}
          max={2023}
          title="Année"
          resetBtn={handleReset(setYearRange, [2000, 2023])}
        />
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

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

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
