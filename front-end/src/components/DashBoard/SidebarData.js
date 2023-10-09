import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const SidebarData = [
  {
    id: 1,
    title: "Accueil",
    icon: <HomeIcon/>,
    link: "/dashboard/accueil",
  },
  {
    id: 2,
    title: "Achat",
    icon: <DirectionsCarIcon/>,
    link: "/dashboard/achat",
  },
  {
    id: 3,
    title: "Footer",
    icon: <CalendarMonthIcon/>,
    link: "/dashboard/footer",
  },
];