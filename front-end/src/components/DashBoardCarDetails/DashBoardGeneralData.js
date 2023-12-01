import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import ErrorPage from "../hook/ErrorPage";
import AddGeneralDataForm from "../DashBoardComponent/AddGeneralDataForm";

export default function DashBoardGeneralData() {
  const { id } = useParams();

  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    state: serverData[0]?.state,
    registration: serverData[0]?.registration,
    miles: serverData[0]?.miles,
    fuel: serverData[0]?.fuel,
    gearbox: serverData[0]?.gearbox,
    horsePower: serverData[0]?.horsePower,
    cylinder: serverData[0]?.cylinder,
    nbCylinder: serverData[0]?.nbCylinder,
    co2: serverData[0]?.co2,
    emission: serverData[0]?.emission,
    body: serverData[0]?.body,
    color: serverData[0]?.color,
    nbDoor: serverData[0]?.nbDoor,
    hitCar: serverData[0]?.hitCar,
    techCheck: serverData[0]?.techCheck,
    carPass: serverData[0]?.carPass,
  });
  const handleChange = (e, name) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // =========================== READ GENERAL DATA ===========================
  useEffect(() => {
    Axios.get(`https://garage-automobile-627012dfc93e.herokuapp.com/dataone/get/${id}`)
      .then((response) => {
        setServerData(response.data.generalDataOne);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id]);
  // =========================== UPDATE GENERAL DATA ===========================
  const updateGeneraldata = (id) => {
    Axios.put(`https://garage-automobile-627012dfc93e.herokuapp.com/dataone/update/${id}`, formData)
    window.location.reload();
  }

  // =========================== DELETE GENERAL DATA ===========================
  const deleteGeneralData = (id) => {
    Axios.delete(`https://garage-automobile-627012dfc93e.herokuapp.com/dataone/delete/${id}`);
    window.location.reload();
  }

  const items = [
    { id: 1, li: "Condition véhicule :", value: serverData[0]?.state, name: 'state' },
    { id: 2, li: "Première immat.:", value: serverData[0]?.registration, name: 'registration' },
    { id: 3, li: "Kilométrage : ", value: serverData[0]?.miles, name: 'miles' },
    { id: 4, li: "Carburant :", value: serverData[0]?.fuel, name: 'fuel' },
    { id: 5, li: "Boite de vitesse :", value: serverData[0]?.gearbox, name: 'gearbox' },
    { id: 6, li: "Puissance :", value: serverData[0]?.horsePower, name: 'horsePower' },
    { id: 7, li: "Cylindrée :", value: serverData[0]?.cylinder, name: 'cylinder' },
    { id: 8, li: "Nombre de cylindre :", value: serverData[0]?.nbCylinder, name: 'nbCylinder' },
  ];

  const items2 = [
    { id: 1, li: "Emissions de CO2 :", value: serverData[0]?.co2, name: 'co2' },
    { id: 2, li: "Classe d'émission :", value: serverData[0]?.emission, name: 'emission' },
    { id: 3, li: "Carroserie :", value: serverData[0]?.body, name: 'body' },
    { id: 4, li: "Couleur :", value: serverData[0]?.color, name: 'color' },
    { id: 5, li: "Nombre de portes :", value: serverData[0]?.nbDoor, name: 'nbDoor' },
    { id: 6, li: "Voiture endommagée :", value: serverData[0]?.hitCar, name: 'hitCar' },
    { id: 7, li: "Contrôle techn. jusqu'au :", value: serverData[0]?.techCheck, name: 'techCheck' },
    { id: 8, li: "Car-Pass :", value: serverData[0]?.carPass, name: 'carPass' },
  ]

  return (
    <Wrapper>
      {loading ? (
        null
      ) : serverData[0] ? (
        <WrapperGeneralData>
          <TitleGeneralData>Données générales:</TitleGeneralData>
          <ItemContainer>
            <ul>
              {items.map((item) => (
                <Item key={item.id}>
                  <b>{item.li}</b> {item.value}
                  <div>
                    <input
                      type="text"
                      name={item.name}
                      defaultValue={item.value}
                      value={formData[0]}
                      onChange={(e) => handleChange(e, item.name)}
                    />
                  </div>
                </Item>
              ))}
            </ul>
            <ul>
              {items2.map((item2) => (
                <Item key={item2.id}>
                  <b>{item2.li}</b> {item2.value}
                  <div>
                    <input
                      type="text"
                      name={item2.name}
                      defaultValue={item2.value}
                      value={formData[0]}
                      onChange={(e) => handleChange(e, item2.name)}
                    />
                  </div>
                </Item>
              ))}
            </ul>

          </ItemContainer>
          <ButtonChanges onClick={() => { updateGeneraldata(serverData[0].id) }}>Modifier</ButtonChanges>
          <ButtonChanges onClick={() => { deleteGeneralData(serverData[0].id) }}>Supprimer</ButtonChanges>
        </WrapperGeneralData>) :
        <div>
          <AddGeneralDataForm />
          <ErrorPage error="Les données général n'existe pas. Veuillez remplir le forumlaire ci-dessus" />
        </div>}
    </Wrapper>
  );
};

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Wrapper = styled.div`
`;

const WrapperGeneralData = styled.div`
background-color: ${(props) => props.theme.card};
margin: 25px 0 25px 0;
padding: 20px;
`;

const TitleGeneralData = styled.h3`
margin-top: 20px;
text-decoration: underline;
color: #242425;
font-family: libre baskerville;
font-size: 24px;
`;

const ItemContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 70%;
@media screen and (max-width: 768px){
  width: 90%;
}
@media screen and (max-width: 576px){
  flex-direction: column;
  align-items: start;
}
`;

const Item = styled.li`
color: #242425;
margin-top: 15px;
font-size: 19px;
`;

const ButtonChanges = styled.button`
  padding: 5px;
  cursor: pointer;
`;
