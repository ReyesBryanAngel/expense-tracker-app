import { useState, useContext } from "react";
import {
  TextField,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  Button,
  CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { categoryList } from "../utils/constants";
import { createTransaction, updateTransaction } from "../services/transactions";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { GlobalDataContext } from "../contexts/globalData";
import DynamicModal from "../components/DynamicModal";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const TransactionForm = ({ isModalOpen, setIsModalOpen }) => {
  const [transactionType, setTransactionType] = useState(null);
  const [transactionDate, setTransactionDate] = useState(null);
  const [error, setError] = useState("");
  const { form, setForm, isEditMode, setIsEditMode } = useContext(GlobalDataContext);

  const resetForm = () => {
    setForm({
      amount: "",
      category: "",
      type: null,
      description: "",
      date: null,
    });
    setTransactionDate(null);
    setTransactionType(null);
    setError("");
    setIsEditMode(false);
    setIsModalOpen(false);
  };

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries(["transactions"]);
      toast.success(responseData?.message)
      resetForm();
    },
    onError: (error) => {
      console.error(error)
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateTransaction,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries(["transactions"]);
      toast.success(responseData?.message);
      resetForm();
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form:', form)
    const isFormInvalid = Object.entries(form).some(
      ([key, value]) => value === "" || value === null || value === undefined
    );

    if (isFormInvalid) {
      setError("Please fill out all the fields.");
      return;
    }

    if (isEditMode) {
      updateMutation.mutate(form);
    } else {
      createMutation.mutate(form)
    }
  };

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
          size="small"
        >
          {createMutation.isPending ? (
            <CircularProgress size={24} />
          ) : (
            isEditMode ? "Edit Transaction" : "Save Transaction"
          )}
        </Button>
      }
    // title={}
    >
      <div className="flex flex-col gap-5 mt-10">
        <div>
          <TextField
            fullWidth
            name="description"
            label="Enter Description"
            value={form.description}
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
            value={form.amount}
            onChange={handleChange}
            required
            size="small"
          />
        </div>
        <div className="flex flex-col">
          <Typography style={{ textAlign: "left" }}>Type</Typography>
          <RadioGroup
            value={transactionType}
            onChange={(e) => {
              setTransactionType(e.target.value);
              setError("");
              setForm((prev) => ({
                ...prev,
                type: e.target.value,
                category: e.target.value === "income" ? "Income" : "",
              }));
            }}
            row
            style={{ justifyContent: "flex-start" }}
          >
            {["income", "expense"].map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Radio
                    size="small"
                    value={option}
                    checked={(transactionType || form.type) === option}
                  />
                }
                label={option === "expense" ? "Expense" : "Income"}
              />
            ))}
          </RadioGroup>
        </div>
        <div>
          {(transactionType || form.type) === "expense" && (
            <Autocomplete
              size="small"
              options={categoryList}
              value={form.category}
              onChange={(event, newValue) => {
                setForm((prev) => ({
                  ...prev,
                  category: newValue || "",
                }));
                setError("");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  inputProps={{
                    ...params.inputProps,
                    readOnly: true,
                  }}
                  required
                />
              )}
              isOptionEqualToValue={(option, value) => option === value}
            />
          )}
        </div>
      </div>
      <div className="mt-5">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            sx={{ width: '100%' }}
            label="Transaction Date & Time"
            value={
              transactionDate && dayjs(transactionDate).isValid()
                ? dayjs(transactionDate).tz('Asia/Manila', true)
                : form.date && dayjs(form.date).isValid()
                  ? dayjs(form.date).tz('Asia/Manila', true)
                  : null
            }
            onChange={(newDate) => {
              setTransactionDate(newDate);
              setForm((prev) => ({
                ...prev,
                date: newDate ? dayjs(newDate).tz('Asia/Manila', true).format('YYYY-MM-DDTHH:mm:ss') : null,
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

export default TransactionForm;
