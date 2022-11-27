import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createNutricao, updateNutricao } from "../../services/http/nutricao";
import { formattedDateForInput, parsedDate } from "../../utils/parsedDate";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { InputText } from "../Inputs/InputText";
import { InputSelectAnimal } from "../Inputs/InputSelectR";

export const FormNutricao = ({ open, defaultValues, onConfirm, onCancel }) => {
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
    nomeAnimal: yup.string().required("* O campo é obrigatório"),
    dataInicio: yup.string().required("* O campo é obrigatório"),
    dataFim: yup.string().required("* O campo é obrigatório"),
    descricaoNutricao: yup.string().required("* O campo é obrigatório"),
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
          dataInicio: formattedDateForInput(defaultValues.dataInicio),
          dataFim: formattedDateForInput(defaultValues.dataFim),
        })
      : reset();
  }, [defaultValues]);

  const { mutate: createNutricaoMutate } = useMutation(
    ["createNutricao"],
    (nutricao) => createNutricao(nutricao),
    {
      onSuccess: (data) => {
        toast.success(data?.messages?.join(", "));
        onConfirm();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const { mutate: updateNutricaoMutate } = useMutation(
    ["updateNutricao"],
    (nutricao) => updateNutricao(nutricao),
    {
      onSuccess: (data) => {
        toast.success(data?.messages?.join(", "));
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
      dataInicio: format(
        new Date(parsedDate(receivedValues.dataInicio)),
        "dd/MM/yyyy"
      ),
      dataFim: format(
        new Date(parsedDate(receivedValues.dataFim)),
        "dd/MM/yyyy"
      ),
    };
    if (receivedValues.id) return updateNutricaoMutate(values);
    return createNutricaoMutate(values);
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
          {defaultValues?.id
            ? "Editar ficha de Nutrição"
            : "Cadastrar ficha de Nutrição"}
        </Typography>

        <Box sx={styles.line}>
          <InputSelectAnimal />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="dataInicio"
            label="Data de Início"
            error={errors?.dataInicio}
            type="date"
          />

          <InputText
            control={control}
            name="dataFim"
            label="Data Final"
            error={errors?.dataFim}
            type="date"
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="descricaoNutricao"
            label="Descrição"
            error={errors?.descricaoNutricao}
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
