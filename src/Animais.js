import React from 'react';
import './styles/Animais.css';
import MenuLateral from './MenuLateral';
import Tabela from './Tabela';


function Animais() {

  return (
    <div className='animais-container'>
      <div className="sidebar-menu">
        <MenuLateral />
      </div>
      <div className='table-container'>
        <Tabela />
      </div>
    </div>    
  );
}

export default Animais;
