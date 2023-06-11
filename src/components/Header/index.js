import styled from "styled-components";
import Logo from "../../Images/logo.png";
import {Link, useLocation} from "react-router-dom";



export default function Header({handleToogleTheme, isLight, label}) {
  
  const location = useLocation();

  return (
    <Wrapper>
      <DivFlex className="flex">
      <Link to="/"><Image src={Logo}/></Link>
      <button onClick={handleToogleTheme}>Mode {isLight ? "Dark" : "Light"}</button>
      </DivFlex>
      <nav>
        <Link to="/">
          <MenuEl isCurrentPage={location.pathname === "/"}>Accueil</MenuEl>
        </Link>
        <Link to="/achat">
          <MenuEl isCurrentPage={location.pathname === "/achat"}>Achat</MenuEl>
        </Link>
        <Link to="/contactez-nous">
          <MenuEl isCurrentPage={location.pathname === "/contactez-nous"}>Contactez-nous</MenuEl>
        </Link>
        <Link to="/connexion">
          <Connexion>Connexion</Connexion>
        </Link>
      </nav>
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
border-bottom: solid 2px ${(props) => props.isCurrentPage ? "" : "trasparent"};
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