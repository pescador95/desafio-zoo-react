import { Pagination } from "@mui/material";
import styles from "./table.module.css";

export const Table = ({ columns, data, onPaginate }) => {
  return (
    <>
      <table className={styles?.table}>
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <td key={index}>
                {column?.label?.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </td>
            ))}
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
              {columns?.map((column, columnIndex) => (
                <td key={`${dataIndex}-${columnIndex}`}>{item[column?.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <Pagination
          count={10}
          onChange={onPaginate}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </>
  );
};
