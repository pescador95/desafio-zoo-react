import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  createHistoricoClinico,
  updateHistoricoClinico,
} from "../../services/http/historicoClinico";
import { formattedDateForInput, parsedDate } from "../../utils/parsedDate";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { InputText } from "../Inputs/InputText";
import { InputSelectAnimal } from "../Inputs/InputSelectAnimal";

export const FormHistoricoClinico = ({
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
    // nomeAnimal: yup.string().required("* O campo é obrigatório"),
    // dataHistoricoClinico: yup.string().required("* O campo é obrigatório"),
    // etco2: yup.string(),
    // frequenciaCardiaca: yup.string(),
    // frequenciaRespiratoria: yup.string(),
    // temperaturaAnimal: yup.string(),
    // pd: yup.string(),
    // pm: yup.string(),
    // ps: yup.string(),
    // spo2: yup.string(),
    // observacao: yup.string(),
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
          dataHistoricoClinico: formattedDateForInput(
            defaultValues.dataHistoricoClinico
          ),
        })
      : reset(defaultValues);
  }, [defaultValues]);

  const { mutate: createHistoricoClinicoMutate } = useMutation(
    ["createHistoricoClinico"],
    (historicoClinico) => createHistoricoClinico(historicoClinico),
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

  const { mutate: updateHistoricoClinicoMutate } = useMutation(
    ["updateHistoricoClinico"],
    (historicoClinico) => updateHistoricoClinico(historicoClinico),
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
      dataHistoricoClinico: format(
        new Date(parsedDate(receivedValues.dataHistoricoClinico)),
        "dd/MM/yyyy"
      ),
    };
    if (receivedValues.id) return updateHistoricoClinicoMutate(values);
    return createHistoricoClinicoMutate(values);
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
            ? "Editar ficha do histórico clínico"
            : "Cadastrar ficha do histórico clínico"}
        </Typography>

        <InputSelectAnimal />

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="dataHistoricoClinico"
            label="Data da Coleta"
            error={errors?.dataHistoricoClinico}
            type="date"
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="frequenciaCardiaca"
            label="Frequência Cardíaca"
            error={errors?.frequenciaCardiaca}
          />
          <InputText
            control={control}
            name="frequenciaRespiratoria"
            label="Frequência Respiratória"
            error={errors?.frequenciaRespiratoria}
          />

          <InputText
            control={control}
            name="temperaturaAnimal"
            label="Temperatura do Animal"
            error={errors?.temperaturaAnimal}
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="etco2"
            label="EtcO2"
            error={errors?.etco2}
          />

          <InputText
            control={control}
            name="pd"
            label="Pd"
            error={errors?.pd}
          />

          <InputText
            control={control}
            name="pm"
            label="Pm"
            error={errors?.pm}
          />

          <InputText
            control={control}
            name="ps"
            label="Ps"
            error={errors?.ps}
          />

          <InputText
            control={control}
            name="spo2"
            label="SpO2"
            error={errors?.spo2}
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="observacao"
            label="Observação"
            error={errors?.observacao}
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
