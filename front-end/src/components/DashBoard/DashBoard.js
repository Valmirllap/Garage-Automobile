import React from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'

export default function DashBoard() {
  return (
    <Wrapper>
      <SideBar/>
      hello
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  display: flex;
`;