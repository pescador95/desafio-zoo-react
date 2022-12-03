import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createUpload, updateUpload } from "../../services/http/uploads";
import { formattedDateForInput, parsedDate } from "../../utils/parsedDate";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { InputFile } from "../Inputs/InputFile";
import { InputSelectReact } from "../Inputs/InputSelectReact";
import { InputText } from "../Inputs/InputText";
import { getAnimalsSeletor } from "../../services/http/animais";
import { ROUTINES } from "../../utils/constants";
import { InputMultiselect } from "../Inputs/InputSelect";
import { Input } from "@mui/material";

export const FormUpload = ({ open, defaultValues, onConfirm, onCancel }) => {
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
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    defaultValues?.id
      ? reset({
          ...defaultValues,
          animal: setAnimal(defaultValues.animal),
          data: formattedDateForInput(defaultValues.data),
          rotina: setRotina(defaultValues.rotina),
        })
      : reset(defaultValues, setAnimal(null), setData(null), setRotina(null));
  }, [defaultValues]);

  const { mutate: createUploadMutate } = useMutation(
    ["createUpload"],
    (values) => createUpload(values),
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
  const [data, setData] = useState();
  const [animal, setAnimal] = useState(null);
  const [rotina, setRotina] = useState(null);

  const fileToData = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const onChangeUpload = (file) => {
    if (!file) {
      setData("");
      console.log(file);
      return;
    }
    fileToData(file.target.files[0]).then((data) => {
      setData(data);
    });
  };

  const onSubmit = async () => {
    const values = {
      file: { file: { name: "file", fileUpload: data } },
      fileReference: rotina,
      idAnimal: animal?.id,
    };
    return await createUploadMutate(values);
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

  const formatOptionLabel = ({
    id,
    nomeComum,
    nomeApelido,
    identificacao,
    orgao,
  }) => (
    <div style={{ display: "column" }}>
      <div style={{ display: "space-between" }}>
        {id} - {nomeComum}, Apelido: {nomeApelido}
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

  const optionsAnimal =
    animals?.map((animal) => ({
      id: animal?.id,
      nomeComum: animal?.nomeComum,
      nomeApelido: animal?.nomeApelido,
      identificacao: animal?.identificacao,
      orgao: animal?.orgao,
    })) || [];

  const optionsRotina = Object.keys(ROUTINES)?.map((key) => ({
    value: key,
    label: ROUTINES[key].valueOf(),
  }));

  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.modal} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={styles.title}>
          {defaultValues?.id ? "Editar upload" : "Cadastrar upload"}
        </Typography>

        <InputSelectReact
          name="idAnimal"
          formatOptionLabel={formatOptionLabel}
          options={optionsAnimal}
          onChange={setAnimal}
          control={control}
          error={errors?.animal}
          value={animal}
          label="Animal"
          id="idAnimal"
          placeholder={"Selecione um Animal..."}
        />

        <InputMultiselect
          name="fileReference"
          options={optionsRotina}
          onChange={(e) => setRotina(e.target.value)}
          control={control}
          error={errors?.rotina}
          value={rotina}
          defaultValues={defaultValues?.rotina}
          label="Rotinas"
          id="fileReference"
          placeholder={"Selecione uma Rotina..."}
        />

        <Box sx={styles.line}>
          <InputFile
            control={control}
            name="file"
            label="Arquivos"
            onChange={(e) => setData(e.target.value)}
            value={data}
            error={errors?.file}
            type="file"
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
