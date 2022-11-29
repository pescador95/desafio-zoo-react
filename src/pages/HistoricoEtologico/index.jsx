import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AlertModal } from "../../components/AlertModal";
import { FormHistoricoEtologico } from "../../components/FormHistoricoEtologico";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import {
  countHistoricoEtologico,
  deleteHistoricoEtologicos,
  getHistoricoEtologicos,
} from "../../services/http/historicoEtologico";
import { makeMultiFilterParams } from "../../utils/multiFilters";

export const HistoricoEtologico = () => {
  const styles = {
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
      background: "#f54242",
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

  const [filter, setFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [updateHistoricoEtologico, setUpdateHistoricoEtologico] = useState({});

  const [isOpenFormHistoricoEtologico, setIsOpenFormHistoricoEtologico] =
    useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { register, handleSubmit, reset } = useForm({});

  const { mutate: getHistoricoEtologicosMutate, data: historicoEtologicos } =
    useMutation(
      ({ page = 0, strgFilter = "" }) =>
        getHistoricoEtologicos(page, strgFilter),
      {
        onError: (error) => {
          toast.error(error?.response?.data?.messages?.join(", "));
        },
      }
    );

  const { mutate: getTotalElementsMutate, data: totalElements } = useMutation(
    ({ strgFilter = "" }) => countHistoricoEtologico(strgFilter),
    {
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const { mutate: deleteHistoricoEtologicosMutate } = useMutation(
    ["deleteHistoricoEtologicos"],
    (selectedItems) => deleteHistoricoEtologicos(selectedItems),
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
    getHistoricoEtologicosMutate({ page, strgFilter });
    getTotalElementsMutate({ strgFilter });
  };

  useEffect(() => getTableData(), []);

  const columns = useMemo(
    () =>
      historicoEtologicos
        ? Object.keys(historicoEtologicos[0] || {})?.map((key) => ({
            key,
            label: key,
          }))
        : [],
    [historicoEtologicos]
  );

  const onDelete = async () => {
    deleteHistoricoEtologicosMutate();
  };

  const onEdit = (item) => {
    setUpdateHistoricoEtologico(item);
    setIsOpenFormHistoricoEtologico(true);
  };

  const onSubmit = async (values) => {
    const filters = {};
    Object.keys(values).forEach((key) => {
      if (key === "dataEtologico") {
        return Object.assign(filters, {
          dataEtologico:
            values.dataEtologico &&
            values.dataEtologico?.split("-")?.reverse()?.join("-"),
        });
      }
      if (
        values[key] ||
        values[key] !== "" ||
        values[key] === null ||
        values[key] === undefined
      ) {
        Object.assign(filters, { [key]: values[key] });
      }
    });

    filters.dataEtologico === "" && delete filters.dataEtologico;

    delete filters.selectedItems;

    const parsedFilters = makeMultiFilterParams(filters);

    setFilter(parsedFilters);
    getTableData(0, parsedFilters);
  };

  return (
    <Box sx={styles.container}>
      <Header title="Historico Etológico" />
      <Box
        component="form"
        sx={styles.formContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={styles.inputs}>
          <Box sx={styles.inputsContainer}>
            <Box sx={styles.inputSeparator}>
              <Box sx={styles.inputContainer}>
                <Typography
                  component="label"
                  sx={styles.label}
                  htmlFor="nome-animal"
                >
                  Nome do Animal
                </Typography>
                <TextField
                  size="small"
                  sx={styles.input}
                  {...register("nomeAnimal")}
                  id="nome-animal"
                  type="text"
                />
              </Box>

              <Box sx={styles.inputContainer}>
                <Typography
                  sx={styles.label}
                  component="label"
                  htmlFor="nome-etologico"
                >
                  Nome Etologico
                </Typography>
                <TextField
                  size="small"
                  sx={styles.input}
                  {...register("nomeEtologico")}
                  type="text"
                  id="nome-etologico"
                />
              </Box>

              <Box sx={styles.inputContainer}>
                <Typography
                  component="label"
                  sx={styles.label}
                  htmlFor="data-etologico"
                >
                  Data Etologico
                </Typography>
                <TextField
                  size="small"
                  sx={styles.input}
                  {...register("dataEtologico")}
                  type="date"
                  id="data-etologico"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={styles.actions}>
          <Button
            variant="contained"
            onClick={() =>
              reset({
                nomeAnimal: "",
                nomeEtologico: "",
                dataEtologico: "",
                selectedItems: setSelectedItems([]),
              })
            }
            sx={styles.filterButton}
          >
            <ClearIcon sx={styles.icon} /> LIMPAR
          </Button>
          <Button variant="contained" type="submit" sx={styles.filterButton}>
            <SearchIcon sx={styles.icon} />
            BUSCAR
          </Button>
        </Box>
      </Box>

      <Box sx={styles.actionsTable}>
        <Button
          sx={styles.excludeRegister}
          onClick={() => setIsOpenDelete(true)}
          disabled={!selectedItems?.length}
        >
          Excluir {selectedItems?.length || ""} registros
        </Button>

        <Button
          sx={styles.addRegister}
          onClick={() => setIsOpenFormHistoricoEtologico(true)}
        >
          <AddIcon sx={styles.icon} />
          CADASTRAR
        </Button>
      </Box>

      <Box sx={styles.table}>
        <Table
          columns={columns}
          data={historicoEtologicos}
          onPaginate={(value) => getTableData(value - 1, filter)}
          totalElements={totalElements}
          size={historicoEtologicos?.length}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          pages={Math.ceil(totalElements / 10)}
          handleEdit={onEdit}
        />
      </Box>

      <FormHistoricoEtologico
        open={isOpenFormHistoricoEtologico}
        defaultValues={updateHistoricoEtologico}
        onConfirm={() => {
          setIsOpenFormHistoricoEtologico(false);
          setUpdateHistoricoEtologico({});
          getTableData();
        }}
        onCancel={() => {
          setIsOpenFormHistoricoEtologico(false);
          setUpdateHistoricoEtologico({});
        }}
      />
      <AlertModal
        open={isOpenDelete}
        onDelete={onDelete}
        onConfirm={() => {
          deleteHistoricoEtologicosMutate(selectedItems);
          setIsOpenDelete(false);
          getTableData();
        }}
        onCancel={() => {
          setIsOpenDelete(false);
        }}
      />
    </Box>
  );
};

//TODO forma de pegar manualmente somente as colunas que desejar
// const column = [
//   {
//     key: 'nomeComum',
//     label: 'Nome do Animal'
//   },
//   {
//     key: 'id',
//     label: 'Identificador'
//   }
// ]

//return ({...parsed, nomeUsuario: e?.usuario?.nomeUsuario}); TODO para acessar um atributo do objeto filho

// key:string
