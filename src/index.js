import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './screen/Login';
import TableExample from './TableExample';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/tabela' element={<TableExample />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

//Acessar:
//https://react-table-v7.tanstack.com/docs/overview