import useColumns from "../useColumns";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteModal from "./DeleteModal";

const TransactionTable = ({ transactions, setIsModalOpen }) => {
  const { columns, isDeleteModalOpen, transactionId, setIsDeleteModalOpen } = useColumns(setIsModalOpen);
  return (
    <>
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        transactionId={transactionId}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <Box sx={{ height: 500, width: "100%" }}>
        <Typography color="textSecondary" variant="h5">Transaction History</Typography>
        <DataGrid
          rows={transactions}
          getRowId={(row) => row._id}
          columns={columns}
          pageSizeOptions={[20, 50, 100]}
          sx={{ boxShadow: 2, mt: 2 }}
        />
      </Box>
    </>
  );
};

export default TransactionTable;
