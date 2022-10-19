/* eslint-disable jsx-a11y/alt-text */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";

import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAxios } from "../../hooks/useAxios";
import { useSession } from "../../hooks/useSession";
import { ENDPOINTS } from "../../services/endpoints";

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

export const Login = () => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const { signIn } = useSession();
  const axios = useAxios();
  const navigate = useNavigate();

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

  const login = async (data) => {
    const response = await axios.post(ENDPOINTS.auth.login, data);
    signIn(response.data);
    navigate("/animais");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await login(values);
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={onSubmit}>
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
                  onChange={handleChange("email")}
                  value={values.email}
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
                type="submit"
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </Container>
      </form>
    </ThemeProvider>
  );
};
