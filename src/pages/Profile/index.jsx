import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { SideBarMenu } from "../../components/SideBarMenu";
import { useAxios } from "../../hooks/useAxios";
import { getLocalSessionData } from "../../hooks/useSession";
import {
  deleteUsersProfile,
  getUsersProfile,
  updateUserProfile,
} from "../../services/http/profile";
import styles from "./Profile.module.css";
import "./index.css";
import { useToast } from "../../hooks/useToast";
import { ROLES } from "../../utils/constants";

export const Profile = () => {
  const axios = useAxios();
  const user = getLocalSessionData(); //Email do usuário atual para a busca

  const { openToast } = useToast();
  const [nome, setNome] = useState({});
  const [email, setEmail] = useState({});
  const [roleUsuario, setRoleUsuario] = useState({});
  const [password, setPassword] = useState({});

  const setAttribute = () => {
    if(user.roleUsuario === "dev"){
      document.getElementById('option-dev').setAttribute('selected', 'selected');
    } else {
      document.getElementById('option-admin').setAttribute('selected', 'selected');
    }
  }

  useEffect(() => {
    setNome(user.nomeUsuario)
    setEmail(user.email)
    setRoleUsuario(user.roleUsuario)
    setAttribute();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = async () => {
    const senha = document.getElementById('password').value
    setPassword(senha)
    
    // console.log("Nome input:" + nome)
    // console.log("Email input: " + email)
    // console.log("Role input: " + roleUsuario)
    console.log("Senha input: " + password)

    const user = {
      "nome": nome,
      "email": email,
      "password": password,
      "roleUsuario": roleUsuario
    }
      

    const response = await updateUserProfile(user)
    
    if(response !== null){
      console.log("Retorno: " + response)
      window.location.reload();
    }
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
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div class="form-group col-md-3">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="form-group col-md-2">
                  <label for="roleUsuario">Função</label>
                  <select id="roleUsuario" class="form-control" onChange={(e) => setRoleUsuario(e.target.value)}>
                    <option id="option-admin" value="admin">Administrador</option>
                    <option id="option-dev" value="dev">Desenvolvedor</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="password">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                  />
                </div>
              </div>
              <div class="form-row form-row-buttons">
                <button className={styles.add} type="submit">
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
