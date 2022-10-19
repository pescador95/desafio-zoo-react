import React, { useEffect, useMemo, useState } from "react";
import { FormAnimal } from "../../components/FormAnimal";
import { Header } from "../../components/Header";
import { MenuLateral } from "../../components/MenuLateral";
import { Table } from "../../components/Table";
import { useAxios } from "../../hooks/useAxios";
import { deleteAnimals, getAnimals } from "../../services/http/animais";
import styles from "./Animals.module.css";
import "./index.css";

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
        <div className="div-form">
          <form>
            <div class="col-md-10">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="microchip-anilha">Microchip ou Anilha</label>
                  <input
                    type="text"
                    class="form-control"
                    id="microchip-anilha"
                  />
                </div>
                <div class="form-group col-md-3">
                  <label for="origem">Origem</label>
                  <input type="text" class="form-control" id="origem" />
                </div>
                <div class="form-group col-md-3">
                  <label for="data-admissao">Data de Admissão</label>
                  <input
                    type="text"
                    class="form-control"
                    id="data-admissao"
                    placeholder="dd/mm/aaaa"
                  />
                </div>
                <div class="form-group col-md-3">
                  <label for="sexo">Sexo</label>
                  <select id="sexo" class="form-control">
                    <option selected value="todos">
                      Todos
                    </option>
                    <option value="macho">Macho</option>
                    <option value="femea">Fêmea</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="nome-cientifico">Nome Científico</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nome-cientifico"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="nome-apelido">Nome ou Apelido</label>
                  <input type="text" class="form-control" id="nome-apelido" />
                </div>
              </div>
            </div>
            <div class="col-md-2 div-buttons">
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-x"></i>LIMPAR
              </button>
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-funnel"></i>FILTROS
              </button>
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-search"></i>BUSCAR
              </button>
            </div>
          </form>
        </div>
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
