import React from "react";
import useColumns from "../utils/useColumns";
import { DataGrid } from "@mui/x-data-grid";

const TransactionTable = ({ transactions }) => {
  const { columns } = useColumns();
  return (
    <div>
      <DataGrid
        rows={transactions}
        columns={columns}
        pageSizeOptions={[20, 50, 100]}
        sx={{ boxShadow: 2 }}
      />
    </div>
  );
};

export default TransactionTable;
