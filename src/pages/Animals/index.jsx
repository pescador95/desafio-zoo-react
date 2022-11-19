import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertModal } from "../../components/AlertModal";
import { FormAnimal } from "../../components/FormAnimal";
import { Header } from "../../components/Header";
import { SideBarMenu } from "../../components/SideBarMenu";
import { Table } from "../../components/Table";
import { useAxios } from "../../hooks/useAxios";
import { useToast } from "../../hooks/useToast";
import {
  countAnimal,
  deleteAnimals,
  getAnimals
} from "../../services/http/animais";
import { makeMultiFilterParams } from "../../utils/multiFilters";
import styles from "./Animals.module.css";

export const Animais = () => {
  const style = {
    container: {
      padding: '1rem',
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
      gap: "2rem",
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
      height: "3.5rem",
      background: "#FB8C00",
      transition: '0.2s',
      "&:hover": {
         background: "#FB8C00",
        filter: "brightness(0.8)",
      },
    },
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const [updateAnimal, setUpdateAnimal] = useState({});
  const [openFormAnimal, setOpenFormAnimal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [animais, setAnimais] = useState({
    data: [],
    totalElements: 0,
    size: 0,
  });
  const { openToast } = useToast();

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
    const response = await deleteAnimals(selectedItems);
    if (response?.status !== 500) {
      openToast(response.message, "success");
    } else {
      openToast(response, "error");
    }
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
    getData(0, parsedFilters);
    getTotalElements(parsedFilters);
  };

  return (
    <Box sx={style.container}>
        <Header title="Animais" />
        <Box
          component="form"
          sx={style.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={style.inputs}>
            <Box sx={style.inputsContainer}>
              <Box sx={style.inputSeparator}>
                <Box sx={style.inputContainer}>
                  <Typography component="label" sx={style.label} htmlFor="identificacao">
                    Microchip ou Anilha
                  </Typography>
                  <TextField
                    sx={style.input}
                    {...register("identificacao")}
                    id="identificacao"
                    type="text"
                  />
                </Box>

                <Box sx={style.inputContainer}>
                  <Typography
                    sx={style.label}
                    component="label"
                    htmlFor="origem"
                  >
                    Origem
                  </Typography>
                  <TextField
                    sx={style.input}
                    {...register("origem")}
                    type="text"
                    id="origem"
                  />
                </Box>
              </Box>

              <Box sx={style.inputContainer}>
                <Typography component="label" htmlFor="nome-cientifico" sx={style.label}>
                  Nome Científico
                </Typography>
                <TextField
                  sx={style.input}
                  {...register("nomeCientifico")}
                  type="text"
                  id="nome-cientifico"
                />
              </Box>
            </Box>
            <Box sx={style.inputsContainer}>
              <Box sx={style.inputSeparator}>
                <Box sx={style.inputContainer}>
                  <Typography component="label" sx={style.label} htmlFor="data-admissao">
                    Data Entrada
                  </Typography>
                  <TextField
                    sx={style.input}
                    {...register("dataEntrada")}
                    type="date"
                    id="data-admissao"
                  />
                </Box>

                <Box sx={style.inputContainer}>
                  <Typography component="label" htmlFor="sexo" sx={style.label}>
                    Sexo
                  </Typography>
                  <Select
                    sx={style.input}
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

              <Box sx={style.inputContainer}>
                <Typography component="label" htmlFor="nome-apelido" sx={style.label}>
                  Nome Comum
                </Typography>
                <TextField
                  sx={style.input}
                  {...register("nomeComum")}
                  type="text"
                  id="nome-apelido"
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
              <i className="bi bi-x"></i>LIMPAR
            </Button>
            <Button variant="contained" type="submit" sx={style.filterButton}>
              <i className="bi bi-search"></i>BUSCAR
            </Button>
          </Box>
        </Box>
        <div className={styles.table}>
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
