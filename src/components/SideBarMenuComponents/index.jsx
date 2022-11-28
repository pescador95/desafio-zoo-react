import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";

export const SideBarMenuData = [
  {
    titulo: "Usuários",
    icon: <PersonIcon />,
    link: "/usuarios",
  },
  {
    titulo: "Animais",
    icon: <PetsIcon />,
    link: "/animais",
  },
  {
    titulo: "Enriquecimento Ambiental",
    icon: <SportsSoccerOutlinedIcon />,
    link: "/enriquecimentoAmbiental",
  },
  {
    titulo: "Nutrição",
    icon: <RestaurantIcon />,
    link: "/nutricao",
  },
  {
    titulo: "Histórico Etológico",
    icon: <MenuBookIcon />,
    link: "/historicoEtologico",
  },
  {
    titulo: "Histórico Clínico",
    icon: <MedicalInformationIcon />,
    link: "/historicoClinico",
  },
  {
    titulo: "Sinais Vitais",
    icon: <HealthAndSafetyIcon />,
    link: "/medicacao",
  },
  {
    titulo: "Arquivos",
    icon: <InventoryIcon />,
    link: "/arquivos",
  },
];
