import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { useToast } from "../../hooks/useToast";
import { ENDPOINTS } from "../../services/endpoints";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const axios = useAxios();
  const navigate = useNavigate();
  
  const { openToast } = useToast();

  const handleSubmit = async (email) => {
    const response = await axios.get(ENDPOINTS.recoverPassword + email);

    if (response?.status !== 500) {
      openToast(response.message, "success");
    } else {
      openToast(response, "error");
    }
    navigate("/login");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit(email);
  };

  const style = {
    container: {
      width: "100vw",
      height: "100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffff",
    },
    content: {
      padding: "1rem",
      width: "25rem",
      background: "#1b5e20",
      borderRadius: "4px",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    description: {
      fontSize: "1rem",
      fontWeight: "400",
    },
    actions: {
      marginTop: "1rem",
      display: "flex",
      gap: "0.5rem",
      width: "100%",
      justifyContent: "space-between",
    },
    inputContainer: {
      marginTop: "1rem",
      display: "flex",
      flexDirection: "column",
    },
    input: {
      background: "#fff",
      border: "none",
      borderRadius: "0.5rem",
    },
    button: {
      color: "#000",
      maxWidth: "100%",
      height: "2.5rem",
      background: "#FB8C00",
      transition: "0.2s",
      "&:hover": {
        background: "#FB8C00",
        filter: "brightness(0.8)",
      },
      display: "flex",
      gap: "0.5rem",
    },
  };

  return (

    <Box sx={style.container}>
      <Box
        sx={style.content}
        component="form"
        onSubmit={onSubmit}
      >
        <Box component="header" sx={style.header}>
          <Typography sx={style.title}> Esqueceu sua senha?</Typography>
          <Typography sx={style.description}>
            {" "}
            Entre com seu email cadastrado no sistema para receber uma nova.
          </Typography>
        </Box>

        <Box sx={style.inputContainer}>
          <Box component="label" htmlFor="email">
            E-mail
          </Box>

          <TextField sx={style.input} onChange={e=>setEmail(e?.target?.value)} value={email} />
        </Box>

        <Box component="footer" sx={style.actions}>
          <Button sx={style.button} onClick={() => navigate("/login")}>
            {" "}
            Voltar
          </Button>
          <Button sx={style.button} type="submit">
            {" "}
            Enviar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
