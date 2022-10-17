import { Pagination } from "@mui/material";
import { Pencil } from "phosphor-react";
import { useState } from "react";
import { removeEqualItensArray } from "../../utils/removeEqualItensArray";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8051be6 (modal, botao de cadastro)
=======
>>>>>>> f06c0c5 (resolvido conflitos)
=======
>>>>>>> d08e915ac33273fdb32613fdefbb5af851354aa5
import styles from "./table.module.css";
export const Table = ({
  columns,
  data,
  onPaginate,
  totalElements,
  size,
  setSelectedItems,
  selectedItems,
  pages,
  handleEdit = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onToggleItem = (event, item) => {
    if (event?.target?.checked) {
      setSelectedItems((prev) => removeEqualItensArray([...prev, item]));
    } else {
      setSelectedItems((prev) => prev?.filter((e) => e?.id !== item?.id));
    }
  };

  const onToggleAllItems = (event) => {
    if (event?.target?.checked) {
      setSelectedItems((prev) => removeEqualItensArray([...prev, ...data]));
    } else {
      const filteredItems = selectedItems?.filter(
        (item) => !data?.find((e) => e?.id === item?.id)
      );

      setSelectedItems(filteredItems);
    }
  };

  const checkedAllItemsPage = () => {
    const match = data?.reduce((acc, item) => {
      const existItem = selectedItems?.find((e) => e?.id === item?.id);

      if (existItem) {
        return (acc = [...acc, item]);
      }

      return acc;
    }, []);

    return match?.length === data?.length;
  };

  return (
    <>
      <p>{selectedItems?.length} item(s) selecionados.</p>

      <table className={styles?.table}>
        <thead>
          <tr>
            <td>
              <input
                type="checkbox"
                onChange={onToggleAllItems}
                checked={checkedAllItemsPage()}
              />
            </td>
<<<<<<< HEAD
<<<<<<< HEAD
=======
export const Table = ({ columns, data, onPaginate }) => {
  return (
    <>
      <table className={styles?.table}>
        <thead>
          <tr>
>>>>>>> 8051be6 (modal, botao de cadastro)
=======
>>>>>>> f06c0c5 (resolvido conflitos)
=======
>>>>>>> d08e915ac33273fdb32613fdefbb5af851354aa5
            {columns?.map((column, index) => (
              <td key={index}>
                {column?.label?.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </td>
            ))}

            <td>Editar</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, dataIndex) => (
            <tr
              key={dataIndex}
              style={{
                backgroundColor: `${dataIndex % 2 === 0 ? "white" : "#AEFFB2"}`,
              }}
            >
              <td>
                <input
                  type="checkbox"
                  onChange={(event) => onToggleItem(event, item)}
                  checked={
                    selectedItems?.find((e) => e?.id === item?.id) || false
                  }
                />
              </td>

              {columns?.map((column, columnIndex) => (
                <td key={`${dataIndex}-${columnIndex}`}>{item[column?.key]}</td>
              ))}

              <td>
                <button
                  className={styles.edit}
                  onClick={() => handleEdit(item)}
                >
                  <Pencil size={24} />
                </button>
              </td>
<<<<<<< HEAD
<<<<<<< HEAD
=======
              {columns?.map((column, columnIndex) => (
                <td key={`${dataIndex}-${columnIndex}`}>{item[column?.key]}</td>
              ))}
>>>>>>> 8051be6 (modal, botao de cadastro)
=======
>>>>>>> f06c0c5 (resolvido conflitos)
=======
>>>>>>> d08e915ac33273fdb32613fdefbb5af851354aa5
            </tr>
          ))}
        </tbody>
      </table>

      <p className={styles.totalElements}>
        Exibindo {size * currentPage} de {totalElements} registros.
      </p>

      <div className={styles.pagination}>
        <Pagination
          count={pages}
          onChange={(_, value) => {
            onPaginate(value);
            setCurrentPage(value);
          }}
<<<<<<< HEAD
<<<<<<< HEAD
=======
      <div className={styles.pagination}>
        <Pagination
          count={10}
          onChange={onPaginate}
>>>>>>> 8051be6 (modal, botao de cadastro)
=======
>>>>>>> f06c0c5 (resolvido conflitos)
=======
>>>>>>> d08e915ac33273fdb32613fdefbb5af851354aa5
          variant="outlined"
          shape="rounded"
        />
      </div>
    </>
  );
};
