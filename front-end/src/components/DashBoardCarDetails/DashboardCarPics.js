import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

export default function DashboardCarPics() {
  const { id } = useParams();

  const [carPictures, setCarsPictures] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================== READ PICS ===========================
  useEffect(() => {
    Axios.get(`http://localhost:3002/carpics/get/${id}`)
      .then((response) => {
        setCarsPictures(response.data.pictures);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id])

  // =========================== DELETE PICs ===========================
  const deleteCarPics = (id) => {
    Axios.delete(`http://localhost:3002/carpics/delete/${id}`);
    window.location.reload();
  }

  const [current, setCurrent] = useState(0);
  const lenght = carPictures ? carPictures.length : 0;

  const nextSlide = () => {
    setCurrent(current === lenght - 1 ? 0 : current + 1);
  }
  const prevSlide = () => {
    setCurrent(current === 0 ? lenght - 1 : current - 1);
  }

  return (
    <Wrapper>
      {loading ? (
        <p>loading...</p>
      ) : lenght > 0 ? (
        <div>
          <section className="slider">
            <FaArrowAltCircleLeft className="arrows left-arrow" onClick={prevSlide} />
            <FaArrowAltCircleRight className="arrows right-arrow" onClick={nextSlide} />
            {carPictures.map((pic, index) => {
              return (
                <div className={index === current ? 'slide active' : 'slide'} key={index}>
                  {index === current && (
                    <img className="image" src={pic.url_img} alt={pic.id} />
                  )}
                </div>
              )
            })}
          </section>
          <ButtonChanges onClick={() => { deleteCarPics(carPictures[0].car_pics_name) }}>Supprimer toute la galerie</ButtonChanges>
        </div>
      ) : (<Error>Pas de galerie disponible: veuillez compléter le formulaire <Link to='/dashboard/achat'>ici</Link></Error>)}
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
justify-content: center;
align-items: center;
width: 100%;

& .slider {
  position: relative;
  width: 60%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px){
    height: 100vh;
    width:100%;
  }
  @media screen and (max-width: 576px){
    height: 110vh;
  }
}
& .arrows {
  top: 50%;
  position: absolute;
  font-size: 3rem;
  color: #CFDBD5;
  z-index: 10;
  cursor: pointer;
  user-select: none;
  @media screen and (max-width: 768px){
    top: 50%;
    left: 50%;
  }
  @media screen and (max-width: 576px){
    top: 50%;
    left: 50%;
  }
}
& .image {
  width: 100%;
  border-radius: 10px;
  @media screen and (max-width: 768px){
    width: 60%;
  }
}
& .right-arrow {
  right: 32px; 
}
& .left-arrow{
  left: 25px;
}
& .slide {
  opacity: 0;
  transition-duration: 1s ease;
}
& .slide.active{
  opacity: 1;
  transition-duration: 1s;
  transform: scale(1.08);
}
`;

const ButtonChanges = styled.button`
  padding: 10px;
  cursor: pointer;
  margin-bottom: 15px;
`;

const Error = styled.p`
  font-family: libre baskerville;
  font-size: 32px;
  font-weight: 600;
  padding: 10px;
  color: #ec1329;
`;
