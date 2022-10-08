import React, { useEffect, useMemo, useState } from "react";
import { FormAnimal } from "../../components/FormAnimal";
import { Header } from "../../components/Header";
import { MenuLateral } from "../../components/MenuLateral";
import { Table } from "../../components/Table";
import { useAxios } from "../../hooks/useAxios";
import { deleteAnimals, getAnimals } from "../../services/http/animais";
import styles from "./Animals.module.css";

export const Animais = () => {
  const axios = useAxios();

  const [selectedItems, setSelectedItems] = useState([]);
  const [updateAnimal, setUpdateAnimal] = useState({});
  const [open, setOpen] = useState(false);
  const [animais, setAnimais] = useState({
    data: [],
    totalElements: 0,
    size: 0,
  });

  useEffect(() => {
    getData();
    getTotalElements();
  }, []);

  const getData = async (page = 0) => {
    const data = await getAnimals(page);
    setAnimais((prev) => ({ ...prev, data, size: data?.length }));
  };

  const getTotalElements = async () => {
    const response = await axios.get("/animal/count");
    setAnimais((prev) => ({ ...prev, totalElements: response?.data }));
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
    setOpen(true);
  };

  return (
    <div className={styles.container}>
      <MenuLateral />
      <div className={styles.content}>
        <Header title="animais" />
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
              onClick={() => handleDelete(selectedItems)}
              disabled={!selectedItems?.length}
            >
              Excluir {selectedItems?.length || ""} registros
            </button>

            <button className={styles.add} onClick={() => setOpen(true)}>
              <span>+</span> CADASTRAR
            </button>
          </div>
        </div>

        <FormAnimal
          open={open}
          handleClose={() => {
            setOpen(false);
            setUpdateAnimal();
          }}
          defaultValues={updateAnimal}
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
