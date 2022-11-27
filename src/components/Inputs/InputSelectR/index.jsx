import React, { useEffect } from "react";
import Select from "react-select";
import { useMutation } from "@tanstack/react-query";
import { getAnimals } from "../../../services/http/animais";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";

export const InputSelectR = () => {
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
    control: (styles) => ({ ...styles, backgroundColor: "#AEFFB2" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: "#000",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
  };

  const { mutate: getAnimalsMutate, data: animals } = useMutation(
    ({ page = 0, strgFilter = "" }) => getAnimals(page, strgFilter),
    {
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const getTableData = (page = 0, strgFilter = "") => {
    getAnimalsMutate({ page, strgFilter });
  };

  useEffect(() => getTableData(), []);

  const options =
    animals?.map((animal) => ({
      value: animal?.id,
      nomeComum: animal?.nomeComum,
      nomeApelido: animal?.nomeApelido,
      identificacao: animal?.identificacao,
      orgao: animal?.orgao,
    })) || [];

  const formatOptionLabel = ({
    value,
    nomeApelido,
    identificacao,
    orgao,
    nomeComum,
  }) => (
    <div style={{ display: "column" }}>
      <div>{nomeComum}</div>
      <div>{nomeApelido}</div>
      <div>{identificacao}</div>
      <div>{orgao}</div>
    </div>
  );

  return (
    <Box sx={styles.inputContainer}>
      <Typography component="label" htmlFor="teste" sx={styles.label}>
        Animal
      </Typography>

      <Select
        size="small"
        styles={colourStyles}
        type="text"
        id="animal"
        defaultValue={options[0]}
        formatOptionLabel={formatOptionLabel}
        options={options}
      ></Select>
    </Box>
  );
};
