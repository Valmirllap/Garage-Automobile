import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';

export default function AddGeneralDataForm() {
  const { id } = useParams();

  const carId = id
  const [state, setState] = useState('');
  const [registration, setRegistration] = useState('');
  const [miles, setMiles] = useState('');
  const [fuel, setFuel] = useState('');
  const [gearbox, setGearbox] = useState('');
  const [horsePower, setHorsePower] = useState('');
  const [cylinder, setCylinder] = useState('');
  const [nbCylinder, setNbCylinder] = useState('');
  const [co2, setCo2] = useState('');
  const [emission, setEmission] = useState('');
  const [body, setBody] = useState('');
  const [color, setColor] = useState('');
  const [nbDoor, setNbDoor] = useState('');
  const [hitCar, setHitCar] = useState('');
  const [techCheck, setTechCheck] = useState('');
  const [carPass, setCarPass] = useState('');

  // =========================== CREATE GENERAL DATA ===========================
  const handleSubmitGeneralData = () => {
    Axios.post(`http://localhost:3002/dataone/create/${id}`, {
      car_id: carId,
      state: state,
      registration: registration,
      miles: miles,
      fuel: fuel,
      gearbox: gearbox,
      horsePower: horsePower,
      cylinder: cylinder,
      nbCylinder: nbCylinder,
      co2: co2,
      emission: emission,
      body: body,
      color: color,
      nbDoor: nbDoor,
      hitCar: hitCar,
      techCheck: techCheck,
      carPass: carPass,
    })
    window.location.reload();
  }

  return (
    <Wrapper>
      <H1>Formulaire de données générales</H1>
      <WrapperForm>
        <Form>
          <Input className='hide' type='text' value={carId} readOnly/>

          <Label>Condition du véhicule</Label>
          <Input type='text' value={state} onChange={(e) => setState(e.target.value)} required/>

          <Label>Date d'immatriculation</Label>
          <Input type='text' value={registration} onChange={(e) => setRegistration(e.target.value)} required/>

          <Label>Kilométrage</Label>
          <Input type='text' value={miles} onChange={(e) => setMiles(e.target.value)} required />

          <Label>Type de carburant</Label>
          <Input type='text' value={fuel} onChange={(e) => setFuel(e.target.value)} required />

          <Label>Boite de vitesse</Label>
          <Input type='text' value={gearbox} onChange={(e) => setGearbox(e.target.value)} required />

          <Label>Nombre de chevaux</Label>
          <Input type='text' value={horsePower} onChange={(e) => setHorsePower(e.target.value)} required />

          <Label>Quel type de cylindre</Label>
          <Input type='text' value={cylinder} onChange={(e) => setCylinder(e.target.value)} required />

          <Label>Nombre de cylindre</Label>
          <Input type='text' value={nbCylinder} onChange={(e) => setNbCylinder(e.target.value)} required />
        </Form>

        <Form>
          <Label>Taux d'emission de CO2</Label>
          <Input type='text' value={co2} onChange={(e) => setCo2(e.target.value)} required />

          <Label>Classe d'emission</Label>
          <Input type='text' value={emission} onChange={(e) => setEmission(e.target.value)} required />

          <Label>Quel type de carroserie</Label>
          <Input type='text' value={body} onChange={(e) => setBody(e.target.value)} required />

          <Label>Quel couleur</Label>
          <Input type='text' value={color} onChange={(e) => setColor(e.target.value)} required />

          <Label>Nombre de portes</Label>
          <Input type='text' value={nbDoor} onChange={(e) => setNbDoor(e.target.value)} required />

          <Label>La voiture est-elle endommagée</Label>
          <Input type='text' value={hitCar} onChange={(e) => setHitCar(e.target.value)} required />

          <Label>Validité du contrôle technique</Label>
          <Input type='text' value={techCheck} onChange={(e) => setTechCheck(e.target.value)} required />

          <Label>Car-Pass disponible</Label>
          <Input type='text' value={carPass} onChange={(e) => setCarPass(e.target.value)} required />
        </Form>
      </WrapperForm>
      <ButtonSend onClick={handleSubmitGeneralData}>Envoyer</ButtonSend>
    </Wrapper>
  )
}

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================
const Wrapper = styled.div`
border: 1px solid;
margin-top: 20px;
`;

const H1 = styled.h1`
font-family: Libre Baskerville;
font-size: 25px;
font-weight: 700;
margin-bottom: 20px;
`;

const WrapperForm = styled.form`
display: flex;
align-items: center;
justify-content: space-around;
`;

const Form = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`;

const Label = styled.label`
font-family: Libre Baskerville;
  font-weight: 700;
  @media screen and (max-width: 605px) {
  font-size: 13px;
}
`;

const Input = styled.input`
width: 60%;
padding: 5px;
margin-bottom: 15px;
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
&:hover{
  background-color: black;
  color: gold;
}
@media screen and (max-width: 605px) {
  font-size: 15px;
  width: 100px;
}
`;