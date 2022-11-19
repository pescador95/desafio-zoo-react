import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Box, Button, Typography } from "@mui/material";
import { ExitIcon } from "../../assets";
import { useSession } from "../../hooks/useSession";
import { ROUTES } from "../../routes/routes";

export const Header = ({ title }) => {
  const styles = {
    container: {
      padding: '0.5rem',
      width: " 100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff",
      borderRadius: "1rem",
      background: "#244726",
      flexDirection: {
        xs: "column",
        sm: "row",
        md: "row",
        lg: "row",
        xl: "row",
      },
    },
    title: {
      fontSize: {
        xs: "1.5rem",
        sm: "2rem",
        md: "2rem",
        lg: "3rem",
        xl: "3rem",
      },
      margin: 0,
      padding: "1rem",
    },
    actions: {
      display: "flex",
      flexDirection: "row",
      gap: '0.5rem',
      width: '100%',
      justifyContent:"end"
    },
    button: {
      width: {
        xs: "100%",
        sm: "7rem",
        md: "7rem",
        lg: "7rem",
        xl: "7rem",
      },
      background: "green",
      border: "none",
      cursor: "pointer",
      height: "70px",
      color: "#fff",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      flexDirection: "column",
      transition: "0.2s",
      "&:hover": {
        background: "green",
       filter: "brightness(0.8)",
     },
    },
  };

  const { signOut } = useSession();

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>{title}</Typography>
      <Box sx={styles.actions}>
        <Button
          sx={styles.button}
          onClick={() => {
            window.location.pathname = ROUTES.profile;
          }}
        >
          <PermIdentityIcon />
          Meu Perfil
        </Button>
        <Button sx={styles.button} onClick={signOut}>
          <ExitIcon />
          Sair
        </Button>
      </Box>
    </Box>
  );
};
