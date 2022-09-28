import React from 'react';
import ReactDOM from 'react-dom/client';
import Animais from './Animais';
import Tabela from './Tabela';
import MenuLateral from './MenuLateral';
import Login from './screen/Login';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/animais' element={<Animais />} />
        <Route path='/tabela' element={<Tabela />} />
        <Route path='/menu-lateral' element={<MenuLateral />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

//Acessar:
//https://react-table-v7.tanstack.com/docs/overview