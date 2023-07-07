import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const SidebarData = [
  {
    title: "Accueil",
    icon: <HomeIcon/>,
    link: "/dashboard/accueil",
  },
  {
    title: "Achat",
    icon: <DirectionsCarIcon/>,
    link: "/dashboard/achat",
  },
  {
    title: "Footer",
    icon: <CalendarMonthIcon/>,
    link: "/dashboard/footer",
  },
];