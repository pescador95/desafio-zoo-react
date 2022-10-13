import React, { useEffect, useState, useMemo } from "react";
import "../styles/Animais.css";
import "../styles/BuscaContainer.css"
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
        <div className="div-form">
          <form>
            <div class="col-md-10">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="microchip-anilha">Microchip ou Anilha</label>
                  <input type="text" class="form-control" id="microchip-anilha"/>
                </div>
                <div class="form-group col-md-3">
                  <label for="origem">Origem</label>
                  <input type="text" class="form-control" id="origem"/>
                </div>
                <div class="form-group col-md-3">
                  <label for="data-admissao">Data de Admissão</label>
                  <input type="text" class="form-control" id="data-admissao" placeholder="dd/mm/aaaa"/>
                </div>
                <div class="form-group col-md-3">
                  <label for="sexo">Sexo</label>
                  <select id="sexo" class="form-control">
                    <option selected value="todos">Todos</option>
                    <option value="macho">Macho</option>
                    <option value="femea">Fêmea</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="nome-cientifico">Nome Científico</label>
                  <input type="text" class="form-control" id="nome-cientifico"/>
                </div>
                <div class="form-group col-md-6">
                  <label for="nome-apelido">Nome ou Apelido</label>
                  <input type="text" class="form-control" id="nome-apelido"/>
                </div>
              </div>
            </div>
            <div class="col-md-2 div-buttons">
              <button type="submit" class="btn btn-primary"><i class="bi bi-x"></i>LIMPAR</button>
              <button type="submit" class="btn btn-primary"><i class="bi bi-funnel"></i>FILTROS</button>
              <button type="submit" class="btn btn-primary"><i class="bi bi-search"></i>BUSCAR</button>
            </div>
          </form>
        </div>
        
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
