import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import ErrorPage from "../hook/ErrorPage";
import AddSmallDetailsForm from "../DashBoardComponent/AddSmallDetailsForm";

export default function DashBoardSmallDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [smallDetails, setSmallDetails] = useState([]);

  const [state, setState] = useState();
  const [firstReg, setFirstReg] = useState();
  const [gearBox, setGearBox] = useState();
  const [fuel, setFuel] = useState();
  const [miles, setMiles] = useState();
  const [image, setImage] = useState();
  const [alt, setAlt] = useState();

  // =========================== READ SMALL DETAILS ===========================
  useEffect(() => {
    Axios.get(`http://localhost:3002/smalldetails/get/${id}`)
      .then((response) => {
        setSmallDetails(response.data.smallDetail);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id]);

  // =========================== UPDATE SMALL DETAILS ===========================
  const updateSmallDetail = (id) => {
    Axios.put(`http://localhost:3002/smalldetails/update/${id}`, {
      state: state,
      firstReg: firstReg,
      gearbox: gearBox,
      fuel: fuel,
      miles: miles,
      image: image,
      alt: alt,
    });
    window.location.reload();
  }

  // =========================== DELETE SMALL DETAILS ===========================
  const deleteSmallDetails = (id) => {
    Axios.delete(`http://localhost:3002/smalldetails/delete/${id}`);
    window.location.reload();
  }

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : smallDetails.length > 0 ?
        <WrapperDetail>
          {smallDetails.map((item) => (
            <Wrapper key={item.id}>
              <WrapperImg>
                <Img src={item.image} alt={item.alt} />
                <h2><b>Modifier l'url de l'image</b></h2>
                <Input
                  type="text"
                  defaultValue={item.image}
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                  }} />
                <h2><b>Modifier brève description</b></h2>
                <Input
                  type="text"
                  defaultValue={item.alt}
                  value={alt}
                  onChange={(e) => {
                    setAlt(e.target.value);
                  }} />
              </WrapperImg>
              <ShortDetail>
                <ul>
                  <InformationsCar>
                    <b>Etat : </b> {item.state}
                    <Input
                      type="text"
                      defaultValue={item.state}
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value)
                      }} />
                  </InformationsCar>
                  <InformationsCar>
                    <b>Première immatr.:</b> {item.firstReg}
                    <Input
                      type="text"
                      defaultValue={item.firstReg}
                      value={firstReg}
                      onChange={(e) => {
                        setFirstReg(e.target.value)
                      }} />
                  </InformationsCar>
                  <InformationsCar>
                    <b>Boite de vitesse :</b> {item.gearbox}
                    <Input
                      type="text"
                      defaultValue={item.gearbox}
                      value={gearBox}
                      onChange={(e) => {
                        setGearBox(e.target.value)
                      }} />
                  </InformationsCar>
                  <InformationsCar>
                    <b>Carburant:</b> {item.fuel}
                    <Input
                      type="text"
                      defaultValue={item.fuel}
                      value={fuel}
                      onChange={(e) => {
                        setFuel(e.target.value)
                      }} />
                  </InformationsCar>
                  <InformationsCar>
                    <b>Kilométrage :</b> {item.miles}
                    <Input
                      type="text"
                      defaultValue={item.miles}
                      value={miles}
                      onChange={(e) => {
                        setMiles(e.target.value)
                      }} />
                  </InformationsCar>
                  <InformationsCar>
                    <b>Classe d\'émission: /</b>
                  </InformationsCar>
                </ul>
                <Form>
                  <ButtonPhone className="btn" onClick={() => { updateSmallDetail(item.id) }}>Modifier</ButtonPhone>
                  <ButtonContact className="btn" onClick={() => { deleteSmallDetails(item.id) }}>Supprimer</ButtonContact>
                </Form>
              </ShortDetail>
            </Wrapper>
          ))}
        </WrapperDetail> : 
        <div>
          <AddSmallDetailsForm />
          <ErrorPage error="Les détails de la voiture n'existe pas. Veuillez remplir le forumlaire ci-dessus" />
        </div>
        }
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
width: 100%;
margin-bottom: 10px;
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

const WrapperImg = styled.div`
margin-left: 25px;
`;

const Img = styled.img`
width: 100%;
@media screen and (max-width: 576px) {
  width: 80%;
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
width: 100%;
@media screen and (max-width: 768px) {
  flex-direction: column;
  align-items: start;
}
`;

const Input = styled.input`
  width: 80%;
`;

const ButtonPhone = styled.button`
background-color: #242425;
color: #F5CB5C;
width: 150px;
&:hover {
  background-color: black;
  color: gold;
}
@media screen and (max-width: 768px) {
  margin-bottom: 15px;
}
`;

const ButtonContact = styled.button`
background-color: #F5CB5C;
color: #242425;
width:150px;
&:hover {
  background-color: darkred;
  color: lightgray;
}
`;