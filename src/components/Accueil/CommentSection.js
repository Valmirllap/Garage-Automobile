import styled from "styled-components";
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

export default function CommentSection() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <Comments>
      <TitleComments>Donnez votre avis sur nos service:</TitleComments>
      <Message rows="10"></Message>
      <div>
        {[...Array(5)].map((start, index) => {
          const currentRating = index + 1;
          return (
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
  );
};


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
width: 500px;
@media screen and (max-width: 576px){
  width: 350px;
}
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