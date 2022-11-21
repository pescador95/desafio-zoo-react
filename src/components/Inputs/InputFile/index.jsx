import { Box, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

export const InputFile = ({ name, label, error, control, ...rest }) => {
  const styles = {
    inputContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
    },
    input: {
      background: "#AEFFB2",
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
          <TextField
            type="file"
            name={name}
            id={name}
            value={field?.value || ""}
            onChange={field?.onChange}
            sx={styles.input}
            {...rest}
          />
        </Box>
      )}
    />
  );
};
