import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Button,
    DialogActions,
} from "@mui/material";
import { deleteTransaction } from '../api';
import { toast } from "react-toastify";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const DeleteModal = ({ isDeleteModalOpen, transactionId, setIsDeleteModalOpen }) => {
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
        <>
            {/* Your DataGrid here */}
            <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} sx={{ p: 2 }}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this transaction?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDeleteModalOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        if (transactionId) {
                            deleteMutation.mutate(transactionId);
                        }
                    }} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteModal
