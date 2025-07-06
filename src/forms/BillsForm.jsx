import { useState, useContext } from "react";
import {
    TextField,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Autocomplete,
    Button,
    CircularProgress
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { frequency } from "../utils/constants";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { GlobalDataContext } from "../contexts/globalData";
import dayjs from "dayjs";
import DynamicModal from "../components/DynamicModal";
import { createBill, updateBill } from "../services/bills";

const BillsForm = ({ isModalOpen, setIsModalOpen }) => {
    const [dueDate, setDueDate] = useState(null);
    const [error, setError] = useState("");
    const { billForm, setBillForm, isEditMode, setIsEditMode } = useContext(GlobalDataContext);

    const resetForm = () => {
        setBillForm({
            name: "",
            amount: "",
            frequency: "",
            dueDate: "",
        });
        setDueDate(null);
        setError("");
        setIsEditMode(false);
        setIsModalOpen(false);
    };

    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: createBill,
        onSuccess: (responseData) => {
            queryClient.invalidateQueries(["bills"]);
            toast.success(responseData?.message)
            resetForm();
        },
        onError: (error) => {
            console.error(error)
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateBill,
        onSuccess: (responseData) => {
            queryClient.invalidateQueries(["bills"]);
            toast.success(responseData?.message);
            resetForm();
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('billForm:', billForm)
        const isFormInvalid = Object.entries(billForm).some(
            ([key, value]) => value === "" || value === null || value === undefined
        );

        if (isFormInvalid) {
            setError("Please fill out all the fields.");
            return;
        }

        if (isEditMode) {
            updateMutation.mutate(billForm);
        } else {
            createMutation.mutate(billForm)
        }
    };

    const handleChange = (e) => {
        setError("");
        setBillForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <DynamicModal
            open={isModalOpen}
            onClose={() => {
                resetForm();
            }}
            actions={
                <Button
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        background: "#1976d2",
                        color: '#fff'

                    }}
                    onClick={handleSubmit}
                >
                    {createMutation.isPending ? (
                        <CircularProgress size={24} />
                    ) : (
                        isEditMode ? "Edit Bill" : "Save Bill"
                    )}
                </Button>
            }
        // title={}
        >
            <div className="flex flex-col gap-5 mt-10">
                <div>
                    <TextField
                        fullWidth
                        name="name"
                        label="Bill name"
                        value={billForm.name}
                        onChange={handleChange}
                        required
                        size="small"
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        name="amount"
                        label="Amount"
                        type="number"
                        value={billForm.amount}
                        onChange={handleChange}
                        required
                        number
                        size="small"
                    />
                </div>
                <div>

                    <Autocomplete
                        size="small"
                        options={frequency}
                        value={billForm.frequency}
                        onChange={(event, newValue) => {
                            setBillForm((prev) => ({
                                ...prev,
                                frequency: newValue || "",
                            }));
                            setError("");
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Recurrency"
                                inputProps={{
                                    ...params.inputProps,
                                    readOnly: true,
                                }}
                                required
                            />
                        )}
                        isOptionEqualToValue={(option, value) => option === value}
                    />

                </div>
            </div>
            <div className="mt-5">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        sx={{ width: '100%' }}
                        label="Due Date"
                        value={
                            dueDate && dayjs(dueDate).isValid()
                                ? dayjs(dueDate)
                                : billForm.dueDate && dayjs(billForm.dueDate).isValid()
                                    ? dayjs(billForm.dueDate)
                                    : null
                        }
                        onChange={(newDate) => {
                            setDueDate(newDate);
                            setBillForm((prev) => ({
                                ...prev,
                                dueDate: newDate ? newDate.format("YYYY-MM-DDTHH:mm:ss") : null,
                            }));
                            setError("");
                        }}
                        slotProps={{ textField: { size: "small" } }}
                    />
                </LocalizationProvider>
            </div>
            {error && (
                <div className='text-start mt-2'>
                    {<p style={{ color: "#BD271E" }}>{error}</p>}
                </div>
            )}
        </DynamicModal>
    );
};

export default BillsForm;
