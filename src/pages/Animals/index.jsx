import { format } from "date-fns/esm";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertModal } from "../../components/AlertModal";
import { FormAnimal } from "../../components/FormAnimal";
import { Header } from "../../components/Header";
import { SideBarMenu } from "../../components/SideBarMenu";
import { Table } from "../../components/Table";
import { useAxios } from "../../hooks/useAxios";
import {
  deleteAnimals,
  getAnimals,
  countAnimal,
} from "../../services/http/animais";
import { LIFETIME } from "../../utils/constants";
import { makeMultiFilterParams } from "../../utils/multiFilters";
import { parsedDate } from "../../utils/parsedDate";
import styles from "./Animals.module.css";
import "./index.css";

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

  const getData = async (page = 0, strgFilter = "") => {
    const data = await getAnimals(page, strgFilter);
    setAnimais((prev) => ({ ...prev, data, size: data?.length }));
  };

  const getTotalElements = async (stringFilter = "") => {
    const response = await countAnimal(stringFilter);
    setAnimais((prev) => ({ ...prev, totalElements: response }));
    console.log(setAnimais((prev) => ({ ...prev, totalElements: response })));
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
    const filters = {};
    Object.keys(values).forEach((key) => {
      if (key === "dataEntrada") {
        return Object.assign(filters, {
          dataEntrada:
            values.dataEntrada &&
            values.dataEntrada?.split("-")?.reverse()?.join("-"),
        });
      }
      if (values[key] || values[key] !== "") {
        Object.assign(filters, { [key]: values[key] });
      }
    });

    filters.sexo === "todos" && delete filters.sexo;

    filters.dataEntrada === "" && delete filters.dataEntrada;

    delete filters.selectedItems;

    const parsedFilters = makeMultiFilterParams({
      ...filters,
    });
    console.log({ values, parsedFilters, filters });
    getData(0, parsedFilters);
    getTotalElements(parsedFilters);
  };

  return (
    <div className={styles.container}>
      <SideBarMenu />
      <div className={styles.content}>
        <Header title="Animais" />
        <div className="div-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="col-md-10">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="identificacao">Microchip ou Anilha</label>
                  <input
                    {...register("identificacao")}
                    type="text"
                    class="form-control"
                    id="identificacao"
                  />
                </div>
                <div class="form-group col-md-3">
                  <label for="origem">Origem</label>
                  <input
                    {...register("origem")}
                    type="text"
                    class="form-control"
                    id="origem"
                  />
                </div>
                <div class="form-group col-md-3">
                  <label for="data-admissao">Data Entrada</label>
                  <input
                    {...register("dataEntrada")}
                    type="date"
                    class="form-control"
                    id="dataEntrada"
                  />
                </div>
                <div class="form-group col-md-3">
                  <label for="sexo">Sexo</label>
                  <select id="sexo" class="form-control" {...register("sexo")}>
                    <option selected value="todos">
                      Todos
                    </option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="nome-cientifico">Nome Científico</label>
                  <input
                    {...register("nomeCientifico")}
                    type="text"
                    class="form-control"
                    id="nomecientifico"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="nome-apelido">Nome Comum</label>
                  <input
                    {...register("nomeComum")}
                    type="text"
                    class="form-control"
                    id="nomeComum"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-2 div-buttons">
              <button
                onClick={() =>
                  reset({
                    nomeComum: "",
                    identificacao: "",
                    dataEntrada: "",
                    nomeCientifico: "",
                    sexo: "",
                    origem: "",
                    selectedItems: setSelectedItems([]),
                  })
                }
                class="btn btn-primary"
              >
                <i class="bi bi-x"></i>LIMPAR
              </button>
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-search"></i>BUSCAR
              </button>
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
              onClick={() => setOpenFormAnimal(true)}
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
