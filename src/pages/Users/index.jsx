import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertModal } from "../../components/AlertModal";
import { FormUsuario } from "../../components/FormUsuario";
import { Header } from "../../components/Header";
import { SideBarMenu } from "../../components/SideBarMenu";
import { Table } from "../../components/Table";
import { useAxios } from "../../hooks/useAxios";
import {
  deleteUsers,
  getUsers,
  countUser,
  getMyProfile,
} from "../../services/http/users";
import { makeMultiFilterParams } from "../../utils/multiFilters";
import styles from "./Users.module.css";
import "./index.css";

export const Usuarios = () => {
  const axios = useAxios();

  const [selectedItems, setSelectedItems] = useState([]);
  const [updateUsuario, setUpdateUsuario] = useState({});
  const [openFormUsuario, setOpenFormUsuario] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [usuarios, setUsuarios] = useState({
    data: [],
    totalElements: 0,
    size: 0,
  });

  useEffect(() => {
    getData();
    getTotalElements();
  }, []);

  const getData = async (page = 0, strgFilter = "") => {
    const data = await getUsers(page, strgFilter);
    setUsuarios((prev) => ({ ...prev, data, size: data?.length }));
  };

  const getMyUser = async () => {
    const data = await getMyProfile();
    setUsuarios((prev) => ({ ...prev, data }));
  };

  const getTotalElements = async (stringFilter = "") => {
    const response = await countUser(stringFilter);
    setUsuarios((prev) => ({ ...prev, totalElements: response }));
    console.log(setUsuarios((prev) => ({ ...prev, totalElements: response })));
  };

  const columns = useMemo(
    () =>
      usuarios?.data?.length
        ? Object.keys(usuarios?.data[0])?.map((key) => ({
            key,
            label: key,
          }))
        : [],
    [usuarios]
  );

  const handleDelete = async () => {
    await deleteUsers(selectedItems);
    await getData();
    await getTotalElements();
  };

  const handleEdit = (item) => {
    setUpdateUsuario(item);
    setOpenFormUsuario(true);
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
        <Header title="Usuários" />
        <div className="div-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="col-md-10">
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="nome">Nome</label>
                  <input
                    {...register("nome")}
                    type="text"
                    class="form-control"
                    id="nome"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="roleusuario">Função</label>
                  <input
                    {...register("roleusuario")}
                    type="text"
                    class="form-control"
                    id="roleusuario"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-8">
                  <label for="email">Email</label>
                  <input
                    {...register("email")}
                    type="text"
                    class="form-control"
                    id="email"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-2 div-buttons">
              <button
                onClick={() =>
                  reset({
                    nome: "",
                    email: "",
                    roleusuario: "",
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
            {usuarios?.data?.length ? (
              <Table
                columns={columns}
                data={usuarios?.data}
                onPaginate={(value) => getData(value - 1)}
                totalElements={usuarios?.totalElements}
                size={usuarios?.size}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                pages={Math.ceil(usuarios?.totalElements / usuarios?.size)}
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
              onClick={() => setOpenFormUsuario(true)}
            >
              <span>+</span> CADASTRAR
            </button>
          </div>
        </div>

        <FormUsuario
          open={openFormUsuario}
          handleClose={() => {
            setOpenFormUsuario(false);
            setUpdateUsuario();
          }}
          defaultValues={updateUsuario}
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
