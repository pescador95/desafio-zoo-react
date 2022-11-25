import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createAnimal, updateAnimal } from "../../services/http/animais";
import { formattedDateForInput, parsedDate } from "../../utils/parsedDate";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { GENDER, LIFETIME } from "../../utils/constants";
import { InputFile } from "../Inputs/InputFile";
import { InputMultiselect } from "../Inputs/InputSelect";
import { InputText } from "../Inputs/InputText";

export const FormHistoricoEtologico = ({
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
    nomeApelido: yup.string().required("* O campo é obrigatório"),
    identificacao: yup.string().required("* O campo é obrigatório"),
    dataEntrada: yup.string().required("* O campo é obrigatório"),
    nomeComum: yup.string().required("* O campo é obrigatório"),
    origem: yup.string().required("* O campo é obrigatório"),
    nomeCientifico: yup.string().required("* O campo é obrigatório"),
    sexo: yup.string().required("* O campo é obrigatório"),
    idade: yup.string().required("* O campo é obrigatório"),
    orgao: yup.string().required("* O campo é obrigatório"),
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
          dataEntrada: formattedDateForInput(defaultValues.dataEntrada),
        })
      : reset();
  }, [defaultValues]);

  const { mutate: createAnimalMutate } = useMutation(
    ["createAnimal"],
    (animal) => createAnimal(animal),
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

  const { mutate: updateAnimalMutate } = useMutation(
    (animal) => updateAnimal(animal),
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
      dataEntrada: format(
        new Date(parsedDate(receivedValues.dataEntrada)),
        "dd/MM/yyyy"
      ),
    };
    if (receivedValues.id) return updateAnimalMutate(values);
    return createAnimalMutate(values);
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
            ? "Editar ficha do animal"
            : "Cadastrar ficha do animal"}
        </Typography>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="nomeApelido"
            label="Nome apelido"
            error={errors?.nomeApelido}
          />

          <InputText
            control={control}
            name="nomeComum"
            label="Nome comum"
            error={errors?.nomeComum}
          />

          <InputText
            control={control}
            name="nomeCientifico"
            label="Nome cientifico"
            error={errors?.nomeCientifico}
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="identificacao"
            label="Microship/Anilha"
            error={errors?.identificacao}
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="dataEntrada"
            label="Data de entrada"
            error={errors?.dataEntrada}
            type="date"
          />

          <InputMultiselect
            control={control}
            name="idade"
            label="Tempo de vida"
            error={errors?.idade}
            options={Object.keys(LIFETIME)?.map((key) => ({
              label: LIFETIME[key].valueOf(),
              value: LIFETIME[key],
            }))}
          />

          <InputMultiselect
            control={control}
            name="sexo"
            label="Sexo"
            error={errors?.idade}
            options={Object.keys(GENDER)?.map((key) => ({
              label: GENDER[key].valueOf(),
              value: GENDER[key],
            }))}
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="origem"
            label="Origem"
            error={errors?.origem}
          />

          <InputText
            control={control}
            name="orgao"
            label="Orgão"
            error={errors?.orgao}
          />
        </Box>

        <Box sx={styles.line}>
          <InputFile
            control={control}
            name="file"
            label="Arquivos"
            error={errors?.file}
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
