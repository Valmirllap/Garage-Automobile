import Header from "../Header";
import Footer from "../Footer";

import LightTheme from "./Theme/light.json";
import DarkTheme from "./Theme/dark.json";

import styled, { ThemeProvider } from "styled-components";
import { useState } from "react";
import GlobalStyle from "./GlobalStyle";

export default function Layout({children}){
  const [isLight, setIsLight] = useState(true);
  function handleToogleTheme() {
    setIsLight(!isLight)
  }
  return (
    <ThemeProvider theme={isLight ? LightTheme : DarkTheme}>
      <Wrapper>
        <GlobalStyle/>
        <Header isLight={isLight} handleToogleTheme={handleToogleTheme}/>
        <Main>
          {children}
        </Main>
        <Footer/>
      </Wrapper>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
overflow-x: hidden;
`;

const Main = styled.div`
min-height: calc(100vh - 160px);
width: 100%;
margin: auto;
display: flex;
`;