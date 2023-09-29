import React from 'react'
import styled from 'styled-components'
import { SidebarData } from './SidebarData'
import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <Sidebar>
      <SidebarList>
        {SidebarData.map((value, key) => {
          return (
            <Link to={value.link}>
              <RowList
                key={key}
                id={window.location.pathname === value.link ? "active" : ""}
              >
                <Icon>{value.icon}</Icon>
                <Title>{value.title}</Title>
              </RowList>
            </Link>
          )
        })}
      </SidebarList>
    </Sidebar>
  )
}

export default SideBar

// ==============================================================================
// ==============================================================================
// ============================== STYLED-COMPONENT ==============================
// ==============================================================================
// ==============================================================================

const Sidebar = styled.div`
height: auto;
width: 250px;
background-color: ${(props) => props.theme.mainColor};
color: ${(props) => props.theme.backgroundColor};
`;

const SidebarList = styled.ul`
  height: auto;
  width: 100%;
  & #active {
    background-color: ${(props) => props.theme.backgroundColor === '#E8EDDF' ? '#242423' : 'white'};
  }
  & a {
    text-decoration: none;
  }
`;

const RowList = styled.li`
  font-family: barlow;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.backgroundColor};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.backgroundColor === '#E8EDDF' ? '#242423' : 'white'};
    color: ${(props) => props.theme.backgroundColor === '#E8EDDF' ? '#E8EDDF' : '#242423'};;
  }
`;

const Icon = styled.div`
  flex: 30%;
  display: grid;
  place-items: center;
`;

const Title = styled.div`
  flex: 70%;
`;