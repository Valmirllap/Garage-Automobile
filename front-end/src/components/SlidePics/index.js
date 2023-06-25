import styled from "styled-components";

import Mercedes1 from "../../Images/mercedes1.jpg";
import Mercedes2 from "../../Images/mercedes2.jpg";
import Mercedes3 from "../../Images/mercedes3.jpg";
import Fiat1 from "../../Images/fiat1.jpg";
import Fiat2 from "../../Images/fiat2.jpg";
import Fiat3 from "../../Images/fiat3.jpg";
import Toyota1 from "../../Images/toyota1.jpg";
import Toyota2 from "../../Images/toyota2.jpg";
import Toyota3 from "../../Images/toyota3.jpg";
import Audi1 from "../../Images/audi1.jpg";
import Audi2 from "../../Images/audi2.jpg";
import Audi3 from "../../Images/audi3.jpg";

import { useParams } from "react-router-dom";
import { useState } from "react";

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";



export default function SlidePics() {
  const { id } = useParams();

  const pics = [
    { id: "mercedes", img: [{image: Mercedes1 }, {image: Mercedes2 }, {image: Mercedes3 }] },
    { id: "fiat", img: [{ image: Fiat1 }, { image: Fiat2 }, { image: Fiat3 }] },
    { id: "toyota", img: [{ image: Toyota1 }, { image: Toyota2 }, { image: Toyota3 }] },
    { id: "audi", img: [{ image: Audi1 }, { image: Audi2 }, { image: Audi3 }] },
  ];

  
  const picture = pics.find((pic) => pic.id === id);

  const [current, setCurrent] = useState(0);
  const lenght = picture ? picture.img.length : 0;

  const nextSlide = () => {
    setCurrent(current === lenght - 1 ? 0 : current + 1);
  }
  const prevSlide = () => {
    setCurrent(current === 0 ? lenght - 1 : current - 1);
  }

  return (
    <Wrapper>
    {picture ? 
        <section className="slider">
          <FaArrowAltCircleLeft className="arrows left-arrow" onClick={prevSlide} />
          <FaArrowAltCircleRight className="arrows right-arrow" onClick={nextSlide} />
          {picture.img.map((pic, index) => {
            return (
              <div className={index === current ? 'slide active' : 'slide'} key={index}>
                {index === current && (
                <img className="image" src={pic.image} alt={pic.id}/>
                )}
              </div>
            )
          })}
        </section>
        : <Error>Erreur: Cette page n'existe pas</Error>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;

& .slider {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px){
    position: static;
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
    top: 65%;
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

const Error = styled.p`
  font-family: libre baskerville;
  font-size: 32px;
  font-weight: 600;
  color: #ec1329;
`;