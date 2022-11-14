import { yupResolver } from "@hookform/resolvers/yup";
import { getAccordionDetailsUtilityClass } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createAnimal, updateAnimal } from "../../services/http/animais";
import { LIFETIME } from "../../utils/constants";
import { formattedDateForInput, parsedDate } from "../../utils/parsedDate";
import styles from "./FormAnimal.module.css";
import { Animais } from "../../pages/Animals";

export const FormAnimal = ({ open, handleClose, defaultValues }) => {
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

  const schema = yup.object().shape({
    nomeApelido: yup.string().required("* O campo é obrigatório"),
    identificacao: yup.string().required("* O campo é obrigatório"),
    dataEntrada: yup.string().required("* O campo é obrigatório"),
    nomeComum: yup.string().required("* O campo é obrigatório"),
    origem: yup.string().required("* O campo é obrigatório"),
    nomeCientifico: yup.string().required("* O campo é obrigatório"),
    sexo: yup.string().required("* O campo é obrigatório").nullable(),
    idade: yup.string().required("* O campo é obrigatório").nullable(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    defaultValues?.id
      ? reset({
          ...defaultValues,
          dataEntrada: formattedDateForInput(defaultValues.dataEntrada),
        })
      : reset();
  }, [defaultValues]);

  const onSubmit = async (values) => {
    const animal = {
      ...values,
      dataEntrada: format(
        new Date(parsedDate(values.dataEntrada)),
        "dd/MM/yyyy 00:00:00"
      ),
    };
    if (!values.id) {
      await createAnimal(animal);
    } else {
      await updateAnimal(animal);
    }
    handleClose();
  };

  const onClose = () => {
    reset({});
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className={styles?.title}>
            {defaultValues?.id
              ? "Editar ficha do animal"
              : "Cadatrar ficha do animal"}
          </h3>
          <div className={styles?.container}>
            <div style={{ width: "40%" }}>
              <div className={styles?.inputContainer}>
                <label htmlFor="nomeApelido">Nome apelido</label>
                <input {...register("nomeApelido")} />
                {errors?.nomeApelido && (
                  <span className={styles.inputError}>
                    {errors?.nomeApelido?.message}
                  </span>
                )}
              </div>
            </div>
            <div style={{ width: "60%", display: "flex", gap: "0.8rem" }}>
              <div className={styles?.inputContainer}>
                <label htmlFor="identificacao">Microchip/Anilha</label>
                <input {...register("identificacao")} />
                {errors?.identificacao && (
                  <span className={styles.inputError}>
                    {errors?.identificacao?.message}
                  </span>
                )}
              </div>
              <div className={styles?.inputContainer}>
                <label htmlFor="dataEntrada">Data de entrada</label>
                <input type="date" {...register("dataEntrada")} />
                {errors?.dataEntrada && (
                  <span className={styles.inputError}>
                    {errors?.dataEntrada?.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={styles?.container}>
            <div className={styles?.inputContainer}>
              <label htmlFor="nomeComum">Nome comum</label>
              <input {...register("nomeComum")} />
              {errors?.nomeComum && (
                <span className={styles.inputError}>
                  {errors?.nomeComum?.message}
                </span>
              )}
            </div>
            <div className={styles?.inputContainer}>
              <label htmlFor="origem">Origem</label>
              <input {...register("origem")} />
              {errors?.origem && (
                <span className={styles.inputError}>
                  {errors?.origem?.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles?.container}>
            <div className={styles?.inputContainer}>
              <label htmlFor="nomeCientifico">Nome cientifico</label>
              <input {...register("nomeCientifico")} />
              {errors?.nomeCientifico && (
                <span className={styles.inputError}>
                  {errors?.nomeCientifico?.message}
                </span>
              )}
            </div>
            <div className={styles?.inputContainer}>
              <label htmlFor="idade">Tempo de vida</label>
              <select {...register("idade")}>
                {Object.keys(LIFETIME).map((key) => (
                  <option key={LIFETIME[key]} value={LIFETIME[key]}>
                    {LIFETIME[key]}
                  </option>
                ))}
              </select>
              {errors?.idade && (
                <span className={styles.inputError}>
                  {errors?.idade?.message}
                </span>
              )}
            </div>

            <div className={styles?.inputContainer}>
              <label>Sexo</label>
              <div className={styles?.radioButtons}>
                <div>
                  <input
                    className={styles?.radio}
                    {...register("sexo")}
                    type="radio"
                    value="Macho"
                    id="field-sun"
                  />
                  <label htmlFor="Macho">Macho</label>
                </div>

                <div>
                  <input
                    className={styles?.radio}
                    {...register("sexo")}
                    type="radio"
                    value="Fêmea"
                    id="field-sun"
                  />
                  <label htmlFor="Fêmea">Fêmea</label>
                </div>
              </div>
              {errors?.sexo && (
                <span className={styles.inputError}>
                  {errors?.sexo?.message}
                </span>
              )}
            </div>
          </div>
          <div className={styles?.inputUpload}>
            <label htmlFor="arquivo">Arquivos</label>
            <input multiple type="file" {...register("arquivo")} />
            {errors?.arquivo && (
              <span className={styles.inputError}>
                {errors?.arquivo?.message}
              </span>
            )}
          </div>
          <div className={styles.buttons}>
            <button className={styles.cancel} onClick={onClose}>
              Cancelar{" "}
            </button>
            <button className={styles.save} onClick={onSubmit}>
              Salvar
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
