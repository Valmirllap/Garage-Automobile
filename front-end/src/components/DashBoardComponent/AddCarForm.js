import { useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios';

export default function AddCarForm() {

  const [urlImg, setUrlImg] = useState();
  const [alt, setAlt] = useState('Voiture');
  const [title, setTitle] = useState();
  const [year, setYear] = useState();
  const [gas, setGas] = useState();
  const [miles, setMiles] = useState();
  const [price, setPrice] = useState();

  const [urlLink, setUrlLink] = useState('/achat/details/');
  const [picsLink, setPicsLink] = useState('/achat/pics/');
  const [dashboardUrlLink, setDashboardUrlLink] = useState('/dashboard/achat/details/');
  const handleInputsChange = (e) => {
    const newValue = e.target.value;
    setUrlLink(newValue);
    setPicsLink('/achat/pics/' + newValue.slice('/achat/details/'.length)); // if we don't slice then it will add /achat/details/ 
    setCarPicsName(newValue.slice('/achat/details/'.length));
    setDashboardUrlLink('/dashboard/achat/details/' + newValue.slice('/achat/details/'.length));
  }

  const [carPicsName, setCarPicsName] = useState();
  const [urlPics, setUrlPics] = useState();

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
      dashboardLink: dashboardUrlLink,
    })
  }
// =========================== CREATE PICS ===========================
  const handleSubmitPics = () => {
    Axios.post("http://localhost:3002/carpics/insert", {
      car_pics_name: carPicsName,
      url_img: urlPics,
    })
  }

  return (
    <Wrapper>
      <H1>Formulaire pour ajouter une voiture</H1>
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

        <Label>Insérer le modèle de la voiture avec la première lettre majuscule</Label>
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
          className='hide'
          type='text'
          name='picsLink'
          value={picsLink}
          readOnly />
          <Input
          className='hide'
          type='text'
          name='dashboarLink'
          value={dashboardUrlLink}
          readOnly />

        <ButtonSend onClick={HandleSubmitCar}>Envoyer</ButtonSend>
      </Form>

      <H1>Formulaire pour insérer les photos afin de créer une galerie</H1>
      <Form>
        <Label>Insérer le modèle de la voiture</Label>
        <Input
          type='text'
          name='carPicsName'
          value={carPicsName}
          onChange={(e) => {
            setCarPicsName(e.target.value);
          }} />
        <Label>Insérer la nouvelle image du véhicule</Label>
        <Input
          type='text'
          name='urlPics'
          value={urlPics}
          onChange={(e) => {
            setUrlPics(e.target.value);
          }} />
        <ButtonSend onClick={handleSubmitPics}>Envoyer</ButtonSend>
      </Form>

    </Wrapper>
  )
}


// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Wrapper = styled.div`

`;

const H1 = styled.h1`
font-family: Libre Baskerville;
font-size: 25px;
font-weight: 700;
margin-top: 20px;
`;

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