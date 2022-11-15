import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext } from "react";

const ToastContext = createContext();
export const ToastProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("error");

  const openToast = (message, severity = "error") => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };
  return (
    <ToastContext.Provider value={{ openToast }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
