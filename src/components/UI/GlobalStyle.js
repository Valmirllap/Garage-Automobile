import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body{
  transition: linear 0.25s;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.mainColor}
}

/* SOCIAL MEDIA LOGO */

& .social-logo{
  font-size: 25px;
  margin-right: 30px;
  margin-top: -15px;
  @media screen and (max-width: 998px){
    font-size: 22px;
    margin-right: 15px;
  }
  @media screen and (max-width: 998px){
    font-size: 20px;
    margin-right: 7px;
  }
}

/* DetailCar component Class and Tag*/
& .btn{
  font-family: barlow;
  font-weight: 600;
  font-size: 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  padding: 10px;
  @media screen and (max-width: 768px) {
    font-size: 18px;
    padding: 7px;
  }
}
& b {
  font-weight: 600;
}

`;

export default GlobalStyle;