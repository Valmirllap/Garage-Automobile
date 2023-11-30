import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import ErrorPage from "../hook/ErrorPage";

export default function DashBoardEquipment() {
  const { id } = useParams();

  const [equipment1, setEquipment1] = useState([]);
  const [modifyEquip, setModifyEquip] = useState();
  const [carModelId, setCarModelId] = useState(id);

  const [loading, setLoading] = useState(true);

  // =========================== CREATE EQUIPMENT ===========================
  const handleSubmitEquipment = () => {
    Axios.post("https://garage-automobile-627012dfc93e.herokuapp.com/create/equipment", {
      car_model_id: carModelId,
      li: modifyEquip,
    })
  }

  // =========================== READ EQUIPMENTS ===========================
  useEffect(() => {
    Axios.get(`https://garage-automobile-627012dfc93e.herokuapp.com/get/equipment/${id}`)
      .then((response) => {
        setEquipment1(response.data.equipment);
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id]);

  // =========================== UPDATE EQUIPMENT ===========================
  const updateEquipment = (id) => {
    Axios.put(`https://garage-automobile-627012dfc93e.herokuapp.com/update/equipment/${id}`, {
      li: modifyEquip,
    });
    window.location.reload();
  }

  // =========================== DELETE EQUIPMENT ===========================
  const deleteEquipment = (id) => {
    Axios.delete(`https://garage-automobile-627012dfc93e.herokuapp.com/delete/equipment/${id}`);
    window.location.reload();
  }
  // =========================== DELETE ALL EQUIPMENT ===========================
  const deleteAllEquipment = (id) => {
    Axios.delete(`https://garage-automobile-627012dfc93e.herokuapp.com/delete/allequipment/${id}`);
    window.location.reload();
  }

  return (
    <Wrapper>
      <H1>Equipement Form</H1>
      <Form>
        <Input
          type='text'
          name='carModelId'
          value={carModelId}
          onChange={(e) => {
            setCarModelId(e.target.value);
          }}
          className='hide'
          readOnly />
        <Label>Insérer l'équipement que vous devez ajouter</Label>
        <Input
          type='text'
          name='li'
          value={modifyEquip}
          onChange={(e) => {
            setModifyEquip(e.target.value);
          }} />
        <ButtonSend onClick={handleSubmitEquipment}>Envoyer</ButtonSend>
      </Form>
      {loading ? (
        null
      ) : equipment1.length > 0 ? (
        <WrapperEquipment>
          <TitleEquipment>Equipement</TitleEquipment>
          <ul>
            {equipment1.map((item) => (
              <Item key={item.id}>
                <b>{item.li}</b>
                <input
                  type="text"
                  name="equipment"
                  defaultValue={item.li}
                  onChange={(e) => {
                    setModifyEquip(e.target.value);
                  }} />
                <ButtonChanges onClick={() => { updateEquipment(item.id) }}>Modifier</ButtonChanges>
                <ButtonChanges onClick={() => { deleteEquipment(item.id) }}>Supprimer</ButtonChanges>
              </Item>
            ))}
          </ul>
          <div>
            <ButtonChanges className="delete-all" onClick={() => { deleteAllEquipment(equipment1[0].car_model_id) }}>Supprimer tout</ButtonChanges>
          </div>
        </WrapperEquipment>
      ) : <ErrorPage error="Erreur: Cette page n'existe pas. Veuillez remplir le forumlaire ci-dessus" />}
    </Wrapper>
  );
};

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Wrapper = styled.div``;

const WrapperEquipment = styled.div`
margin: 25px 0 25px 0;
padding: 20px;
background-color: ${(props) => props.theme.card};
& .delete-all {
    margin-top: 20px;
  }
`;

const H1 = styled.h1`
  font-family: Libre Baskerville;
  font-weight: 700;
  font-size: 32px;
`;

const TitleEquipment = styled.h2`
text-decoration:underline; 
font-family: libre baskerville;
font-size: 24px;
font-weight: 600;
color: #242425;
`;

const Item = styled.li`
margin-top: 10px;
color: #242425;
font-size: 19px;
  @media screen and (max-width: 576px){
    font-size: 15px;
    display: flex;
    flex-direction: column;
  }
`;

// FORM TO ADD EQUIPMENT TO THE CAR
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
  @media screen and (max-width: 576px) {
    font-size: 12px;
    width: 30%;
  }
`;