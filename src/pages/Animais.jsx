import React, { useEffect, useState, useMemo } from "react";
import "../styles/Animais.css";
import { useAxios } from "../hooks/useAxios";
import { MenuLateral } from "../components/MenuLateral";
import { Header } from "../components/Header";
import { Table } from "../components/Table";
import { FormAnimal } from "../components/FormAnimal";

export const Animais = () => {
  const [animais, setAnimais] = useState([]);
  const [open, setOpen] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    getData(0);
  }, []);
<<<<<<< HEAD

  const countPage = () => {
    axios.get(`/animals/count`).then((response) => {
      const { count } = response.data;
      const pages = Math.ceil(count / 20);
      return pages;
    });
  };

  const getData = (value) => {
    axios
      .get("/animal/", {
        params: {
          page: value,
        },
      })
      .then((res) => {
        const parsed = res?.data?.map((e) => {
          const parsed = e;
          delete parsed?.id;
          delete parsed?.usuario;
          delete parsed?.usuarioAcao;
          delete parsed?.isAtivo;
          delete parsed?.systemDateDeleted;
          delete parsed?.dataAcao;

=======

  const getData = (value) => {
    axios
      .get("/animal/", {
        params: {
          page: value,
        },
      })
      .then((res) => {
        const parsed = res?.data?.map((e) => {
          const parsed = e;
          delete parsed?.id;
          delete parsed?.usuario;
          delete parsed?.usuarioAcao;
          delete parsed?.isAtivo;
          delete parsed?.systemDateDeleted;
          delete parsed?.dataAcao;

>>>>>>> 8051be6955a90b139666338f823d5c3428598ef1
          return parsed;
        });
        setAnimais(parsed);
      });
  };

  const columns = useMemo(
    () =>
      animais?.length
        ? Object.keys(animais[0])?.map((key) => ({
            key,
            label: key,
          }))
        : [],
    [animais]
  );

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="animais-container">
      <MenuLateral />

      <div className="animais-content">
        <Header title="animais" />
        <div className="table-container">
          <div>
            {animais?.length && (
              <Table
                columns={columns}
                data={animais}
                onPaginate={(_, value) => getData(value - 1)}
              />
            )}
          </div>
          <div className="button-add">
            <button onClick={() => setOpen(true)}>
              <span>+</span> CADASTRAR
            </button>
          </div>
        </div>

        <FormAnimal open={open} handleClose={() => setOpen(false)} />
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
