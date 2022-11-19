import { Box } from "@mui/material";
import { SideBarMenu } from "../SideBarMenu";

export const DefaultLayout = ({ children }) => {
  const styles = {
    container: {
      width: "100%",
      display: "flex",
    },
    sidebar: {
      width: "15.625rem",
      display: {
        xs: "none",
        sm: "none",
        md: "flex",
        lg: "flex",
        xl: "flex",
      },
    },
    children: {
      width: {
        xs: "100%",
        sm: "100%",
        md: "calc(100% - 15.625rem)",
        lg: "calc(100% - 15.625rem)",
        xl: "calc(100% - 15.625rem)",
      },
    },
  };
  return (
    <Box sx={styles.container}>
      <Box sx={styles.sidebar}>
        <SideBarMenu />
      </Box>
      <Box sx={styles.children}>{children}</Box>
    </Box>
  );
};
