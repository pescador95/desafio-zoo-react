import { OndemandVideoOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";

export const AlertModal = ({ open, handleClose, onDelete }) => {
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

  const onSubmit = async (values) => {
    onDelete();
    handleClose();
  };

  const onClose = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style} sx={style}>
        <h3>Deseja realmente excluir os registros selecionados?</h3>
        <Button onClick={onClose}>CANCELAR</Button>
        <Button onClick={onSubmit}>CONFIRMAR</Button>
      </Box>
    </Modal>
  );
};
