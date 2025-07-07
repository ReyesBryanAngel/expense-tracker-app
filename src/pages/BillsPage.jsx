import { useContext, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, IconButton, Button, Typography } from '@mui/material'
import useFetchBills from '../hooks/useFetchBills'
import useBillsColumns from '../columns/useBillsColumns'
import { GlobalDataContext } from '../contexts/globalData'
import BillsForm from '../forms/BillsForm'
import AddIcon from "@mui/icons-material/Add";
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { deleteBill, updateBill } from '../services/bills'
import DynamicModal from '../components/DynamicModal'
import { createTransaction } from '../services/transactions'
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const BillsPage = () => {
    const { billForm, isBillModalOpen, setIsBillModalOpen, form } = useContext(GlobalDataContext);
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);
    const { columns, isDeleteModalOpen, billId, setIsDeleteModalOpen } = useBillsColumns(setIsBillModalOpen, setIsPayModalOpen);
    const { bills } = useFetchBills();
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: deleteBill,
        onSuccess: (responseData) => {
            queryClient.invalidateQueries(["transactions"]);
            toast.success(responseData?.message)
            setIsDeleteModalOpen(false)
        },
        onError: (error) => {
            console.error(error)
        }
    });

    const payBillMutation = useMutation({
        mutationFn: updateBill,
        onSuccess: (responseData) => {
            queryClient.invalidateQueries(["bills"]);
            toast.success(responseData?.message);
            setIsPayModalOpen(false)
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const addTransaction = useMutation({
        mutationFn: createTransaction,
        onSuccess: (responseData) => {
            queryClient.invalidateQueries(["transactions"]);
            toast.success(responseData?.message);
        },
        onError: (error) => {
            console.error(error)
        }
    })

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
            <BillsForm
                isModalOpen={isBillModalOpen}
                setIsModalOpen={setIsBillModalOpen}
            />
            <DynamicModal
                open={isPayModalOpen}
                onClose={() => setIsPayModalOpen(false)}
                title="Payment Confirmation"
                actions={
                    <>
                        <Button onClick={() => setIsPayModalOpen(false)} color="inherit" sx={{ textTransform: 'none' }} size='small'>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                const transactionPayload = {
                                    ...form,
                                    category: "Bill",
                                    date: dayjs().tz('Asia/Manila', true).toDate(),
                                    type: "expense",
                                    description: `Payment for ${billForm.name}`
                                }
                                if (billId) {
                                    const payBill = {
                                        ...billForm,
                                        isPaid: true
                                    }
                                    payBillMutation.mutate(payBill);
                                    addTransaction.mutate(transactionPayload)
                                }
                            }}
                            color="success"
                            variant="contained"
                            sx={{ textTransform: 'none' }}
                            size='small'
                        >
                            Pay Bill
                        </Button>
                    </>
                }

            >
                <Typography>Are you sure you want to pay this Bill?</Typography>
            </DynamicModal>
            <DynamicModal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Confirmation"
                actions={
                    <>
                        <Button onClick={() => setIsDeleteModalOpen(false)} color="inherit" sx={{ textTransform: 'none' }} size='small'>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                if (billId) {
                                    deleteMutation.mutate(billId);
                                }
                            }}
                            color="error"
                            variant="contained"
                            sx={{ textTransform: 'none' }} size='small'
                        >
                            Delete
                        </Button>
                    </>
                }
            >
                <Typography>
                    Are you sure you want to delete this Bill?
                </Typography>
            </DynamicModal>
            <Box sx={{ width: "90%", height: 650, position: 'relative' }}>
                <IconButton
                    size="small"
                    sx={{
                        position: 'absolute',
                        alignSelf: 'end',
                        width: '24px',
                        height: '24px',
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: 1,
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                        right: 0
                    }}
                    onClick={() => setIsBillModalOpen(true)}
                >
                    <AddIcon fontSize="small" />
                </IconButton>
                <DataGrid
                    rows={bills}
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSizeOptions={[20, 50, 100]}
                    sx={{ boxShadow: 2, mt: 5 }}
                />
            </Box>
        </Box>
    )
}

export default BillsPage
