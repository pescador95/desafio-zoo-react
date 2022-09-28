/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import logo from "../assets/logo.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b5e20",
      contrastText: "#1b5e20",
    },
    secondary: {
      main: "#ff9100",
    },
    login: {
      main: "#ffffff",
    },
  },
});

function Login() {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <Box textAlign={"center"}>
          <img src={logo} width="50%" />
        </Box>
        <Box
          primary
          sx={{
            bgcolor: "primary.main",
            borderRadius: 4,
            px: "1.5rem",
            py: "2.5rem",
          }}
          theme={theme}
        >
          <div>
            <Typography
              color={"#ffffff"}
              textAlign={"center"}
              variant="h4"
              marginBottom={"2.5rem"}
              gutterBottom
            >
              BEM VINDO
            </Typography>
          </div>
          <Box sx={{ my: "0.75rem" }}>
            <FormControl
              color="login"
              variant="standard"
              sx={{ width: "100%" }}
            >
              <InputLabel sx={{ color: "#fff" }}>E-mail</InputLabel>
              <Input
                sx={{
                  color: "#fff",
                  ":before": { borderBottomColor: "#fff" },
                  ":after": { borderBottomColor: "#fff" },
                }}
                id="email"
                label="E-mail"
                type="email"
                variant="standard"
              />
            </FormControl>
          </Box>
          <Box sx={{ my: "0.75rem" }}>
            <FormControl
              color="login"
              sx={{ width: "100%" }}
              variant="standard"
            >
              <InputLabel sx={{ color: "#fff" }}>Senha</InputLabel>
              <Input
                sx={{
                  color: "#fff",
                  ":before": { borderBottomColor: "#fff" },
                  ":after": { borderBottomColor: "#fff" },
                }}
                id="senha"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <IconButton
                    color="login"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </FormControl>
          </Box>
          <Box>
            <Button color="secondary" style={{ textTransform: "none" }}>
              Esqueci minha senha
            </Button>
          </Box>
          <Box textAlign={"center"}>
            <Button
              color="secondary"
              sx={{
                marginTop: "2.5rem",
                px: "2rem",
                borderRadius: "0.25rem",
              }}
              size="large"
              variant="contained"
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Login;
