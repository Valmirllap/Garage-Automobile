import React from 'react'
import styled from 'styled-components'
import DashBoardSmallDetails from './DashBoardSmallDetails';
import DashBoardGeneralData from './DashBoardGeneralData';
import DashBoardEquipment from './DashBoardEquipment';

export default function DashBoardCarDetail() {
  return (
    <Wrapper>
      <DashBoardSmallDetails/>
      <DashBoardGeneralData/>
      <DashBoardEquipment/>
    </Wrapper>
  )
}

const Wrapper = styled.div`

`;
