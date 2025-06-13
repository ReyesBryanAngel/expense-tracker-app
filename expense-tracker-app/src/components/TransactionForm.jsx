import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";

const TransactionForm = ({ onAdd, isModalOpen, setIsModalOpen }) => {
  const [transactionType, setTransactionType] = useState(null);
  const [transactionDate, setTransactionDate] = useState(null);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: transactionType,
    description: "",
    date: transactionDate,
  });

  const categoryList = [
    "Housing",
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Others",
  ];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAdd({ ...form, amount: parseFloat(form.amount) });
    await setForm((prev) => ({ ...prev, amount: "", category: "" }));
    await resetForm();
    await setIsModalOpen(false);
  };

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
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => {
        resetForm();
        setIsModalOpen(false);
      }}
      // maxWidth="md"
      // sx={{ padding: "20px" }}
      fullWidth
    >
      <DialogTitle>
        Add new Transaction
        <IconButton
          aria-label="close"
          onClick={() => {
            setIsModalOpen(false);
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
        dividers
        sx={{
          padding: 5,
          borderBottom: "none", // removes bottom divider
        }}
      >
        <div className="flex flex-col gap-5">
          <div>
            <TextField
              fullWidth
              name="description"
              label="Enter Description"
              // type="number"
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
                setForm((prev) => ({
                  ...prev,
                  type: e.target.value,
                  category: e.target.value === "income" ? "Income" : "",
                }));
              }}
              row
              style={{ justifyContent: "flex-start" }} // Align radio buttons to the left
            >
              {["income", "expense"].map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Radio
                      size="small"
                      value={option}
                      checked={transactionType === option} // Check if this option is selected
                    />
                  }
                  label={option === "expense" ? "Expense" : "Income"}
                />
              ))}
            </RadioGroup>
          </div>
          <div>
            {transactionType === "expense" && (
              <Autocomplete
                size="small"
                options={categoryList}
                value={form.category}
                onChange={(event, newValue) => {
                  setForm((prev) => ({
                    ...prev,
                    category: newValue || "", // fallback to empty string if cleared
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true, // Prevents typing
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
            <DatePicker
              sx={{ width: "100%" }}
              label="Transaction Date"
              value={transactionDate}
              // onChange={setTransactionDate}
              onChange={(newDate) => {
                setTransactionDate(newDate);
                setForm((prev) => ({
                  ...prev,
                  date: newDate ? newDate.format("YYYY-MM-DD") : null,
                }));
              }}
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
        </div>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", padding: 3 }}>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleSubmit}
        >
          Save Transaction
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionForm;
