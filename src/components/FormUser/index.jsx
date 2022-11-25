import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createUser, updateUser } from "../../services/http/users";
import { ROLES } from "../../utils/constants";
import { InputMultiselect } from "../Inputs/InputSelect";
import { Button, Typography } from "@mui/material";
import { InputText } from "../Inputs/InputText";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export const FormUser = ({ open, defaultValues, onConfirm, onCancel }) => {
  const styles = {
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    title: {
      fontSize: "1.5rem",
    },
    line: {
      display: "flex",
      gap: "0.5rem",
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      background: "#AEFFB2",
    },
    actions: {
      marginTop: "1rem",
      display: "flex",
      gap: "0.5rem",
    },
    cancel: {
      color: "#000",
      width: "100%",
      maxWidth: "100%",
      height: "2.5rem",
      background: "#ccc",
      transition: "0.2s",
      "&:hover": {
        background: "#ccc",
        filter: "brightness(0.8)",
      },
      display: "flex",
      gap: "0.5rem",
    },
    save: {
      color: "#fff",
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
  };

  const schema = yup.object().shape({
    email: yup.string().required("* O campo é obrigatório"),
    nome: yup.string().required("* O campo é obrigatório"),
    password: yup.string().required("* O campo é obrigatório"),
    roleUsuario: yup.string().required("* O campo é obrigatório"),
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    defaultValues?.id
      ? reset({
          ...defaultValues,
        })
      : reset();
  }, [defaultValues]);

  const { mutate: createUserMutate } = useMutation(
    ["createUser"],
    (usuario) => createUser(usuario),
    {
      onSuccess: (success) => {
        toast.success(success?.data?.messages?.join(", "));
        onConfirm();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const { mutate: updateUserMutate } = useMutation(
    (usuario) => updateUser(usuario),
    {
      onSuccess: (success) => {
        toast.success(success?.data?.messages?.join(", "));
        onConfirm();
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
    if (receivedValues.id) return updateUserMutate(values);
    return createUserMutate(values);
  };

  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.modal} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={styles.title}>
          {defaultValues?.id ? "Editar Usuário" : "Cadastrar Usuário"}
        </Typography>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="email"
            label="Email"
            error={errors?.email}
          />

          <InputText
            type="password"
            control={control}
            name="password"
            label="Senha"
            error={errors?.password}
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="nome"
            label="Nome"
            error={errors?.nome}
          />
        </Box>

        <Box sx={styles.line}>
          <InputMultiselect
            control={control}
            name="roleUsuario"
            label="Perfil de Acesso"
            error={errors?.roleUsuario}
            options={Object.keys(ROLES)?.map((key) => ({
              label: ROLES[key].valueOf(),
              value: key,
            }))}
          />
        </Box>

        <Box sx={styles.actions}>
          <Button sx={styles.cancel} onClick={onCancel}>
            Cancelar
          </Button>
          <Button sx={styles.save} type="submit">
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
