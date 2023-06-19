import styled from "styled-components";
import Logo from "../../Images/logo.png";
import { Link, useLocation } from "react-router-dom";
import MaterialUISwitch from "./Switch";
import {GiHamburgerMenu} from "react-icons/gi";
import {AiOutlineClose} from "react-icons/ai";
import { useRef } from "react";
import { useState } from "react";


export default function Header({ handleToogleTheme}) {

  const location = useLocation();
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navRef = useRef(null);

  const showNavBar = () => {
    setIsNavVisible(true);
  }
  const hideNavBar = () => {
    setIsNavVisible(false);
  }

  return (
    <Wrapper>
      <DivFlex className="flex">
        <Link to="/"><Image src={Logo} /></Link>
        <MaterialUISwitch onClick={handleToogleTheme}/>
      </DivFlex>
      <nav ref={navRef} className={isNavVisible ? "responsive_nav" : ""}>
        <Link onClick={hideNavBar} to="/" >
          <MenuEl isCurrentPage={location.pathname === "/"}>Accueil</MenuEl>
        </Link>
        <Link onClick={hideNavBar} to="/achat" >
          <MenuEl isCurrentPage={location.pathname === "/achat"}>Achat</MenuEl>
        </Link>
        <Link onClick={hideNavBar} to="/contactez-nous">
          <MenuEl isCurrentPage={location.pathname === "/contactez-nous"}>Contactez-nous</MenuEl>
        </Link>
        <Link onClick={hideNavBar} to="/connexion">
          <Connexion>Connexion</Connexion>
        </Link>
        <button className="nav-btn nav-close-btn" onClick={hideNavBar}><AiOutlineClose className="icons"/></button>
      </nav>
      <button className="nav-btn" onClick={showNavBar}><GiHamburgerMenu className="icons"/></button>
    </Wrapper>
  )
}

const Wrapper = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 24px;
background-color: #242425;
& a{
  text-decoration: none;
  color: #CFDBD5;
  margin-right: 16px;
}
& nav {
  display: flex;
  flex-direction: row;
}
& .nav-btn {
  padding: 5px;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  color: #F1F6F9;
  display: none;
}
& .icons{
  font-size: 30px;
  color: #CFDBD5;
}
@media (max-width: 768px) {
  & .nav-btn {
    display: flex;
  }
  & nav{
    position: fixed;
    top: 0;
    left: 0;
    margin-left: 60%;
    height: 100%;
    width: 45%;
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    background-color: #242425;
    transform: translateY(-100vh); 
  }
  & .responsive_nav {
    transform: none;
  }
  & nav .nav-close-btn{
  position: absolute;
  top: 2rem;
  right: 2rem;
  }
}
`;

const DivFlex = styled.div`
display: flex;
align-items: center;
`;
const MenuEl = styled.p`
font-size: 18px;
font-family: Barlow;
margin-right: 20px;
padding-bottom: 2px;
border-bottom: solid 2px ${(props) => props.isCurrentPage ? "" : "transparent"};
&:hover{
  border-bottom: solid 2px;
}
`;
const Connexion = styled.button`
font-family: Barlow;
font-weight: 600;
font-size: 18px;
background-color: #F5CB5C;
padding: 7px;
margin-top: -10px;
color: #333533;
border: none;
border-radius: 7px;
cursor: pointer;
`;
const Image = styled.img`
  padding: 10px;
  height: 80px;
  width: 150px;
`;