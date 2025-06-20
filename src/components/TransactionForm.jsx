import { useState, useContext } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  Button,
  DialogActions,
  CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { categoryList } from "../utils/constants";
import { createTransaction, updateTransaction } from "../api";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { GlobalDataContext } from "../contexts/globalData";
import dayjs from "dayjs";

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
    <Dialog
      open={isModalOpen}
      onClose={() => {
        resetForm();
      }}
      fullWidth
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            resetForm();
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        // dividers
        sx={{
          padding: 5,
          borderBottom: "none",
        }}
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
                  ? dayjs(transactionDate)
                  : form.date && dayjs(form.date).isValid()
                    ? dayjs(form.date)
                    : null
              }
              onChange={(newDate) => {
                setTransactionDate(newDate);
                setForm((prev) => ({
                  ...prev,
                  date: newDate ? newDate.format("YYYY-MM-DDTHH:mm:ss") : null,
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
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", padding: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
          }}
          onClick={handleSubmit}
        >
          {createMutation.isPending ? (
            <CircularProgress sx={{ color: "white" }} size={24} />
          ) : (
            isEditMode ? "Edit Transaction" : "Save Transaction"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionForm;
