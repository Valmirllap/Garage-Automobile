import { useState, useEffect } from 'react'
import styled from 'styled-components'
import DashBoardSmallDetails from './DashBoardSmallDetails';
import DashBoardGeneralData from './DashBoardGeneralData';
import DashBoardEquipment from './DashBoardEquipment';
import Axios from 'axios'
import AccesDenied from '../hook/AccesDenied';

export default function DashBoardCarDetail() {

  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  // =========================== ACCES TO THE PAGE /DASHBOARD/ACHAT ===========================
  useEffect(() => {
    Axios.get("http://localhost:3002/login", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === true) {
          setLogged(true);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  if (loading) {
    return null;
  }

  if (!logged) {
    return (
      <AccesDenied />
    );
  }
  return (
    <Wrapper>
      <DashBoardSmallDetails />
      <DashBoardGeneralData />
      <DashBoardEquipment />
    </Wrapper>
  )
}

const Wrapper = styled.div`

`;
