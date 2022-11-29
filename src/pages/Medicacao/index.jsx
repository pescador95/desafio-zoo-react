import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AlertModal } from "../../components/AlertModal";
import { FormMedicacao } from "../../components/FormMedicacao";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import {
  countMedicacao,
  deleteMedicacaos,
  getMedicacaos,
} from "../../services/http/medicacao";
import { makeMultiFilterParams } from "../../utils/multiFilters";

export const Medicacao = () => {
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
  const [updateMedicacao, setUpdateMedicacao] = useState({});

  const [isOpenFormMedicacao, setIsOpenFormMedicacao] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { register, handleSubmit, reset } = useForm({});

  const { mutate: getMedicacaosMutate, data: medicacaos } = useMutation(
    ({ page = 0, strgFilter = "" }) => getMedicacaos(page, strgFilter),
    {
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const { mutate: getTotalElementsMutate, data: totalElements } = useMutation(
    ({ strgFilter = "" }) => countMedicacao(strgFilter),
    {
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const { mutate: deleteMedicacaosMutate } = useMutation(
    ["deleteMedicacaos"],
    (selectedItems) => deleteMedicacaos(selectedItems),
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
    getMedicacaosMutate({ page, strgFilter });
    getTotalElementsMutate({ strgFilter });
  };

  useEffect(() => getTableData(), []);

  const columns = useMemo(
    () =>
      medicacaos
        ? Object.keys(medicacaos[0] || {})?.map((key) => ({
            key,
            label: key,
          }))
        : [],
    [medicacaos]
  );

  const onDelete = async () => {
    deleteMedicacaosMutate();
  };

  const onEdit = (item) => {
    setUpdateMedicacao(item);
    setIsOpenFormMedicacao(true);
  };

  const onSubmit = async (values) => {
    const filters = {};
    Object.keys(values).forEach((key) => {
      if (
        values[key] ||
        values[key] !== "" ||
        values[key] === null ||
        values[key] === undefined
      ) {
        Object.assign(filters, { [key]: values[key] });
      }
    });

    delete filters.selectedItems;

    const parsedFilters = makeMultiFilterParams(filters);

    setFilter(parsedFilters);
    getTableData(0, parsedFilters);
  };

  return (
    <Box sx={styles.container}>
      <Header title="Medicação" />
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
                  htmlFor="nomeMedicacao"
                >
                  Nome da Medicação
                </Typography>
                <TextField
                  size="small"
                  sx={styles.input}
                  {...register("nomeMedicacao")}
                  id="nomeMedicacao"
                  type="text"
                />
              </Box>
            </Box>

            <Box sx={styles.inputContainer}>
              <Typography
                component="label"
                htmlFor="posologia"
                sx={styles.label}
              >
                Posologia
              </Typography>
              <TextField
                size="small"
                sx={styles.input}
                {...register("posologia")}
                type="text"
                id="posologia"
              />
            </Box>
          </Box>
          <Box sx={styles.inputsContainer}>
            <Box sx={styles.inputContainer}>
              <Typography
                sx={styles.label}
                component="label"
                htmlFor="frequencia"
              >
                Frequência
              </Typography>
              <TextField
                size="small"
                sx={styles.input}
                {...register("frequencia")}
                type="text"
                id="frequencia"
              />
            </Box>
            <Box sx={styles.inputContainer}>
              <Typography
                component="label"
                htmlFor="via-administracao"
                sx={styles.label}
              >
                Via Administração
              </Typography>
              <TextField
                size="small"
                sx={styles.input}
                {...register("viaAdministracao")}
                type="text"
                id="via-administracao"
              />
            </Box>
          </Box>
        </Box>

        <Box sx={styles.actions}>
          <Button
            variant="contained"
            onClick={() =>
              reset({
                viaAdministracao: "",
                dataEntrada: "",
                posologia: "",
                sexo: "",
                origem: "",
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
          onClick={() => setIsOpenFormMedicacao(true)}
        >
          <AddIcon sx={styles.icon} />
          CADASTRAR
        </Button>
      </Box>

      <Box sx={styles.table}>
        <Table
          columns={columns}
          data={medicacaos}
          onPaginate={(value) => getTableData(value - 1, filter)}
          totalElements={totalElements}
          size={medicacaos?.length}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          pages={Math.ceil(totalElements / 10)}
          handleEdit={onEdit}
        />
      </Box>

      <FormMedicacao
        open={isOpenFormMedicacao}
        defaultValues={updateMedicacao}
        onConfirm={() => {
          setIsOpenFormMedicacao(false);
          setUpdateMedicacao({});
          getTableData();
        }}
        onCancel={() => {
          setIsOpenFormMedicacao(false);
          setUpdateMedicacao({});
        }}
      />
      <AlertModal
        open={isOpenDelete}
        onDelete={onDelete}
        onConfirm={() => {
          deleteMedicacaosMutate(selectedItems);
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
