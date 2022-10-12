import { format } from "date-fns/esm";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertModal } from "../../components/AlertModal";
import { FormAnimal } from "../../components/FormAnimal";
import { Header } from "../../components/Header";
import { MenuLateral } from "../../components/MenuLateral";
import { Table } from "../../components/Table";
import { useAxios } from "../../hooks/useAxios";
import { deleteAnimals, getAnimals } from "../../services/http/animais";
import { LIFETIME } from "../../utils/constants";
import { parsedDate } from "../../utils/parsedDate";
import styles from "./Animals.module.css";

export const Animais = () => {
  const axios = useAxios();

  const [selectedItems, setSelectedItems] = useState([]);
  const [updateAnimal, setUpdateAnimal] = useState({});
  const [openFormAnimal, setOpenFormAnimal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [animais, setAnimais] = useState({
    data: [],
    totalElements: 0,
    size: 0,
  });

  useEffect(() => {
    getData();
    getTotalElements();
  }, []);

  const getData = async (page = 0) => {
    const data = await getAnimals(page);
    setAnimais((prev) => ({ ...prev, data, size: data?.length }));
  };

  const getTotalElements = async () => {
    const response = await axios.get("/animal/count");
    setAnimais((prev) => ({ ...prev, totalElements: response?.data }));
  };

  const columns = useMemo(
    () =>
      animais?.data?.length
        ? Object.keys(animais?.data[0])?.map((key) => ({
            key,
            label: key,
          }))
        : [],
    [animais]
  );

  const handleDelete = async () => {
    await deleteAnimals(selectedItems);
    await getData();
    await getTotalElements();
  };

  const handleEdit = (item) => {
    setUpdateAnimal(item);
    setOpenFormAnimal(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (values) => {
    const animal = {
      ...values,
      dataEntrada: format(
        new Date(parsedDate(values.dataEntrada)),
        "dd/MM/yyyy 00:00:00"
      ),
    };
  };

  return (
    <div className={styles.container}>
      <MenuLateral />
      <div className={styles.content}>
        <Header title="animais" />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles?.title}></h3>
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
                      {...register("sexo")}
                      type="radio"
                      value="Male"
                      id="field-sun"
                    />
                    <label htmlFor="Male">Macho</label>
                  </div>

                  <div>
                    <input
                      {...register("sexo")}
                      type="radio"
                      value="Female"
                      id="field-sun"
                    />
                    <label htmlFor="Female">Fêmea</label>
                  </div>
                </div>
                {errors?.sexo && (
                  <span className={styles.inputError}>
                    {errors?.sexo?.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.buttons}>
              <button
                className={styles.cancel}
                onClick={() =>
                  reset({
                    nomeComum: "",
                    nomeApelido: "",
                    sexo: "",
                    idade: "",
                    nomeCientifico: "",
                    origem: "",
                    identificacao: "",
                    dataEntrada: "",
                  })
                }
              >
                LIMPAR
              </button>
              <button className={styles.save}>FILTRAR </button>
            </div>
          </form>
        </div>
        <div className={styles.table}>
          <div>
            {animais?.data?.length ? (
              <Table
                columns={columns}
                data={animais?.data}
                onPaginate={(value) => getData(value - 1)}
                totalElements={animais?.totalElements}
                size={animais?.size}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                pages={Math.ceil(animais?.totalElements / animais?.size)}
                handleEdit={handleEdit}
              />
            ) : (
              ""
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={styles.exclude}
              onClick={() => setOpenAlertModal(true)}
              disabled={!selectedItems?.length}
            >
              Excluir {selectedItems?.length || ""} registros
            </button>

            <button
              className={styles.add}
              onClick={() => setOpenAlertModal(true)}
            >
              <span>+</span> CADASTRAR
            </button>
          </div>
        </div>

        <FormAnimal
          open={openFormAnimal}
          handleClose={() => {
            setOpenFormAnimal(false);
            setUpdateAnimal();
          }}
          defaultValues={updateAnimal}
        />
        <AlertModal
          open={openAlertModal}
          onDelete={handleDelete}
          handleClose={() => setOpenAlertModal(false)}
        />
      </div>
    </div>
  );
};

//TODO forma de pegar manualmente somente as colunas que desejar
// const column = [
//   {
//     key: 'nomeComum',
//     label: 'Nome Comum'
//   },
//   {
//     key: 'id',
//     label: 'Identificador'
//   }
// ]

//return ({...parsed, nomeUsuario: e?.usuario?.nomeUsuario}); TODO para acessar um atributo do objeto filho

// key:string
