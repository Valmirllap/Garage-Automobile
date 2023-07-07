import React from 'react'
import styled from 'styled-components'
import { SidebarData } from './SidebarData'

function SideBar() {
  return (
    <Sidebar>
      <SidebarList>
        {SidebarData.map((value, key) => {
          return (
            <RowList
              key={key}
              id={window.location.pathname === value.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = value.link
              }}
            >
              <Icon>{value.icon}</Icon>
              <Title>{value.title}</Title>
            </RowList>
          )
        })}
      </SidebarList>
    </Sidebar>
  )
}

export default SideBar

const Sidebar = styled.div`
height: 100%;
width: 250px;
background-color: ${(props) => props.theme.mainColor};
color: ${(props) => props.theme.backgroundColor};
`;

const SidebarList = styled.ul`
  height: auto;
  width: 100%;
  & #active {
    background-color: #242425;
  }
`;

const RowList = styled.li`
  font-family: barlow;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background-color: #242425;
    color: #E8EDDF;
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