import { Box } from "@mui/material";
import { React, useState } from "react";
import zooLogo from "../../assets/ZooLogo.png";
import { SideBarMenuData } from "../SideBarMenuComponents";

export const SideBarMenu = () => {

  const styles = {
    container: {
      height: "auto",
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "#244726",
      display: "flex",
      flexDirection: "column",
      paddingTop: "10px",
      margin: "0px",
    },
    list: {
      display:'flex',
      flexDirection: 'column',
      gap: '2rem',
      padding: '0 1rem',
    },
    link: {
      color: 'white',
      display: 'flex',
      alignItems:'center',
      gap: '0.5rem',
      cursor: "pointer",
      "&:hover": {
        filter: "brightness(0.8)",
      },
    },
    img: {
      width: '15rem',
      padding: '0 1rem',
      marginTop: {
        xs: "3rem",
        sm: "3rem",
        md: "0",
        lg: "0",
        xl: "0",
      }
    }
  };

  return (
    <Box sx={styles?.container}>
      <Box sx={styles.img} component="img" src={zooLogo} alt="Logo zoológico" />
      <Box  sx={styles.list}>
        {SideBarMenuData.map((val, key) => {
          return (
            <Box
            sx={styles.link}
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="div-icon-row">{val.icon}</div>
              <div id="div-icon-title">{val.titulo}</div>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
