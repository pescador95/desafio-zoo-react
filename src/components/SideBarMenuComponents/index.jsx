import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import { ROLES } from "../../utils/constants";
import { Routes } from "react-router-dom";

export const SideBarMenuData = [
  {
    titulo: "Usuários",
    icon: <PersonIcon />,
    link: "/usuarios",
    rolesAllowed: ["admin", "dev"],
  },
  {
    titulo: "Animais",
    icon: <PetsIcon />,
    link: "/animais",
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    titulo: "Enriquecimento Ambiental",
    icon: <SportsSoccerOutlinedIcon />,
    link: "/enriquecimentoAmbiental",
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    titulo: "Nutrição",
    icon: <RestaurantIcon />,
    link: "/nutricao",
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    titulo: "Histórico Etológico",
    icon: <MenuBookIcon />,
    link: "/historicoEtologico",
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    titulo: "Histórico Clínico",
    icon: <MedicalInformationIcon />,
    link: "/historicoClinico",
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    titulo: "Sinais Vitais",
    icon: <HealthAndSafetyIcon />,
    link: "/medicacao",
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
  {
    titulo: "Arquivos",
    icon: <InventoryIcon />,
    link: "/arquivos",
    rolesAllowed: ["admin", "dev", "biologo", "veterinario", "tratador"],
  },
];
