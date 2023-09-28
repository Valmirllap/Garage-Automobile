import React from 'react'
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Axios from "axios"
import CardServices from '../Accueil/CardServices';
import MainTitle from '../hook/MainTitle';

export default function AccueilDashboard() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comments, setComments] = useState([]);
  const [updateReview, setUpdateReview] = useState("");
  const [logged, setLogged] = useState(false);

  // =========================== GET COMMENTS ===========================
  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setComments(response.data);
    })
  }, [])

  // =========================== CREATE COMMENTS ===========================
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const anonymousName = name.length === 0 ? "anonymous" : name;
    Axios.post('http://localhost:3002/api/insert', {
      name: anonymousName,
      message: message,
      rating: rating,
    });
    if (anonymousName && message && rating) {
      setComments([...comments, {
        name: anonymousName,
        message: message,
        rating: rating,
      }
      ]);
      setName('');
      setMessage('');
      setRating(null);
    }
  };

  // =========================== DELETE COMMENTS ===========================
  const deleteComment = (id) => {
    Axios.delete(`http://localhost:3002/api/delete/${id}`);
    window.location.reload();
  }

  // =========================== UPDATE COMMENTS ===========================
  const updateComment = (id) => {
    Axios.put('http://localhost:3002/api/update', {
      message: updateReview,
      id: id,
    });
    setUpdateReview("");
    window.location.reload();
  }

  // =========================== DISPLAY THE RATING ===========================
  const handleRatingChange = (e) => {
    const selectedRating = parseInt(e.target.value);
    setRating(selectedRating);
  };

  // =========================== Access ADMIN and EMPLOYEE ===========================
  useEffect(() => {
    Axios.get("http://localhost:3002/login", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          setLogged(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!logged) {
    return (
      <ErrorContainer>
        <Denied>Accès refusé ! Vous n'avez pas accès à cette page.</Denied>
      </ErrorContainer>
    );
  }

  return (
    <Wrapper>
      <MainTitle text="Service réparation" />
      <CardServices />
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
            placeholder="Entrez votre nom"
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
            {comments.map((comment, index) => (
              <Li key={index}>
                <p><ItalicB>{comment.name}:</ItalicB> {comment.message} - {comment.rating}/5 <FaStar /></p>
                <Changes onClick={() => { deleteComment(comment.id) }}>Supprimer</Changes>
                <input type="text" onChange={(e) => {
                  setUpdateReview(e.target.value)
                }} />
                <Changes onClick={() => { updateComment(comment.id) }}>Modifier</Changes>
              </Li>
            ))}
          </ul>
        ) : (
          <p>Soyer le premier commentaire.</p>
        )}
      </Comments>
    </Wrapper>
  )
}

const Wrapper = styled.div`
width: 100%;
`;

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

const Changes = styled.button`
margin: 5px 10px 0 10px;
`;

const ErrorContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
background-color: rgba(255, 50, 50, 0.8);
`;
const Denied = styled.h1`
color: #242425;
font-size: 32px;
`;