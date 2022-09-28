import React, { useEffect, useMemo, useState } from 'react'
//import styled from 'styled-components'
import { useTable } from 'react-table'
import axios from 'axios';
import './styles/Tabela.css';


function Tabela() {

    const [animais, setAnimais] = useState([]);

    // const fetchAnimais = async () => {
    //     const response = await axios.get("https://fakestoreapi.com/products").catch(err => console.log(err))

    //     if(response) {
    //         const animais = response.data
    //         console.log(animais)
    //         setAnimais(animais)
    //     }
    // }

    const fetchAnimais = async () => {
        const response = await axios.get("http://localhost:8080/animal/getListAtivos").catch(err => console.log(err))

        if(response) {
            const animais = response.data
            console.log(animais)
            setAnimais(animais)
        }
    }

    useEffect(() => {
        console.log("Executando useEffect...")
        fetchAnimais();
    }, []);

    //Dados da tabela
    //Funciona em um modelo chave: valor
    // const data = useMemo(
    //     () => [
    //         {
    //             col1: 'Hello',
    //             col2: 'World',
    //             col3: 'Teste3',
    //         },
    //         {
    //             col1: 'react-table',
    //             col2: 'rocks',
    //             col3: 'Teste3',
    //         },
    //         {
    //             col1: 'whatever',
    //             col2: 'you want',
    //             col3: 'Teste3',
    //         },
    //     ],
    //     []
    // );

    const columns = useMemo(
        () => [
            {
                Header: 'Column 1', // título da coluna 1
                accessor: 'id', // tudo que for col1 dentro de data ficar nessa coluna
            },
            {
                Header: 'Column 2',
                accessor: 'dataacao',
            },
            {
                Header: 'Column 3',
                accessor: 'dataentrada',
            },
            {
                Header: 'Column 4',
                accessor: 'idade',
            },
            {
                Header: 'Column 5',
                accessor: 'identificacao',
            },
            {
                Header: 'Column 6',
                accessor: 'isativo',
            },
            {
                Header: 'Column 7',
                accessor: 'nomeapelido',
            },
            ],
        []
    );


    const tableInstance = useTable({ columns, data: animais }); //Instancia uma tabela

    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (

        <table id="customers" {...getTableProps()}>
            <thead>
                {// Loop over the header rows
                headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {// Loop over the headers in each row
                    headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                        {// Render the header
                        column.render('Header')}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                rows.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                    {// Loop over the rows cells
                    row.cells.map(cell => {
                        // Apply the cell props
                        return (
                        <td {...cell.getCellProps()}>
                            {// Render the cell contents
                            cell.render('Cell')}
                        </td>
                        )
                    })}
                    </tr>
                )
                })}
            </tbody>
        </table>
    );
}

export default Tabela;
