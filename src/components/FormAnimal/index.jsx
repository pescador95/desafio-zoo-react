import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./FormAnimal.module.css";

export const FormAnimal = ({ open, handleClose }) => {
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
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h3 className={style?.title}>Cadatrar ficha do animal</h3>
        <div className={styles?.container}>
          <div style={{ width: "50%" }}>
            <div className={styles?.inputContainer}>
              <label>Nome apelido</label>
              <input />
            </div>
          </div>
          <div style={{ width: "50%", display: "flex", gap: "0.8rem" }}>
            <div className={styles?.inputContainer}>
              <label>Microchip/Anilha</label>
              <input />
            </div>
            <div className={styles?.inputContainer}>
              <label>Data de entrada</label>
              <input />
            </div>
          </div>
        </div>

        <div className={styles?.container}>
          <div className={styles?.inputContainer}>
            <label>Nome comum</label>
            <input />
          </div>
          <div className={styles?.inputContainer}>
            <label>Origem</label>
            <input />
          </div>
        </div>

        <div className={styles?.container}>
          <div className={styles?.inputContainer}>
            <label>Nome cientifico</label>
            <input />
          </div>
          <div className={styles?.inputContainer}>
            <label>Data de entrada</label>
            <input />
          </div>
          <div className={styles?.inputContainer}>
            <label>Sexo</label>
            <div className={styles?.radioButtons}>
              <div>
                <input type="radio" />
                <label>Macho</label>
              </div>
              <div>
                <input type="radio" />
                <label>Fêmea</label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.cancel}>Cancelar </button>
          <button className={styles.save}>Salvar </button>
        </div>
      </Box>
    </Modal>
  );
};
