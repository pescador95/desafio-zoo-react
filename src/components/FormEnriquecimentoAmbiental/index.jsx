import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  createEnriquecimentoAmbiental,
  updateEnriquecimentoAmbiental,
} from "../../services/http/enriquecimentoAmbiental";
import { formattedDateForInput, parsedDate } from "../../utils/parsedDate";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { InputText } from "../Inputs/InputText";
import { InputSelectAnimal } from "../Inputs/InputSelectAnimal";

export const FormEnriquecimentoAmbiental = ({
  open,
  defaultValues,
  onConfirm,
  onCancel,
}) => {
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
    // dataEnriquecimento: yup.string().required("* O campo é obrigatório"),
    // descricaoEnriquecimento: yup.string().required("* O campo é obrigatório"),
    // nomeAnimal: yup.string().required("* O campo é obrigatório"),
    // nomeEnriquecimento: yup.string().required("* O campo é obrigatório"),
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
          dataEnriquecimento: formattedDateForInput(
            defaultValues.dataEnriquecimento
          ),
        })
      : reset();
  }, [defaultValues]);

  const { mutate: createEnriquecimentoAmbientalMutate } = useMutation(
    ["createEnriquecimentoAmbiental"],
    (enriquecimentoAmbiental) =>
      createEnriquecimentoAmbiental(enriquecimentoAmbiental),
    {
      onSuccess: (data) => {
        console.log(data);
        toast.success(data?.messages?.join(", "));
        onConfirm();
      },
      onError: (error) => {
        console.log(error);
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const { mutate: updateEnriquecimentoAmbientalMutate } = useMutation(
    ["updateEnriquecimentoAmbiental"],
    (enriquecimentoAmbiental) =>
      updateEnriquecimentoAmbiental(enriquecimentoAmbiental),
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
    console.log(receivedValues);
    const values = {
      ...receivedValues,
      dataEnriquecimento: format(
        new Date(parsedDate(receivedValues.dataEnriquecimento)),
        "dd/MM/yyyy"
      ),
      animal: { id: receivedValues.idAnimal },
    };
    console.log(values);
    if (receivedValues.id) return updateEnriquecimentoAmbientalMutate(values);
    return createEnriquecimentoAmbientalMutate(values);
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
            ? "Editar ficha de enriquecimento ambiental"
            : "Cadastrar ficha de enriquecimento ambiental"}
        </Typography>

        <InputSelectAnimal />

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="idAnimal"
            label="id do Animal"
            error={errors?.idAnimal}
            type="idAnimal"
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="nomeEnriquecimento"
            label="Atividade"
            error={errors?.nomeEnriquecimento}
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="dataEnriquecimento"
            label="Data da Atividade"
            error={errors?.dataEnriquecimento}
            type="date"
          />
        </Box>
        <Box sx={styles.line}>
          <InputText
            control={control}
            name="descricaoEnriquecimento"
            label="Descrição"
            error={errors?.descricaoEnriquecimento}
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
