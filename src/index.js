import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Tabela from './Tabela';
import MenuLateral from './MenuLateral';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/tabela' element={<Tabela />} />
        <Route path='/menu-lateral' element={<MenuLateral />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

//Acessar:
//https://react-table-v7.tanstack.com/docs/overview