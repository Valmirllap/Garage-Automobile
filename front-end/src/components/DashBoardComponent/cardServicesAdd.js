import styled from "styled-components"
import { useEffect, useState } from "react";
import Axios from "axios";
import AddServiceForm from "./AddServiceForm";

export default function CardServicesAdd() {
  const [servicesDB, setServicesDB] = useState([]);
  const [updateImage, setUpdateImage] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  // ============================== RETRIEVE A SERVICE ==============================
  useEffect(() => {
    Axios.get('http://localhost:3002/service/get')
      .then((response) => {
        setServicesDB(response.data)
      })
  }, []);

  // ============================== UPDATE A SERVICE ================================
  const updateService = (id) => {
    Axios.put('http://localhost:3002/service/update', {
      image: updateImage,
      title: updateTitle,
      price: updatePrice,
      id: id,
    });
    window.location.reload();
  }

  // ============================== DELETE A SERVICE ================================
  const deleteService = (id) => {
    Axios.delete(`http://localhost:3002/service/delete/${id}`);
    window.location.reload();
  }
  // =========================== ACCES TO THE PAGE /DASHBOARD/FOOTER ONLY THE ADMIN ===========================
  useEffect(() => {
    Axios.get('http://localhost:3002/login', { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          setLogged(true);
          setAdmin(response.data.isAdmin);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  })

  if (loading) {
    return null;
  }

  if (!logged || !admin) {
    return (
      null
    )
  }
  return (
    <Display>
      <AddServiceForm />
      {servicesDB.map((value) => {
        return (
          <ContainerService key={value.id}>

            <input
              type="text"
              onChange={(e) => setUpdateImage(e.target.value)}
              defaultValue={value.image}
            />
            <Img src={value.image} alt={value.title} />

            <ServiceText>

              <h1>{value.title}</h1>
              <input
                type="text"
                onChange={(e) => setUpdateTitle(e.target.value)}
                defaultValue={value.title} />

              <p>à partir de {value.price}€</p>
              <input
                type="text"
                onChange={(e) => setUpdatePrice(e.target.value)}
                defaultValue={value.price} />
            </ServiceText>
            <ButtonChange onClick={() => { updateService(value.id) }}>Modifier</ButtonChange>
            <ButtonChange onClick={() => { deleteService(value.id) }}>Supprimer</ButtonChange>
          </ContainerService>
        );
      })}
    </Display>
  );
};

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Display = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const ContainerService = styled.div`
margin: 50px 0;
width: 35%;
border-radius: 0 0 10px 10px;
box-shadow: 7px 13px 20px black;
@media screen and (max-width: 576px){
  width: 50%;
}
& input {
  width: 90%;
}
`;

const Img = styled.img`
width: 100%;
margin-bottom: -10px;
`;

const ServiceText = styled.div`
background-color: #242425;
height: 100px;
border-radius: 0 0 10px 10px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
& h1 {
  font-size: 24px;
  font-weight: 600;
  font-family: Barlow;
  color: #CFDBD5;
  @media screen and (max-width: 768px){
    font-size: 20px;
  }
}
& p {
  margin-top: 10px;
  font-size: 20px;
  color: #F5CB5C;
  @media screen and (max-width: 768px){
    font-size: 16px;
  }
}
`;

const ButtonChange = styled.button`
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
`;