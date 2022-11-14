import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createUser, updateUser } from "../../services/http/users";
import { ROLES } from "../../utils/constants";
import styles from "./FormUsuario.module.css";

export const FormUsuario = ({ open, handleClose, defaultValues }) => {
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
    email: yup.string().required("* O campo é obrigatório"),
    nome: yup.string().required("* O campo é obrigatório"),
    password: yup.string().required("* O campo é obrigatório"),
    roleUsuario: yup.string().required("* O campo é obrigatório"),
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
        })
      : reset();
  }, [defaultValues]);

  const onSubmit = async (values) => {
    const usuario = {
      ...values,
    };
    console.log(usuario);
    if (!values.id) {
      await createUser(usuario);
    } else {
      await updateUser(usuario);
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
              ? "Editar usuário"
              : "Cadatrar usuário"}
          </h3>
          <div className={styles?.container}>
            <div style={{ width: "100%" }}>
              <div className={styles?.inputContainer}>
                <label htmlFor="email">Email</label>
                <input {...register("email")} />
                {errors?.email && (
                  <span className={styles.inputError}>
                    {errors?.email?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={styles?.container}>
            <div style={{ width: "100%", display: "flex", gap: "0.8rem" }}>
              <div className={styles?.inputContainer}>
                <label htmlFor="nome">Nome</label>
                <input {...register("nome")} />
                {errors?.nome && (
                  <span className={styles.inputError}>
                    {errors?.nome?.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={styles?.container}>
            <div className={styles?.inputContainer}>
              <label htmlFor="roleUsuario">Cargo</label>
              <select {...register("roleUsuario")}>
                {Object.keys(ROLES).map((key) => (
                  <option key={ROLES[key]} value={ROLES[key]}>
                    {ROLES[key]}
                  </option>
                ))}
              </select>
              {errors?.roleUsuario && (
                <span className={styles.inputError}>
                  {errors?.roleUsuario?.message}
                </span>
              )}
            </div>
          </div>
          <div className={styles?.container}>
            <div className={styles?.inputContainer}>
              <label htmlFor="password">Senha</label>
              <input {...register("password")} type="password" />
              {errors?.password && (
                <span className={styles.inputError}>
                  {errors?.password?.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.cancel} onClick={onClose}>
              Cancelar{" "}
            </button>
            <button className={styles.save}>Salvar </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
