import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body{
  transition: linear 0.25s;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.mainColor}
  
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