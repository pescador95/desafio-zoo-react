import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useMutation } from "@tanstack/react-query";
import { getHistoricoClinicosSeletor } from "../../../services/http/historicoClinico";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export const InputSelectHistoricoClinico = (
  defaultValues,
  field,
  onChange,
  ...props
) => {
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

  const { handleSubmit, control } = useForm({});

  const onSubmit = async (data) => {
    const values = {
      ...data,
    };
    return values;
  };

  const [historicoClinico, setHistoricoClinico] = useState();
  console.log(historicoClinico);

  const options =
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
    <form type="submit" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.inputContainer}>
        <Typography
          component="label"
          htmlFor="historicoclinico"
          sx={styles.label}
        >
          Histórico Clínico
        </Typography>
        <Controller
          name="historicoclinico"
          control={control}
          render={({
            field: onChange,
            defaultValues,
            historicoclinico,
            ...props
          }) => (
            <Select
              autoFocus
              isSearchable
              styles={colourStyles}
              type="text"
              inputId="historicoclinico"
              id="historicoclinico"
              placeholder="Selecione um Histórico Clínico..."
              options={options}
              onChange={(e) => setHistoricoClinico(e)}
              formatOptionLabel={formatOptionLabel}
              name="historicoclinico"
              value={historicoclinico}
              {...field}
              {...props}
            />
          )}
        />
      </Box>
    </form>
  );
};
