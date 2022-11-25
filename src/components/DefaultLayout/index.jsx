import { Box } from "@mui/material";
import { SideBarMenu } from "../SideBarMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export const DefaultLayout = ({ children }) => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const styles = {
    container: {
      width: "100%",
      display: "flex",
    },
    sidebar: {
      position: "fixed",
      width: "15.625rem",
      display: {
        xs: "none",
        sm: "none",
        md: "flex",
        lg: "flex",
        xl: "flex",
      },
    },
    openSidebar: {
      display: "flex",
      position: {
        xs: "absolute",
        sm: "absolute",
        md: "inherit",
        lg: "inherit",
        xl: "inherit",
      },
      zIndex: 999,
      width: {
        xs: "100%",
        sm: "100%",
        md: "15.625rem",
        lg: "15.625rem",
        xl: "15.625rem",
      },
    },
    menuIcon: {
      cursor: "pointer",
      position: "absolute",
      padding: "0.5rem",
      display: {
        xs: "flex",
        sm: "flex",
        md: "none",
        lg: "none",
        xl: "none",
      },
      zIndex: 1000,
    },
    icon: {
      fontSize: "2rem",
    },
    whiteIcon: {
      color: "white",
    },
    blackIcon: {
      color: "#000",
    },
    children: {
      marginTop: {
        xs: "2rem",
        sm: "2rem",
        md: "0rem",
        lg: "0rem",
        xl: "0rem",
      },
      width: {
        xs: "100%",
        sm: "100%",
        md: "calc(100% - 15.625rem)",
        lg: "calc(100% - 15.625rem)",
        xl: "calc(100% - 15.625rem)",
      },
      marginLeft: {
        xs: "0",
        sm: "0",
        md: "15.625rem",
        lg: "15.625rem",
        xl: "15.625rem",
      },
    },
    noChildren: {
      display: {
        xs: "none",
        sm: "none",
        md: "initial",
        lg: "initial",
        xl: "initial",
      },
    },
  };
  return (
    <Box sx={styles.container}>
      <Box sx={styles.menuIcon} onClick={() => setOpenSideBar((prev) => !prev)}>
        <MenuIcon
          sx={
            openSideBar
              ? { ...styles.icon, ...styles.whiteIcon }
              : { ...styles.icon, ...styles.blackIcon }
          }
        />
      </Box>
      <Box
        sx={
          openSideBar
            ? { ...styles.sidebar, ...styles?.openSidebar }
            : styles.sidebar
        }
      >
        <SideBarMenu />
      </Box>
      <Box
        sx={
          openSideBar
            ? { ...styles.children, ...styles?.noChildren }
            : styles.children
        }
      >
        {children}
      </Box>
    </Box>
  );
};
