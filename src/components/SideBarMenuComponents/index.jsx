import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

export const SideBarMenuData = [
  {
    titulo: "Animais",
    icon: <PetsIcon />,
    link: "/animais",
  },
  {
    titulo: "Enriquecimento Ambiental",
    icon: <SportsSoccerOutlinedIcon />,
    link: "/enriquecimento_ambiental",
  },
  {
    titulo: "Nutrição",
    icon: <RestaurantIcon />,
    link: "/nutricao",
  },
  {
    titulo: "Histórico Etológico",
    icon: <MenuBookIcon />,
    link: "/historico_etologico",
  },
  {
    titulo: "Histórico Clínico",
    icon: <MedicalInformationIcon />,
    link: "/enriquecimento_ambiental",
  },
  {
    titulo: "Sinais Vitais",
    icon: <HealthAndSafetyIcon />,
    link: "/sinais_vitais",
  },
];
