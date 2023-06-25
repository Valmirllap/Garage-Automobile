import styled from "styled-components";
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

export default function CommentSection() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (message && rating) {
      const newComment = {
        message: message,
        rating: rating
      };
      setComments([newComment, ...comments.slice(0, 2)]);
      setMessage('');
      setRating(null);
    };
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  return (
    <Comments>
      <Form onSubmit={handleCommentSubmit}>
        <TitleComments>Donnez votre avis sur nos service:</TitleComments>
        <Message
          rows="10"
          value={message}
          onChange={handleChange}
          placeholder="Entrer votre commentaire"></Message>
        <div>
          {[...Array(5)].map((start, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
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
        <Send type="submit">Envoyer</Send>
      </Form>

      <TitleComments>Avis récent:</TitleComments>
      {comments.length > 0 ? (
        <ul>
          {comments.slice(0, 3).map((comment, index) => (
            <li key={index}>
              <p>{comment.message}. {comment.rating}/5 <FaStar /></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Soyer le premier commentaire.</p>
      )
      }
    </Comments>
  );
};


const Comments = styled.div`
display: flex;
flex-direction: column;
margin: 20px 0 60px 0;
padding: 10px;
background-color: #F5CB5C;
color: #333533;
width: 100%;
height: 500px;
& input[type=radio]{
  display: none;
}
& .star{
  cursor: pointer;
}
`;
const Form = styled.form`
display: flex;
flex-direction: column;
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