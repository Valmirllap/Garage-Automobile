import { useState, useEffect } from 'react'
import styled from 'styled-components'
import DashBoardSmallDetails from './DashBoardSmallDetails';
import DashBoardGeneralData from './DashBoardGeneralData';
import DashBoardEquipment from './DashBoardEquipment';
import Axios from 'axios'
import AccesDenied from '../hook/AccesDenied';
import DashboardCarPics from './DashboardCarPics';

export default function DashBoardCarDetail() {

  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  // =========================== ACCES TO THE PAGE /DASHBOARD/ACHAT ===========================
  useEffect(() => {
    Axios.get("https://garage-automobile-627012dfc93e.herokuapp.com/login", { withCredentials: true })
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
      <DashboardCarPics/>
    </Wrapper>
  )
}

const Wrapper = styled.div`

`;
