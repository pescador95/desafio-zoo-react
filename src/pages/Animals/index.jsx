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
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertModal } from "../../components/AlertModal";
import { FormAnimal } from "../../components/FormAnimal";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import {
  countAnimal,
  deleteAnimals,
  getAnimals,
} from "../../services/http/animais";
import { makeMultiFilterParams } from "../../utils/multiFilters";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const Animais = () => {
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
  const [updateAnimal, setUpdateAnimal] = useState({});

  const [isOpenFormAnimal, setIsOpenFormAnimal] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { register, handleSubmit, reset } = useForm({});

  const { mutate: getAnimalsMutate, data: animals } = useMutation(
    ({ page = 0, strgFilter = "" }) => getAnimals(page, strgFilter),
    {
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const { mutate: getTotalElementsMutate, data: totalElements } = useMutation(
    ({ strgFilter = "" }) => countAnimal(strgFilter),
    {
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const { mutate: deleteAnimalsMutate } = useMutation(
    () => deleteAnimals(selectedItems),
    {
      onSuccess: () => {
        toast.success("Animais excluídos com sucesso!");
        getTableData();
        setSelectedItems([]);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.messages?.join(", "));
      },
    }
  );

  const getTableData = (page = 0, strgFilter = "") => {
    getAnimalsMutate({ page, strgFilter });
    getTotalElementsMutate({ strgFilter });
  };

  useEffect(() => getTableData(), []);

  const columns = useMemo(
    () =>
      animals
        ? Object.keys(animals[0])?.map((key) => ({
            key,
            label: key,
          }))
        : [],
    [animals]
  );

  const onDelete = async () => {
    deleteAnimalsMutate();
  };

  const onEdit = (item) => {
    setUpdateAnimal(item);
    setIsOpenFormAnimal(true);
  };

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

    const parsedFilters = makeMultiFilterParams(filters);

    setFilter(parsedFilters);
    getTableData(0, parsedFilters);
  };

  return (
    <Box sx={styles.container}>
      <Header title="Animais" />
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
                  htmlFor="identificacao"
                >
                  Microchip ou Anilha
                </Typography>
                <TextField
                  size="small"
                  sx={styles.input}
                  {...register("identificacao")}
                  id="identificacao"
                  type="text"
                />
              </Box>

              <Box sx={styles.inputContainer}>
                <Typography
                  sx={styles.label}
                  component="label"
                  htmlFor="origem"
                >
                  Origem
                </Typography>
                <TextField
                  size="small"
                  sx={styles.input}
                  {...register("origem")}
                  type="text"
                  id="origem"
                />
              </Box>
            </Box>

            <Box sx={styles.inputContainer}>
              <Typography
                component="label"
                htmlFor="nome-cientifico"
                sx={styles.label}
              >
                Nome Científico
              </Typography>
              <TextField
                size="small"
                sx={styles.input}
                {...register("nomeCientifico")}
                type="text"
                id="nome-cientifico"
              />
            </Box>
          </Box>
          <Box sx={styles.inputsContainer}>
            <Box sx={styles.inputSeparator}>
              <Box sx={styles.inputContainer}>
                <Typography
                  component="label"
                  sx={styles.label}
                  htmlFor="data-admissao"
                >
                  Data Entrada
                </Typography>
                <TextField
                  size="small"
                  sx={styles.input}
                  {...register("dataEntrada")}
                  type="date"
                  id="data-admissao"
                />
              </Box>

              <Box sx={styles.inputContainer}>
                <Typography component="label" htmlFor="sexo" sx={styles.label}>
                  Sexo
                </Typography>
                <Select
                  size="small"
                  sx={styles.input}
                  {...register("sexo")}
                  type="text"
                  id="sexo"
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="Macho">Macho</MenuItem>
                  <MenuItem value="Fêmea">Fêmea</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box sx={styles.inputContainer}>
              <Typography
                component="label"
                htmlFor="nome-apelido"
                sx={styles.label}
              >
                Nome Comum
              </Typography>
              <TextField
                size="small"
                sx={styles.input}
                {...register("nomeComum")}
                type="text"
                id="nome-apelido"
              />
            </Box>
          </Box>
        </Box>

        <Box sx={styles.actions}>
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
          onClick={() => setIsOpenFormAnimal(true)}
        >
          <span>+</span> CADASTRAR
        </Button>
      </Box>

      <Box sx={styles.table}>
        <Table
          columns={columns}
          data={animals}
          onPaginate={(value) => getTableData(value - 1, filter)}
          totalElements={totalElements}
          size={animals?.length}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          pages={Math.ceil(totalElements / 10)}
          handleEdit={onEdit}
        />
      </Box>

      <FormAnimal
        open={isOpenFormAnimal}
        defaultValues={updateAnimal}
        onConfirm={() => {
          setIsOpenFormAnimal(false);
          setUpdateAnimal({});
          getTableData();
        }}
        onCancel={() => {
          setIsOpenFormAnimal(false);
          setUpdateAnimal({});
        }}
      />
      <AlertModal
        open={isOpenDelete}
        onDelete={onDelete}
        onConfirm={() => {
          deleteAnimalsMutate(selectedItems);
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
