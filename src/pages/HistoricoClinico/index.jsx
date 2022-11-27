import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertModal } from "../../components/AlertModal";
import { FormHistoricoClinico } from "../../components/FormHistoricoClinico";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import {
  countHistoricoClinico,
  deleteHistoricoClinicos,
  getHistoricoClinicos,
} from "../../services/http/historicoClinico";
import { makeMultiFilterParams } from "../../utils/multiFilters";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const HistoricoClinico = () => {
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

  const [filter, setFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [updateHistoricoClinico, setUpdateHistoricoClinico] = useState({});

  const [isOpenFormHistoricoClinico, setIsOpenFormHistoricoClinico] =
    useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { register, handleSubmit, reset } = useForm({});

  const { mutate: getHistoricoClinicosMutate, data: historicoClinicos } =
    useMutation(
      ({ page = 0, strgFilter = "" }) => getHistoricoClinicos(page, strgFilter),
      {
        onError: (error) => {
          toast.error(error?.response?.data?.messages?.join(", "));
        },
      }
    );

  const { mutate: getTotalElementsMutate, data: totalElements } = useMutation(
    ({ strgFilter = "" }) => countHistoricoClinico(strgFilter),
    {
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const { mutate: deleteHistoricoClinicosMutate } = useMutation(
    ["deleteHistoricoClinicos"],
    (selectedItems) => deleteHistoricoClinicos(selectedItems),
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
    getHistoricoClinicosMutate({ page, strgFilter });
    getTotalElementsMutate({ strgFilter });
  };

  useEffect(() => getTableData(), []);

  const columns = useMemo(
    () =>
      historicoClinicos
        ? Object.keys(historicoClinicos[0] || {})?.map((key) => ({
            key,
            label: key,
          }))
        : [],
    [historicoClinicos]
  );

  const onDelete = async () => {
    deleteHistoricoClinicosMutate();
  };

  const onEdit = (item) => {
    setUpdateHistoricoClinico(item);
    setIsOpenFormHistoricoClinico(true);
  };

  const onSubmit = async (values) => {
    const filters = {};
    Object.keys(values).forEach((key) => {
      if (key === "dataHistoricoClinico") {
        return Object.assign(filters, {
          dataHistoricoClinico:
            values.dataHistoricoClinico &&
            values.dataHistoricoClinico?.split("-")?.reverse()?.join("-"),
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

    filters.dataHistoricoClinico === "" && delete filters.dataHistoricoClinico;

    delete filters.selectedItems;

    const parsedFilters = makeMultiFilterParams(filters);

    setFilter(parsedFilters);
    getTableData(0, parsedFilters);
  };

  return (
    <Box sx={styles.container}>
      <Header title="Histórico Clínico" />
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
                  component="label"
                  sx={styles.label}
                  htmlFor="data-historico"
                >
                  Data da Amostra
                </Typography>
                <TextField
                  size="small"
                  sx={styles.input}
                  {...register("dataHistoricoClinico")}
                  type="date"
                  id="data-historico"
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
                dataHistoricoClinico: "",
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
          onClick={() => setIsOpenFormHistoricoClinico(true)}
        >
          <span>+</span> CADASTRAR
        </Button>
      </Box>

      <Box sx={styles.table}>
        <Table
          columns={columns}
          data={historicoClinicos}
          onPaginate={(value) => getTableData(value - 1, filter)}
          totalElements={totalElements}
          size={historicoClinicos?.length}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          pages={Math.ceil(totalElements / 10)}
          handleEdit={onEdit}
        />
      </Box>

      <FormHistoricoClinico
        open={isOpenFormHistoricoClinico}
        defaultValues={updateHistoricoClinico}
        onConfirm={() => {
          setIsOpenFormHistoricoClinico(false);
          setUpdateHistoricoClinico({});
          getTableData();
        }}
        onCancel={() => {
          setIsOpenFormHistoricoClinico(false);
          setUpdateHistoricoClinico({});
        }}
      />
      <AlertModal
        open={isOpenDelete}
        onDelete={onDelete}
        onConfirm={() => {
          deleteHistoricoClinicosMutate(selectedItems);
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
//     label: 'Nome Comum'
//   },
//   {
//     key: 'id',
//     label: 'Identificador'
//   }
// ]

//return ({...parsed, nomeUsuario: e?.usuario?.nomeUsuario}); TODO para acessar um atributo do objeto filho

// key:string
