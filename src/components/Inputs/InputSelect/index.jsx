import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

export const InputMultiselect = ({
  name,
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
            name={name}
            id={name}
            value={field?.value || ""}
            onChange={field?.onChange}
            sx={styles.input}
            error={!!error?.message}
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
