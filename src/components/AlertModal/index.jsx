import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";

export const AlertModal = ({ open, onConfirm, onCancel }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style} sx={style}>
        <h3>Deseja realmente excluir os registros selecionados?</h3>
        <Button onClick={onCancel}>CANCELAR</Button>
        <Button onClick={onConfirm}>CONFIRMAR</Button>
      </Box>
    </Modal>
  );
};
