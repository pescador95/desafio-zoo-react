import { Box, Button, Pagination, Typography } from "@mui/material";
import { Pencil } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { removeEqualItensArray } from "../../utils/removeEqualItensArray";

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

  const style = {
    addRegister: {
      margin: "0.5rem 0",
      color: "#fff",
      width: "100%",
      maxWidth: "12rem",
      height: "2.5rem",
      background: "#FB8C00",
      transition: "0.2s",
      "&:hover": {
        background: "#FB8C00",
        filter: "brightness(0.8)",
      },
      display: "flex",
      gap: "0.5rem",
    },
    containerTable: {
      width: "100%",
      overflowX: "auto",
    },
    table: {
      textAlign: "center",
      width: "100%",
      minWidth: "43.75rem",
    },
    tableHeader: {
      background: "#43a047",
      padding: "1rem",
      color: "#fff",
      fontWeight: "600",
      fontSize: "1rem",
      textAlign: "center",
      textTransform: "capitalize",
    },
    pagination: {
      textAlign: "center",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "1rem",
    },
    totalElements: {
      textAlign: "right",
    },
    edit: {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
    },

    clearSelectedItems: {
      margin: "1rem 0",
      border: "none",
      backgroundColor: "#fb8c00",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "3rem",
      borderRadius: "4px",
    },
  };

  const onToggleItem = (event, item) => {
    if (event?.target?.checked) {
      setSelectedItems((prev) => removeEqualItensArray([...prev, item]));
    } else {
      setSelectedItems((prev) => prev?.filter((e) => e?.id !== item?.id));
    }
  };

  const { reset } = useForm({});

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
      <Box sx={style.containerTable}>
        {!!data?.length && (
          <Box component="table" sx={style.table}>
            <thead>
              <tr>
                <Box component="td" sx={style.tableHeader}>
                  <input
                    type="checkbox"
                    onChange={onToggleAllItems}
                    checked={checkedAllItemsPage()}
                  />
                </Box>
                {columns?.map((column, index) => (
                  <Box key={index} component="td" sx={style.tableHeader}>
                    {column?.label?.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </Box>
                ))}

                <Box component="td" sx={style.tableHeader}>
                  Editar
                </Box>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, dataIndex) => (
                <tr
                  key={dataIndex}
                  style={{
                    backgroundColor: `${
                      dataIndex % 2 === 0 ? "white" : "#AEFFB2"
                    }`,
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
                    <td key={`${dataIndex}-${columnIndex}`}>
                      {item[column?.key]}
                    </td>
                  ))}

                  <td>
                    <Button sx={style.edit} onClick={() => handleEdit(item)}>
                      <Pencil size={24} color="#000" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Box>
        )}
      </Box>
      {!!data?.length && (
        <>
          <Button
            sx={style.addRegister}
            onClick={() =>
              reset({
                selectedItems: setSelectedItems([]),
              })
            }
          >
            LIMPAR SELECIONADOS
          </Button>
          <Typography sx={style.selectedItems}>
            {selectedItems?.length} item(s) selecionados.
          </Typography>

          <Typography sx={style.totalElements}>
            Exibindo {size * currentPage} de {totalElements} registros.
          </Typography>
        </>
      )}

      <Box sx={style.pagination}>
        <Pagination
          count={pages || 0}
          onChange={(_, value) => {
            onPaginate(value);
            setCurrentPage(value);
          }}
          page={currentPage}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </>
  );
};
