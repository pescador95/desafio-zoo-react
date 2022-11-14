import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { SideBarMenu } from "../../components/SideBarMenu";
import { useAxios } from "../../hooks/useAxios";
import { getLocalSessionData } from "../../hooks/useSession"
import {
  deleteUsers,
  getUsers,
  countUser,
} from "../../services/http/profile";
import styles from "./Profile.module.css";
import "./index.css";

export const Profile = () => {
  const axios = useAxios();
  const user = getLocalSessionData();//Email do usuário atual para a busca
  console.log(user)

  const [nome, setNome] = useState({});
  const [email, setEmail] = useState({});
  const [roleUsuario, setRoleUsuario] = useState({});
  const [password, setPassword] = useState({})

  useEffect(() => {
    setNome(user.nomeUsuario)
    setEmail(user.email)
    setRoleUsuario(user.roleUsuario)
  }, [nome, email, roleUsuario]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = (submit) => {

  }


  return (
      <div className={styles.container}>
        <SideBarMenu />
        <div className={styles.content}>
          <Header title="Meu perfil" />
          <div className="div-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="col-md-12">
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="nome">Nome completo</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nome"
                    value={nome}
                    onChange={setNome}
                  />
                </div>
                <div class="form-group col-md-3">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    value={email}
                  />
                </div>
                <div class="form-group col-md-2">
                  <label for="roleUsuario">Função</label>
                  <select id="roleUsuario" class="form-control">
                    <option selected>
                      Todos
                    </option>
                    <option value="admin">Administrador</option>
                    <option value="dev">Desenvolvedor</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="nome-apelido">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                  />
                </div>
              </div>
              <div class="form-row form-row-buttons">
                <button className={styles.add}>
                  Salvar
                </button>
                <button className={styles.exclude}>
                  Cancelar
                </button>
              </div>
            </div>
          </form>
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
