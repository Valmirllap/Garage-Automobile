import styled from "styled-components"
import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function AddSmallDetailsForm() {

  const { id } = useParams();

  const carId = id
  const [state, setState] = useState('');
  const [firstReg, setFirstReg] = useState('');
  const [gearBox, setGearBox] = useState('');
  const [fuel, setFuel] = useState('');
  const [miles, setMiles] = useState('');
  const [image, setImage] = useState('');
  const [alt, setAlt] = useState('');

  // =========================== CREATE SMALL DETAILS ===========================
  const handleSubmitSmallDetail = () => {
    Axios.post(`http://localhost:3002/smalldetails/create/${id}`, {
      car_id: carId,
      state: state,
      firstReg: firstReg,
      gearbox: gearBox,
      fuel: fuel,
      miles: miles,
      image: image,
      alt: alt,
    })
  }

  return (
    <div>
      <H1>Small Details Form</H1>
      <FormAdd onSubmit={handleSubmitSmallDetail}>
        <Input className="hide" type='text' value={carId} readOnly />

        <Label>L'état de la voiture (occasion ou neuve)?</Label>
        <Input type='text' name='state' value={state} onChange={(e) => setState(e.target.value)} required />

        <Label>Date d'enregistrement?</Label>
        <Input type='text' name='firstReg' value={firstReg} onChange={(e) => setFirstReg(e.target.value)} required />

        <Label>Quel type de boite de vitesse?</Label>
        <Input type='text' name='gearBox' value={gearBox} onChange={(e) => setGearBox(e.target.value)} required />

        <Label>Quel type de carburant?</Label>
        <Input type='text' name='fuel' value={fuel} onChange={(e) => setFuel(e.target.value)} required />

        <Label>Nombre de kilomètres?</Label>
        <Input type='text' name='miles' value={miles} onChange={(e) => setMiles(e.target.value)} required />

        <Label>Insérer l'image adéquat</Label>
        <Input type='text' name='image' value={image} onChange={(e) => setImage(e.target.value)} required />

        <Label>Brève description de la voiture</Label>
        <Input type='text' name='alt' value={alt} onChange={(e) => setAlt(e.target.value)} required />
        <ButtonSend type="submit">Envoyer</ButtonSend>
      </FormAdd>
    </div>
  )
}
// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const H1 = styled.h1`
  font-family: Libre Baskerville;
  font-weight: 700;
  font-size: 32px;
`;

const FormAdd = styled.form`
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