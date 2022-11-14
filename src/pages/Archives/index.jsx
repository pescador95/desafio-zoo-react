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
import styles from "./Archives.module.css";
import "./index.css";

export const Arquivos = () => {
  const axios = useAxios();

  const [selectedItems, setSelectedItems] = useState([]);
  const [updateArquivo, setUpdateArquivo] = useState({});
  const [openFormArquivo, setOpenFormArquivo] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [arquivos, setArquivos] = useState({
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
    setArquivos((prev) => ({ ...prev, data, size: data?.length }));
  };

  const getTotalElements = async (stringFilter = "") => {
    const response = await countAnimal(stringFilter);
    setArquivos((prev) => ({ ...prev, totalElements: response }));
    console.log(setArquivos((prev) => ({ ...prev, totalElements: response })));
  };

  const columns = useMemo(
    () =>
      arquivos?.data?.length
        ? Object.keys(arquivos?.data[0])?.map((key) => ({
            key,
            label: key,
          }))
        : [],
    [arquivos]
  );

  const handleDelete = async () => {
    await deleteAnimals(selectedItems);
    await getData();
    await getTotalElements();
  };

  const handleEdit = (item) => {
    setUpdateArquivo(item);
    setOpenFormArquivo(true);
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
      if (key === "animal") {
        return Object.assign(filters, {
          animal:
            values.animal && values.animal?.split("-")?.reverse()?.join("-"),
        });
      }
      if (values[key] || values[key] !== "") {
        Object.assign(filters, { [key]: values[key] });
      }
    });

    filters.tipo === "todos" && delete filters.tipo;

    filters.animal === "" && delete filters.animal;

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
        <Header title="Arquivos" />
        <div className="div-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="col-md-10">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="nomeArquivo">Nome do arquivo</label>
                  <input
                    {...register("nomeArquivo")}
                    type="text"
                    class="form-control"
                    id="nomeArquivo"
                  />
                </div>

                <div class="form-group col-md-3">
                  <label for="upload">Data Upload</label>
                  <input
                    {...register("upload")}
                    type="date"
                    class="form-control"
                    id="upload"
                  />
                </div>
                <div class="form-group col-md-3">
                  <label for="tipo">Tipo</label>
                  <select id="tipo" class="form-control" {...register("tipo")}>
                    <option selected value="todos">
                      Todos
                    </option>
                    <option value="animais">Animais</option>
                    <option value="enriquecimento-ambiental">
                      Enriquecimento ambiental
                    </option>
                    <option value="nutricao">Nutrição</option>
                    <option value="historico-etologico">
                      Histórico etológico
                    </option>
                    <option value="sinais-vitais">Sinais vitais</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="animal">Animal</label>
                  <select
                    id="animal"
                    class="form-control"
                    {...register("animal")}
                  >
                    <option selected value="todos">
                      Todos
                    </option>
                    <option value="animais">Animais</option>
                    <option value="enriquecimento-ambiental">
                      Enriquecimento ambiental
                    </option>
                    <option value="nutricao">Nutrição</option>
                    <option value="historico-etologico">
                      Histórico etológico
                    </option>
                    <option value="sinais-vitais">Sinais vitais</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-2 div-buttons">
              <button
                onClick={() =>
                  reset({
                    nomeArquivo: "",
                    animal: "",
                    tipo: "",
                    upload: "",
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
            {arquivos?.data?.length ? (
              <Table
                columns={columns}
                data={arquivos?.data}
                onPaginate={(value) => getData(value - 1)}
                totalElements={arquivos?.totalElements}
                size={arquivos?.size}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                pages={Math.ceil(arquivos?.totalElements / arquivos?.size)}
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
              onClick={() => setOpenFormArquivo(true)}
            >
              <span>+</span> CADASTRAR
            </button>
          </div>
        </div>

        <FormAnimal
          open={openFormArquivo}
          handleClose={() => {
            setOpenFormArquivo(false);
            setUpdateArquivo();
          }}
          defaultValues={updateArquivo}
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
