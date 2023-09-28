import styled from "styled-components";
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Axios from "axios"


export default function CommentSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setComments(response.data.slice(-4));
    })
  }, [])

  const handleCommentSubmit = (e) => {
    const anonymousName = name.length === 0 ? "anonymous" : name;
    e.preventDefault()
    Axios.post('http://localhost:3002/api/insert', {
      name: anonymousName,
      message: message,
      rating: rating,
    });
    if (anonymousName && message && rating) {
      const newComment = {
        name: anonymousName,
        message: message,
        rating: rating
      };
      setNewComments([newComment]); // pour afficher tous les messages on peut rajouter [newComment, ...newComments.slice(0,2)] pour les 3 premiers commentaires inscrit
      setComments([...comments, {
        name: name,
        message: message,
        rating: rating,
      }
      ]);
      setName('');
      setMessage('');
      setRating(null);
    }
  };

  const handleRatingChange = (e) => {
    const selectedRating = parseInt(e.target.value);
    setRating(selectedRating);
  };

  return (
    <Comments>
      <Form onSubmit={handleCommentSubmit}>
        <TitleComments>Donnez votre avis sur nos service:</TitleComments>
        <Name
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Entrez votre nom ou vide pour être anonyme"
          
        />
        <Message
          rows="10"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Entrer votre avis"
          required
        />
        <div>
          {[...Array(5)].map((start, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={handleRatingChange}
                  checked={rating === currentRating}
                  readOnly
                  required
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
          {comments.slice(0, 4).map((comment, index) => (
            <Li key={index}>
              <p><ItalicB>{comment.name}:</ItalicB> {comment.message} - {comment.rating}/5 <FaStar /></p>
            </Li>
          ))}
          {newComments.map((value, index) => {
            return (
              <Li key={index}>
                <p>
                  <ItalicB>{value.name}: </ItalicB> {value.message} - {value.rating}/5 <FaStar />
                </p>
              </Li>
            )
          })}
        </ul>
      ) : (
        <p>Soyer le premier commentaire.</p>
      )}
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
height: auto;
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
const Li = styled.li`
margin-bottom: 5px;
border: solid 2px #242425 ;
padding: 10px;
margin-right: 20px;
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

const Name = styled.input`
width: 500px;
margin-bottom: 10px;
@media screen and (max-width: 576px){
  width: 350px;
}
`;
const ItalicB = styled.i`
font-family: barlow;
font-weight: 600;
font-size: 18px;
font-style: italic;
`;

const Send = styled.button`
font-size: 18px;
font-weight: 600;
margin-top: 10px;
width: 200px;
padding: 10px;
background-color: #242425;
color: #F5CB5C;
border: none;
cursor: pointer;
`;