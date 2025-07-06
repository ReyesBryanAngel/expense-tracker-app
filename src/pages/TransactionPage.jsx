import useColumns from "../useColumns";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DynamicModal from "../components/DynamicModal";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteTransaction } from "../api";
import { useContext } from "react";
import TransactionForm from "../components/TransactionForm";
import useFetchTransactions from "../hooks/useFetchTransactions";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import NoTransactionsPlaceholder from "../components/NoTransactionPlaceholder";
import { GlobalDataContext } from "../contexts/globalData";
import AddIcon from "@mui/icons-material/Add";

const TransactionPage = () => {
  const { isTransactionModalOpen, setIsTransactionModalOpen } = useContext(GlobalDataContext);
  const { columns, isDeleteModalOpen, transactionId, setIsDeleteModalOpen } = useColumns(setIsTransactionModalOpen);
  const { transactions, isPending } = useFetchTransactions();

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries(["transactions"]);
      toast.success(responseData?.message)
      setIsDeleteModalOpen(false)
    },
    onError: (error) => {
      console.error(error)
    }
  });
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      <Button
        onClick={() => setIsTransactionModalOpen(true)}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          textTransform: "none",
          alignSelf:'flex-end',
          mr: 12
        }}
      >
        Add Transaction
      </Button>
      {isPending && !transactions ? (
        <DashboardSkeleton />
      ) : transactions && transactions.length === 0 ? (
        <NoTransactionsPlaceholder onAddTransaction={() => setIsTransactionModalOpen(true)} />
      ) : (
        <>
          <TransactionForm
            isModalOpen={isTransactionModalOpen}
            setIsModalOpen={setIsTransactionModalOpen}
          />

          <DynamicModal
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Delete Confirmation"
            actions={
              <>
                <Button onClick={() => setIsDeleteModalOpen(false)} color="inherit">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (transactionId) {
                      deleteMutation.mutate(transactionId);
                    }
                  }}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </>
            }
          >
            <Typography>
              Are you sure you want to delete this transaction?
            </Typography>
          </DynamicModal>

          <Box sx={{ width: "90%", height: 700 }}>
            <DataGrid
              rows={transactions}
              getRowId={(row) => row._id}
              columns={columns}
              pageSizeOptions={[20, 50, 100]}
              sx={{ boxShadow: 2, mt: 2 }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default TransactionPage;
