import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Axios from 'axios'
import SideBar from './SideBar';
import AccesDenied from '../hook/AccesDenied';

export default function AchatDashboard() {

  const [carInfo, setCarInfo] = useState([]);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const [urlImg, setUrlImg] = useState('');
  const [alt, setAlt] = useState('Voiture');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState();
  const [gas, setGas] = useState('');
  const [miles, setMiles] = useState();
  const [price, setPrice] = useState();

  const [urlLink, setUrlLink] = useState('/achat/details/');
  const [picsLink, setPicsLink] = useState('/achat/pics/');
  const handleInputsChange = (e) => {
    const newValue = e.target.value;
    setUrlLink(newValue);
    setPicsLink('/achat/pics/' + newValue.slice('/achat/details/'.length)); // if we don't slice then it will add /achat/details/ 
  }

  // =========================== CREATE CAR ===========================
  const HandleSubmitCar = () => {
    Axios.post("http://localhost:3002/post/carinfo", {
      image: urlImg,
      car: alt,
      title: title,
      year: year,
      gas: gas,
      miles: miles,
      price: price,
      link: urlLink,
      picsLink: picsLink,
    })
  }

  // =========================== READ CAR ===========================
  useEffect(() => {
    Axios.get("http://localhost:3002/get/carinfo")
      .then((response) => {
        setCarInfo(response.data);
      })
  }, [])

  // =========================== UPDATE CAR ===========================
  const updateCar = (id) => {
    Axios.put(`http://localhost:3002/update/carinfo/${id}`, {
      image: urlImg,
      alt: alt,
      title: title,
      year: year,
      gas: gas,
      miles: miles,
      price: price,
      link: urlLink,
      picsLink: picsLink,
    })
      .then((response) => {
        console.log(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      })
  }


  // =========================== DELETE CAR ===========================
  const deleteCar = (id) => {
    Axios.delete(`http://localhost:3002/delete/carinfo/${id}`);
    window.location.reload();
  }


  // =========================== ACCES TO THE PAGE /DASHBOARD/ACHAT ===========================
  useEffect(() => {
    Axios.get("http://localhost:3002/login", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          setLogged(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  if(loading){
    return null;
  }

  if (!logged) {
    return (
      <AccesDenied/>
    );
  }
  return (
    <Wrapper>
      <SideBar />

      <Form>
        <Label>Insérer l'url de l'image</Label>
        <Input
          type='text'
          name='URLimg'
          value={urlImg}
          onChange={(e) => {
            setUrlImg(e.target.value)
          }}
          placeholder="Insérer l'url de l'image" />

        <Label>Insérer le modèle de la voiture</Label>
        <Input
          type='text'
          name='alt'
          value={alt}
          onChange={(e) => {
            setAlt(e.target.value)
          }} />

        <Label>Insérer le modèle, chevaux et carburant de la voiture</Label>
        <Input
          type='text'
          name='title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          placeholder="Insérer le modèle de la voiture" />

        <Label>Insérer l'année de la voiture</Label>
        <Input
          type='text'
          name='year'
          value={year}
          onChange={(e) => {
            setYear(e.target.value)
          }}
          placeholder="Insérer l'année de la voiture" />

        <Label>Insérer le type de carburant de la voiture</Label>
        <Input
          type='text'
          name='gas'
          value={gas}
          onChange={(e) => {
            setGas(e.target.value)
          }}
          placeholder="Insérer le type de carburant de la voiture" />

        <Label>Insérer le nombre de kilomètre de la voiture</Label>
        <Input
          type='text'
          name='miles'
          value={miles}
          onChange={(e) => {
            setMiles(e.target.value)
          }}
          placeholder="Insérer le nombre de kilomètre de la voiture" />

        <Label>Insérer le prix de la voiture</Label>
        <Input
          type='text'
          name='price'
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
          }}
          placeholder="Insérer le prix de la voiture" />

        <Label>Insérer le modèle de la voiture</Label>
        <Input
          type='text'
          name='urlLink'
          value={urlLink}
          onChange={handleInputsChange} />
        <Input
          type='text'
          name='picsLink'
          value={picsLink}
          readOnly />

        <ButtonSend onClick={HandleSubmitCar}>Envoyer</ButtonSend>
      </Form>


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
                  <Link to={value.link}>
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

// ========= AJOUTER UN NOUVEAU VÉHICULE =========

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  padding: 10px;
  margin-top: 10px;
`;

const Label = styled.label`
  font-family: Libre Baskerville;
  font-weight: 700;
  @media screen and (max-width: 605px) {
  font-size: 13px;
}
`;
const Input = styled.input`
  width: 70%;
  padding: 10px;
  margin: 10px 0 10px 0;
  border: 1px solid ;
  background-color: ${(props) => props.theme.card};
  @media screen and (max-width: 605px) {
  font-size: 13px;
}
`;

const ButtonSend = styled.button`
font-size: 20px;
background-color: #242425;
color: #F5CB5C;
border: none;
padding: 10px;
width: 150px;
cursor: pointer;
border-radius: 10px;
@media screen and (max-width: 605px) {
  font-size: 15px;
  width: 100px;
}
`;

const ButtonChanges = styled.button`
  padding: 5px;
  cursor: pointer;
`;