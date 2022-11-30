import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useMutation } from "@tanstack/react-query";
import { getAnimalsSeletor } from "../../../services/http/animais";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export const InputSelectAnimal = (field, onChange, ...rest) => {
  const styles = {
    inputContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
    },
    input: {
      background: "#AEFFB2",
    },
    error: {
      fontSize: "0.8rem",
      color: "red",
    },
  };

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#AEFFB2",
      minHeight: 56,
      margin: 0,
      bordeRadius: 4,
      borderColor: "#BCBCBC",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: "#000",
      };
    },
  };

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

  useEffect(() => getSeletorData(), []);

  const { handleSubmit, control } = useForm({});

  const onSubmit = async (data) => {
    const values = {
      ...data,
    };
    return values;
  };

  const [animal, setAnimal] = useState();
  console.log(animal);

  const options =
    animals?.map((animal) => ({
      id: animal?.id,
      nomeComum: animal?.nomeComum,
      nomeApelido: animal?.nomeApelido,
      identificacao: animal?.identificacao,
      orgao: animal?.orgao,
    })) || [];

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

  return (
    <Box sx={styles.inputContainer}>
      <Typography component="label" htmlFor="animal" sx={styles.label}>
        Animal
      </Typography>

      <Controller
        name="animal"
        control={control}
        render={({ field }) => (
          <Select
            autoFocus
            isSearchable
            styles={colourStyles}
            name="animal"
            placeholder="Selecione um Animal..."
            options={options}
            onChange={(e) => setAnimal(e)}
            formatOptionLabel={formatOptionLabel}
            value={animal}
            onSubmit={handleSubmit}
            {...field}
            {...rest}
          />
        )}
      />
    </Box>
  );
};
