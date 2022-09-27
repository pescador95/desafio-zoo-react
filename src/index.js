import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TableExample from './TableExample';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/tabela' element={<TableExample />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

//Acessar:
//https://react-table-v7.tanstack.com/docs/overview