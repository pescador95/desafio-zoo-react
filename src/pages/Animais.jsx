import React, { useEffect, useState, useMemo } from "react";
import "../styles/Animais.css";
import { useAxios } from "../hooks/useAxios";
import { MenuLateral } from "../components/MenuLateral";
import { Header } from "../components/Header";
import { Table } from "../components/Table";

export const Animais = () => {
  const [animais, setAnimais] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    axios.get("/animal/").then((res) => {
      const parsed = res?.data?.map((e) => {
        const parsed = e;
        delete parsed?.id;
        delete parsed?.usuario;
        delete parsed?.usuarioAcao;
        delete parsed?.isAtivo;
        delete parsed?.systemDateDeleted;
        delete parsed?.dataAcao;

        return parsed;
      });

      setAnimais(parsed);
    });
  }, []);

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

  return (
    <div className="animais-container">
      <MenuLateral />

      <div className="animais-content">
        <Header title="animais" />

        <div className="table-container">
          {animais?.length && <Table columns={columns} data={animais} />}
        </div>
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
