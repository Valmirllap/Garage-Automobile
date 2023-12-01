import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Axios from 'axios'
import SideBar from './SideBar';
import AccesDenied from '../hook/AccesDenied';
import AddCarForm from '../DashBoardComponent/AddCarForm';

export default function AchatDashboard() {

  const [carInfo, setCarInfo] = useState([]);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const [urlImg, setUrlImg] = useState();
  const [title, setTitle] = useState();
  const [year, setYear] = useState();
  const [gas, setGas] = useState();
  const [miles, setMiles] = useState();
  const [price, setPrice] = useState();

  // =========================== READ CAR ===========================
  useEffect(() => {
    Axios.get("https://garage-automobile-627012dfc93e.herokuapp.com/get/carinfo")
      .then((response) => {
        setCarInfo(response.data);
      })
  }, [])

  // =========================== UPDATE CAR ===========================
  const updateCar = (id) => {
    Axios.put(`https://garage-automobile-627012dfc93e.herokuapp.com/update/carinfo/${id}`, {
      image: urlImg,
      title: title,
      year: year,
      gas: gas,
      miles: miles,
      price: price,
    })
    window.location.reload();
  }

  // =========================== DELETE CAR ===========================
  const deleteCar = (id) => {
    Axios.delete(`https://garage-automobile-627012dfc93e.herokuapp.com/delete/carinfo/${id}`);
    window.location.reload();
  }

  // =========================== ACCES TO THE PAGE /DASHBOARD/ACHAT ===========================
  useEffect(() => {
    Axios.get("https://garage-automobile-627012dfc93e.herokuapp.com/login", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          setLogged(true);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  if (loading) {
    return null;
  }

  if (!logged) {
    return (
      <AccesDenied />
    );
  }
  return (
    <Wrapper>
      <SideBar />
      <AddCarForm />

      {carInfo.map((value) => {
        return (
          <CarWrapper key={value.id}>
            <Card>
              <Link to={value.picsLink}>
                <CardImage src={value.image} alt={value.car} />
              </Link>
              <input
                type='text'
                defaultValue={value.image}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setUrlImg(newValue);
                }} />
              <Content>
                <Title>{value.title}</Title>
                <input
                  type='text'
                  defaultValue={value.title}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setTitle(newValue);
                  }} />
                <ul>
                  <Text>Année: {value.year}</Text>
                  <input
                    type='text'
                    defaultValue={value.year}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setYear(newValue);
                    }} />
                  <Text>{value.gas}</Text>
                  <input
                    type='text'
                    defaultValue={value.gas}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setGas(newValue);
                    }} />
                  <Text>{value.miles} km</Text>
                  <input
                    type='text'
                    defaultValue={value.miles}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setMiles(newValue);
                    }} />
                  <Link to='/contactez-nous'><Text className="contact">Contactez-nous</Text></Link>
                </ul>
                <Price>
                  <p className="font">{value.price} €</p>
                  <input
                    type='text'
                    defaultValue={value.price}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setPrice(newValue);
                    }} />
                  <Link to={value.dashboardLink}>
                    <ButtonCard className="font">Détails</ButtonCard>
                  </Link>
                </Price>
              </Content>
              <ButtonChanges onClick={() => { updateCar(value.id) }}>Modifier</ButtonChanges>
              <ButtonChanges onClick={() => { deleteCar(value.id) }}>Supprimer</ButtonChanges>
            </Card>
          </CarWrapper>
        )
      })}
    </Wrapper>
  )
}

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Wrapper = styled.div`
width: 100%;
`;

const CarWrapper = styled.div`
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

const ButtonChanges = styled.button`
  padding: 5px;
  cursor: pointer;
`;