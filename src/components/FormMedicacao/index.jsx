import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  createMedicacao,
  updateMedicacao,
} from "../../services/http/medicacao";

import { formattedDateForInput, parsedDate } from "../../utils/parsedDate";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { InputFile } from "../Inputs/InputFile";
import { InputText } from "../Inputs/InputText";
import { getHistoricoClinicosSeletor } from "../../services/http/historicoClinico";
import { InputSelectReact } from "../Inputs/InputSelectReact";

export const FormMedicacao = ({ open, defaultValues, onConfirm, onCancel }) => {
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
    // historicoClinico: yup.string().required("* O campo é obrigatório"),
    // nomeMedicacao: yup.string().required("* O campo é obrigatório"),
    // viaAdministracao: yup.string().required("* O campo é obrigatório"),
    // posologia: yup.string().required("* O campo é obrigatório"),
    // frequencia: yup.string().required("* O campo é obrigatório"),
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
          historicoClinico: setHistoricoClinico(defaultValues.historicoClinico),
        })
      : reset(defaultValues, setHistoricoClinico(null));
  }, [defaultValues]);

  const { mutate: createMedicacaoMutate } = useMutation(
    ["createMedicacao"],
    (medicacao) => createMedicacao(medicacao),
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

  const { mutate: updateMedicacaoMutate } = useMutation(
    ["updateMedicacao"],
    (medicacao) => updateMedicacao(medicacao),
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
      historicoClinico: { id: historicoClinico?.id },
      //ver como implementar o id do animal
    };
    if (receivedValues.id) return updateMedicacaoMutate(values);
    return createMedicacaoMutate(values);
  };

  const { mutate: getHistoricoClinicosMutate, data: historicoClinicos } =
    useMutation(
      ({ sort = "asc", strgOrder = "id" }) =>
        getHistoricoClinicosSeletor(sort, strgOrder),
      {
        onError: (error) => {
          toast.error(error?.response?.data?.messages?.join(", "));
        },
      }
    );

  const getSeletorData = (page = 0, strgFilter = "") => {
    getHistoricoClinicosMutate({ page, strgFilter });
  };

  useEffect(() => getSeletorData(), []);

  const [historicoClinico, setHistoricoClinico] = useState();

  const optionsHistoricoClinico =
    historicoClinicos?.map((historicoClinico) => ({
      id: historicoClinico?.id,
      nomeAnimal: historicoClinico?.nomeAnimal,
      dataHistoricoClinico: historicoClinico?.dataHistoricoClinico,
      observacao: historicoClinico?.observacao,
    })) || [];

  const formatOptionLabel = ({
    id,
    nomeAnimal,
    dataHistoricoClinico,
    observacao,
  }) => (
    <div style={{ display: "column" }}>
      <div style={{ display: "space-between" }}>
        {id} {nomeAnimal} - {dataHistoricoClinico}
      </div>
      <div style={{ marginLeft: "10px", color: "#5c5c5c" }}>
        <div>{observacao}</div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

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
            ? "Editar Ficha de Medicação"
            : "Cadastrar Ficha de Medicação"}
        </Typography>

        <InputSelectReact
          name="historicoClinico"
          formatOptionLabel={formatOptionLabel}
          options={optionsHistoricoClinico}
          onChange={setHistoricoClinico}
          control={control}
          error={errors?.historicoClinico}
          value={historicoClinico}
          label="Histórico Clínico"
          id="historicoClinico"
          placeholder={"Selecione um Histórico Clínico..."}
        />

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="nomeMedicacao"
            label="Nome da Medicacão"
            error={errors?.nomeMedicacao}
          />
        </Box>

        <Box sx={styles.line}>
          <InputText
            control={control}
            name="posologia"
            label="Posologia"
            error={errors?.posologia}
          />

          <InputText
            control={control}
            name="viaAdministracao"
            label="Via de Administração"
            error={errors?.viaAdministracao}
          />

          <InputText
            control={control}
            name="frequencia"
            label="Frequência"
            error={errors?.frequencia}
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
