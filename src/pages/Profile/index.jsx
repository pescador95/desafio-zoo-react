import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { updateUserProfile } from "../../services/http/profile";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getMyProfile } from "../../services/http/users";

export const Profile = () => {
  const style = {
    container: {
      padding: "1rem",
    },
    formContainer: {
      background: "#43A047",
      borderRadius: "1rem",
      margin: "1rem 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      padding: "1rem",
      flexDirection: {
        xs: "column",
        sm: "column",
        md: "column",
        lg: "column",
        xl: "row",
      },
      gap: "1rem",
    },
    inputs: {
      width: {
        xs: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "80%",
      },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      flexDirection: {
        xs: "column",
        sm: "column",
        md: "column",
        lg: "column",
        xl: "row",
      },
    },
    actions: {
      width: {
        xs: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "20%",
      },
      gap: "1rem",
      display: "flex",
      flexDirection: {
        xs: "row",
        sm: "row",
        md: "row",
        lg: "row",
        xl: "column",
      },
      marginTop: "1.5rem",
      justifyContent: "space-between",
    },
    inputsContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    inputSeparator: {
      width: "100%",
      display: "flex",
      gap: "1rem",
      flexDirection: {
        xs: "column",
        sm: "row",
        md: "row",
        lg: "row",
        xl: "row",
      },
    },
    label: {
      color: "white",
    },
    input: {
      background: "#AEFFB2",
      border: "none",
      borderRadius: "0.5rem",
    },
    inputContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    filterButton: {
      width: "100%",
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
    table: {
      width: "100%",
    },
    icon: {
      display: {
        xs: "none",
        sm: "block",
        md: "block",
        lg: "block",
        xl: "block",
      },
    },
    actionsTable: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "1rem 0",
      gap: "0.5rem",
    },
    addRegister: {
      color: "#fff",
      width: "100%",
      maxWidth: "12rem",
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
    excludeRegister: {
      color: "#fff",
      width: "100%",
      maxWidth: "12rem",
      height: "2.5rem",
      background: "#f54242",
      transition: "0.2s",
      "&:hover": {
        background: "#ff7878",
        filter: "brightness(0.8)",
      },
      "&:disabled": {
        background: "#ffb1b1",
        color: "#fff",
        filter: "brightness(1)",
        cursor: "not-allowed",
      },
      display: "flex",
      gap: "0.5rem",
    },
  };

  const { mutate: getProfileMutate, data: users } = useMutation(
    () => getMyProfile(),
    {
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  useEffect(() => {
    getProfileMutate();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: users });

  useEffect(() => {
    setValue("id", users?.id);
    setValue("nome", users?.nome);
    setValue("email", users?.email);
  }, [setValue, users?.email, users?.nome, users?.id]);

  const { mutate: updateProfileMutate } = useMutation(
    ["updateUserProfile"],
    (usuario) => updateUserProfile(usuario),
    {
      onSuccess: (data) => {
        toast.success(data?.messages?.join(", "));
      },
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const onSubmit = async (receivedValues) => {
    const values = {
      ...receivedValues,
    };
    return updateProfileMutate(values);
  };

  return (
    <Box sx={style.container}>
      <Header title="Meu perfil" />
      <Box
        component="form"
        sx={style.formContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={style.inputs}>
          <Box sx={style.inputsContainer}>
            <Box sx={style.inputSeparator}>
              <Box sx={style.inputContainer}>
                <Typography component="label" sx={style.label} htmlFor="nome">
                  Nome
                </Typography>
                <TextField
                  size="small"
                  sx={style.input}
                  {...register("nome")}
                  id="nome"
                  type="text"
                />
              </Box>

              <Box sx={style.inputContainer}>
                <Typography sx={style.label} component="label" htmlFor="email">
                  Email
                </Typography>
                <TextField
                  size="small"
                  sx={style.input}
                  {...register("email")}
                  type="text"
                  id="email"
                />
              </Box>
              <Box sx={style.inputContainer}>
                <Typography
                  sx={style.label}
                  component="label"
                  htmlFor="password"
                >
                  Senha
                </Typography>
                <TextField
                  size="small"
                  sx={style.input}
                  {...register("password")}
                  type="password"
                  id="password"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={style.actions}>
          <Button variant="contained" type="submit" sx={style.filterButton}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
