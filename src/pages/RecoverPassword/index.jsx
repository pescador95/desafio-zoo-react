import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../../services/endpoints";
import { recoverPassword } from "../../services/http/profile";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const axios = useAxios();
  const navigate = useNavigate();

  const { mutate: forgotPassword } = useMutation(
    ["recoverPassword"],
    (email) => recoverPassword(email),
    {
      onSuccess: (data) => {
        toast.success(data?.messages?.join(", "));
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    await forgotPassword(email);
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
      <Box sx={style.content} component="form" onSubmit={onSubmit}>
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

          <TextField
            type={"email"}
            sx={style.input}
            onChange={(e) => setEmail(e?.target?.value)}
            value={email}
          />
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
