import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import ErrorPage from "../hook/ErrorPage";


export default function SmallDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [smallDetails, setSmallDetails] = useState([]);

  // =========================== READ SMALL DETAILS ===========================
  useEffect(() => {
    Axios.get(`https://garage-automobile-627012dfc93e.herokuapp.com/smalldetails/get/${id}`)
      .then((response) => {
        setSmallDetails(response.data.smallDetail);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id]);

  return (
    <Wrapper>
      {loading ? (
        <p>loading...</p>
      ) : smallDetails.length > 0 ?
        <WrapperDetail>
          {smallDetails.map((item) => (
            <Wrapper key={item.id}>
              <Img src={item.image} alt={item.alt} />
              <ShortDetail>
                <ul>
                  <InformationsCar>
                    <b>Etat : </b> {item.state}
                  </InformationsCar>
                  <InformationsCar>
                    <b>Première immatr.:</b> {item.firstReg}
                  </InformationsCar>
                  <InformationsCar>
                    <b>Boite de vitesse :</b> {item.gearbox}
                  </InformationsCar>
                  <InformationsCar>
                    <b>Carburant:</b> {item.fuel}
                  </InformationsCar>
                  <InformationsCar>
                    <b>Kilométrage :</b> {item.miles}
                  </InformationsCar>
                  <InformationsCar>
                    <b>Classe d\'émission: /</b>
                  </InformationsCar>
                </ul>
                <Form>
                  <Link to='tel:+33123456789'><ButtonPhone className="btn">Téléphone</ButtonPhone></Link>
                  <Link to='/contactez-nous'><ButtonContact className="btn">Contactez-nous</ButtonContact></Link>
                </Form>
              </ShortDetail>
            </Wrapper>
          ))}
        </WrapperDetail> : <ErrorPage error="Erreur: Cette page n'existe pas"/>}
    </Wrapper>
  );
};

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Wrapper = styled.div`
display: flex;
width: 100%;
@media screen and (max-width: 576px) {
  flex-direction: column;
}
`;

const WrapperDetail = styled.div`
margin-top: 30px;
`;

const ShortDetail = styled.div`
padding: 20px;
width: 60%;
display: flex;
flex-direction: column;
justify-content: space-between;
@media screen and (max-width: 576px) {
  margin-left: 10px;
}
`;
const Img = styled.img`
width: 50%;
@media screen and (max-width: 768px) {
  width:60%;
}
@media screen and (max-width: 576px) {
  width: 80%;
  margin-left: 25px;
}
`;

const InformationsCar = styled.li`
margin-top: 10px;
margin-bottom: 20px;
font-size: 18px;
@media screen and (max-width: 768px) {
  font-size: 16px;
}
`;

const Form = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 95%;
@media screen and (max-width: 768px) {
  flex-direction: column;
  align-items: start;
  
}
`;

const ButtonPhone = styled.button`
background-color: #242425;
color: #F5CB5C;
@media screen and (max-width: 768px) {
  flex-direction: column;
  align-items: start;
  margin-bottom: 15px;
}
`;


const ButtonContact = styled.button`
background-color: #F5CB5C;
color: #242425;
`;