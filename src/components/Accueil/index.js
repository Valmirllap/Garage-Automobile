import styled from "styled-components";
import Revision from "../../Images/revision.jpg";
import Kit from "../../Images/kit-de-distribution.jpg";
import Brakes from "../../Images/brakes.jpg";
import Clutch from "../../Images/clutch.jpg";
import Ac from "../../Images/AC.jpg";
import "./Accueil.css";
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';


export default function Accueil (){
  const services = [
   {image:{Revision}, title: "Révision Auto", price: "à partir de 50€", background:"bg-image-revision"},
   {image:{Kit}, title: "Kit de distribution", price: "à partir de 350€", background:"bg-image-kit"},
   {image:{Brakes}, title: "Disques et plaquettes de frein", price: "à partir de 59€", background:"bg-image-brakes"},
   {image:{Clutch}, title: "Embrayage", price: "à partir de 279€", background:"bg-image-clutch"},
   {image:{Ac}, title: "Climatisation", price: "à partir de 55€", background:"bg-image-Ac"},
  ];

const [rating, setRating] = useState(null);
const [hover, setHover] = useState(null);
return (
  <Wrapper>
    <Display>
    {services.map((value, key) => {
      return (
      <ContainerService className={value.background}>
      <ServiceText key={key}>
        <h1>{value.title}</h1>
        <p>{value.price}</p>
      </ServiceText>
    </ContainerService>
      )
    })}
    </Display>
    <Comments>
      <TitleComments>Donnez votre avis sur nos service</TitleComments>
      <Message rows="10"></Message>
      <div>
      {[...Array(5)].map((start, index )=> {
        const currentRating = index + 1;
       return(
        
        <label>
          <input
          type="radio"
          name="rating"
          value={currentRating}
          onClick={() => setRating(currentRating)}
          />
          <FaStar
          className="star" 
          size={25}
          color={currentRating <= (hover || rating) ? "#242425" : "e4e5e9"}
          onMouseEnter={() => setHover(currentRating)}
          onMouseLeave={() => setHover(null)}
          />
        </label>
         ) 
        
      })}
      </div>
      <Send>Envoyer</Send>
      <TitleComments>Avis récent:</TitleComments>
      <p>Note {rating}/5</p>
    </Comments>

  </Wrapper>
)
}

const Wrapper = styled.div`
width: 100%;
`;

const Display = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
`;

const ContainerService = styled.div`
margin: 50px 0;
background-color: white;
width: 40%;
height: 300px;
border-radius: 0 0 10px 10px;
box-shadow: 7px 13px 20px black;

`;

const ServiceText = styled.div`

background-color: #242425;
margin-top: 200px;
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

const Comments = styled.div`
display: flex;
flex-direction: column;
margin: 20px 0 60px 0;
background-color: #F5CB5C;
width: 100%;
height: 500px;
& input[type=radio]{
  display: none;
}
& .star{
  cursor: pointer;
}

`;

const TitleComments = styled.label`
margin-top: 15px;
font-size: 20px;
font-family: libre baskerville;
font-weight: 600;
color: #242425;
text-decoration: underline;
margin-bottom: 10px;
`;

const Message = styled.textarea`
width: 50%;
`;

const Send = styled.button`
font-size: 18px;
font-weight: 600;
margin-top: 25px;
width: 200px;
padding: 10px;
background-color: #242425;
color: #F5CB5C;
border: none;
cursor: pointer;
`;

