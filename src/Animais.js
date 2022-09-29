import React, { useEffect } from "react";
import "./styles/Animais.css";
import MenuLateral from "./MenuLateral";
import Tabela from "./Tabela";
import { api, useAxios } from "./hooks/useAxios";

function Animais() {
  useEffect(() => {
    api.get("/animal/getListAtivos");
  }, []);

  return (
    <div className="animais-container">
      <div className="sidebar-menu">
        <MenuLateral />
      </div>
      <div className="table-container">
        <Tabela />
      </div>
    </div>
  );
}

export default Animais;
