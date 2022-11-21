import { Box, Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertModal } from "../../components/AlertModal";
import { FormUsuario } from "../../components/FormUsuario";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import { useAxios } from "../../hooks/useAxios";
import {
  countUser,
  deleteUsers,
  getMyProfile,
  getUsers,
} from "../../services/http/users";
import { makeMultiFilterParams } from "../../utils/multiFilters";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Typography } from "@mui/material";

export const Usuarios = () => {
  const style = {
    container: {
      padding: "1rem",
    },
    formContainer: {
      background: "#43A047",
      borderRadius: "1rem",
      margin: "1rem 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      padding: "1rem",
      flexDirection: {
        xs: "column",
        sm: "column",
        md: "column",
        lg: "column",
        xl: "row",
      },
      gap: "1rem",
    },
    inputs: {
      width: {
        xs: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "80%",
      },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      flexDirection: {
        xs: "column",
        sm: "column",
        md: "column",
        lg: "column",
        xl: "row",
      },
    },
    actions: {
      width: {
        xs: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "20%",
      },
      gap: "1rem",
      display: "flex",
      flexDirection: {
        xs: "row",
        sm: "row",
        md: "row",
        lg: "row",
        xl: "column",
      },
      marginTop: "1.5rem",
      justifyContent: "space-between",
    },
    inputsContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    inputSeparator: {
      width: "100%",
      display: "flex",
      gap: "1rem",
      flexDirection: {
        xs: "column",
        sm: "row",
        md: "row",
        lg: "row",
        xl: "row",
      },
    },
    label: {
      color: "white",
    },
    input: {
      background: "#AEFFB2",
      border: "none",
      borderRadius: "0.5rem",
    },
    inputContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    filterButton: {
      width: "100%",
      maxWidth: "100%",
      height: "2.5rem",
      background: "#FB8C00",
      transition: "0.2s",
      "&:hover": {
        background: "#FB8C00",
        filter: "brightness(0.8)",
      },
      display: "flex",
      gap: "0.5rem",
    },
    table: {
      width: "100%",
    },
    icon: {
      display: {
        xs: "none",
        sm: "block",
        md: "block",
        lg: "block",
        xl: "block",
      },
    },
    actionsTable: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "1rem 0",
      gap: "0.5rem",
    },
    addRegister: {
      color: "#fff",
      width: "100%",
      maxWidth: "12rem",
      height: "2.5rem",
      background: "#FB8C00",
      transition: "0.2s",
      "&:hover": {
        background: "#FB8C00",
        filter: "brightness(0.8)",
      },
      display: "flex",
      gap: "0.5rem",
    },
    excludeRegister: {
      color: "#fff",
      width: "100%",
      maxWidth: "12rem",
      height: "2.5rem",
      background: "#ff7878",
      transition: "0.2s",
      "&:hover": {
        background: "#ff7878",
        filter: "brightness(0.8)",
      },
      "&:disabled": {
        background: "#ffb1b1",
        color: "#fff",
        filter: "brightness(1)",
        cursor: "not-allowed",
      },
      display: "flex",
      gap: "0.5rem",
    },
  };

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
    getData(0, parsedFilters);
    getTotalElements(parsedFilters);
  };

  return (
    <Box sx={style.container}>
      <Header title="Usuários" />
      <Box
        component="form"
        sx={style.formContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={style.inputs}>
          <Box sx={style.inputsContainer}>
            <Box sx={style.inputSeparator}>
              <Box sx={style.inputContainer}>
                <Typography component="label" sx={style.label} htmlFor="name">
                  Nome
                </Typography>
                <TextField
                  size="small"
                  sx={style.input}
                  {...register("nome")}
                  id="nome"
                  type="text"
                />
              </Box>

              <Box sx={style.inputContainer}>
                <Typography
                  sx={style.label}
                  component="label"
                  htmlFor="roleusuario"
                >
                  Função
                </Typography>
                <TextField
                  size="small"
                  sx={style.input}
                  {...register("roleusuario")}
                  type="text"
                  id="roleusuario"
                />
              </Box>
            </Box>

            <Box sx={style.inputContainer}>
              <Typography component="label" htmlFor="email" sx={style.label}>
                Email
              </Typography>
              <TextField
                size="small"
                sx={style.input}
                {...register("email")}
                type="text"
                id="nome-cientifico"
              />
            </Box>
          </Box>
        </Box>

        <Box sx={style.actions}>
          <Button
            variant="contained"
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
            sx={style.filterButton}
          >
            <ClearIcon sx={style.icon} /> LIMPAR
          </Button>
          <Button variant="contained" type="submit" sx={style.filterButton}>
            <SearchIcon sx={style.icon} />
            BUSCAR
          </Button>
        </Box>
      </Box>

      <Box sx={style.actionsTable}>
        <Button
          sx={style.excludeRegister}
          onClick={() => setOpenAlertModal(true)}
          disabled={!selectedItems?.length}
        >
          Excluir {selectedItems?.length || ""} registros
        </Button>

        <Button sx={style.addRegister} onClick={() => setOpenFormUsuario(true)}>
          <span>+</span> CADASTRAR
        </Button>
      </Box>

      <div className={style.table}>
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
    </Box>
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
