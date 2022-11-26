import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertModal } from "../../components/AlertModal";
import { FormUpload } from "../../components/FormUpload";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import { useAxios } from "../../hooks/useAxios";
import {
  countUpload,
  deleteUploads,
  getUploads,
} from "../../services/http/uploads";
import { makeMultiFilterParams } from "../../utils/multiFilters";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const Arquivos = () => {
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

  const { register, handleSubmit, reset } = useForm({});
  const [filter, setFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [updateArquivo, setUpdateArquivo] = useState({});
  const [openFormArquivo, setOpenFormArquivo] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [arquivos, setArquivos] = useState({
    data: [],
    totalElements: 0,
    size: 0,
  });

  useEffect(() => getTableData(), []);

  const onDelete = async () => {
    deleteUploadsMutate(selectedItems);
  };

  const { mutate: getUploadMutate, data: uploads } = useMutation(
    ({ page = 0, strgFilter = "" }) => getUploads(page, strgFilter),
    {
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const { mutate: getTotalElementsMutate, data: totalElements } = useMutation(
    ({ strgFilter = "" }) => countUpload(strgFilter),
    {
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const { mutate: deleteUploadsMutate } = useMutation(
    ["deleteUploads"],
    (selectedItems) => deleteUploads(selectedItems),
    {
      onSuccess: (data) => {
        toast.success(data?.messages?.join(", "));
        getTableData();
        setSelectedItems([]);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const getTableData = (page = 0, strgFilter = "") => {
    getUploadMutate({ page, strgFilter });
    getTotalElementsMutate({ strgFilter });
  };

  const columns = useMemo(
    () =>
      arquivos?.data?.length
        ? Object.keys(arquivos?.data[0] || {})?.map((key) => ({
            key,
            label: key,
          }))
        : [],
    [arquivos]
  );

  const handleEdit = (item) => {
    setUpdateArquivo(item);
    setOpenFormArquivo(true);
  };

  const onSubmit = async (values) => {
    const filters = {};
    Object.keys(values).forEach((key) => {
      if (key === "upload") {
        return Object.assign(filters, {
          upload:
            values.upload && values.upload?.split("-")?.reverse()?.join("-"),
        });
      }
      if (values[key] || values[key] !== "") {
        Object.assign(filters, { [key]: values[key] });
      }
    });

    filters.tipo === "todos" && delete filters.tipo;

    filters.upload === "" && delete filters.upload;

    delete filters.selectedItems;

    const parsedFilters = makeMultiFilterParams({
      ...filters,
    });
    setFilter(parsedFilters);
    getTableData(0, parsedFilters);
  };

  return (
    <Box sx={style.container}>
      <Header title="Arquivos" />
      <Box
        component="form"
        sx={style.formContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={style.inputs}>
          <Box sx={style.inputsContainer}>
            <Box sx={style.inputSeparator}>
              <Box sx={style.inputContainer}>
                <Typography
                  component="label"
                  sx={style.label}
                  htmlFor="nomeArquivo"
                >
                  Nome do arquivo
                </Typography>
                <TextField
                  size="small"
                  sx={style.input}
                  {...register("nomeArquivo")}
                  id="nomeArquivo"
                  type="text"
                />
              </Box>

              <Box sx={style.inputContainer}>
                <Typography sx={style.label} component="label" htmlFor="upload">
                  Data Upload
                </Typography>
                <TextField
                  size="small"
                  sx={style.input}
                  {...register("upload")}
                  type="date"
                  id="upload"
                />
              </Box>
              <Box sx={style.inputContainer}>
                <Typography component="label" htmlFor="tipo" sx={style.label}>
                  Tipo
                </Typography>
                <Select
                  size="small"
                  sx={style.input}
                  {...register("tipo")}
                  type="text"
                  id="tipo"
                >
                  <MenuItem value="uploads">Uploads</MenuItem>
                  <MenuItem value="enriquecimento-ambiental">
                    Enriquecimento ambiental
                  </MenuItem>
                  <MenuItem value="historico-etologico">
                    Histórico etológico
                  </MenuItem>
                  <MenuItem value="sinais-vitais">Sinais vitais</MenuItem>
                  <MenuItem value="outros">Outros</MenuItem>
                </Select>
              </Box>
              <Box sx={style.inputContainer}>
                <Typography component="label" htmlFor="tipo" sx={style.label}>
                  Upload
                </Typography>
                <Select
                  size="small"
                  sx={style.input}
                  {...register("tipo")}
                  type="text"
                  id="tipo"
                >
                  <MenuItem value="uploads">Uploads</MenuItem>
                  <MenuItem value="enriquecimento-ambiental">
                    Enriquecimento ambiental
                  </MenuItem>
                  <MenuItem value="historico-etologico">
                    Histórico etológico
                  </MenuItem>
                  <MenuItem value="sinais-vitais">Sinais vitais</MenuItem>
                  <MenuItem value="outros">Outros</MenuItem>
                </Select>
              </Box>
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

        <Button sx={style.addRegister} onClick={() => openFormArquivo(true)}>
          <span>+</span> CADASTRAR
        </Button>
      </Box>

      <div className={style.table}>
        <div>
          {arquivos?.data?.length ? (
            <Table
              columns={columns}
              data={arquivos?.data}
              onPaginate={(value) => getTableData(value - 1, filter)}
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
      </div>

      <FormUpload
        open={openFormArquivo}
        handleClose={() => {
          setOpenFormArquivo(false);
          setUpdateArquivo();
        }}
        defaultValues={updateArquivo}
      />
      <AlertModal
        open={openAlertModal}
        onDelete={onDelete}
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
