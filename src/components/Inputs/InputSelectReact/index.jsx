import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Box, MenuItem, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

export const InputSelectReact = ({
  name,
  placeholder,
  label,
  error,
  control,
  options,
  ...rest
}) => {
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

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box sx={styles.inputContainer}>
          <Typography component="label" htmlFor={name}>
            {label}
          </Typography>
          <Select
            autoFocus
            isSearchable
            styles={colourStyles}
            name={name}
            id={name}
            value={field?.value || ""}
            placeholder={placeholder}
            options={options}
            onChange={field?.onChange}
            error={!!error?.message}
            {...field}
            {...rest}
          >
            {options?.map((option) => (
              <MenuItem key={option?.value} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </Select>
          <Typography sx={styles.error} component="span" htmlFor={name}>
            {error?.message}
          </Typography>
        </Box>
      )}
    />
  );
};
