import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  createHistoricoEtologico,
  updateHistoricoEtologico,
} from "../../services/http/historicoEtologico";
import { formattedDateForInput, parsedDate } from "../../utils/parsedDate";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { InputSelectReact } from "../Inputs/InputSelectReact";
import { InputText } from "../Inputs/InputText";
import { getAnimalsSeletor } from "../../services/http/animais";

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
    // nomeAnimal: yup.string().required("* O campo é obrigatório"),
    // nomeEtologico: yup.string().required("* O campo é obrigatório"),
    // descricaoEtologico: yup.string().required("* O campo é obrigatório"),
    // dataEtologico: yup.string().required("* O campo é obrigatório"),
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
          dataEtologico: formattedDateForInput(defaultValues.dataEtologico),
        })
      : reset(defaultValues);
  }, [defaultValues]);

  const { mutate: createHistoricoEtologicoMutate } = useMutation(
    ["createHistoricoEtologico"],
    (historicoEtologico) => createHistoricoEtologico(historicoEtologico),
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

  const { mutate: updateHistoricoEtologicoMutate } = useMutation(
    ["updateHistoricoEtologico"],
    (historicoEtologico) => updateHistoricoEtologico(historicoEtologico),
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
      animal: { id: animal?.id },
      dataEtologico: format(
        new Date(parsedDate(receivedValues.dataEtologico)),
        "dd/MM/yyyy"
      ),
      idAnimal: animal?.id,
    };
    if (receivedValues.id) return updateHistoricoEtologicoMutate(values);
    return createHistoricoEtologicoMutate(values);
  };

  useEffect(() => getSeletorData(), []);

  const { mutate: getAnimalsMutate, data: animals } = useMutation(
    ({ sort = "asc", strgOrder = "id" }) => getAnimalsSeletor(sort, strgOrder),
    {
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const getSeletorData = (page = 0, strgFilter = "") => {
    getAnimalsMutate({ page, strgFilter });
  };

  const [animal, setAnimal] = useState(null);

  const formatOptionLabel = ({
    id,
    nomeComum,
    nomeApelido,
    identificacao,
    orgao,
  }) => (
    <div style={{ display: "column" }}>
      <div style={{ display: "space-between" }}>
        {id} {nomeComum}, Apelido: {nomeApelido}
      </div>
      <div style={{ marginLeft: "10px", color: "#5c5c5c" }}>
        <div>
          Identificação: {identificacao} - {orgao}
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

  const options =
    animals?.map((animal) => ({
      id: animal?.id,
      nomeComum: animal?.nomeComum,
      nomeApelido: animal?.nomeApelido,
      identificacao: animal?.identificacao,
      orgao: animal?.orgao,
    })) || [];

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
            ? "Editar Ficha do Histórico Etológico"
            : "Cadastrar Ficha do Histórico Etológico"}
        </Typography>

        <InputSelectReact
          name="animal"
          formatOptionLabel={formatOptionLabel}
          options={options}
          onChange={(e) => setAnimal(e.target.value)}
          control={control}
          error={errors?.animal}
          value={animal}
          label="Animal"
          id="animal"
          placeholder={"Selecione um Animal..."}
        />

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="nomeEtologico"
            label="Nome Etologico"
            error={errors?.nomeEtologico}
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="dataEtologico"
            label="Data de Etológico"
            error={errors?.dataEtologico}
            type="date"
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="descricaoEtologico"
            label="Descrição Etológico"
            error={errors?.descricaoEtologico}
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
