import { Typography, Box, Paper } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const TotalCalculation = ({
  totalIncome,
  incomeChange,
  totalExpenses,
  expenseChange,
  totalBalance,
  balanceChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-15 mt-5">
      <Paper
        elevation={3}
        sx={{ flex: 1, p: 2, borderLeft: "5px solid #2196f3" }}
      >
        <Typography variant="subtitle2" color="textSecondary">
          Total Income
        </Typography>
        <Typography variant="h5" color="primary">
          {totalIncome?.toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
          })}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          {incomeChange >= 0 ? (
            <ArrowUpward color="success" fontSize="small" />
          ) : (
            <ArrowDownward color="error" fontSize="small" />
          )}
          <Typography
            variant="body2"
            color={incomeChange >= 0 ? "success.main" : "error.main"}
          >
            {Math.abs(incomeChange)?.toFixed(1)}% from last month
          </Typography>
        </Box>
      </Paper>
      <Paper
        elevation={3}
        sx={{ flex: 1, p: 2, borderLeft: "5px solid #2196f3" }}
      >
        <Typography variant="subtitle2" color="textSecondary">
          Total Expenses
        </Typography>
        <Typography variant="h5" color="primary">
          {totalExpenses?.toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
          })}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          {expenseChange >= 0 ? (
            <ArrowUpward color="success" fontSize="small" />
          ) : (
            <ArrowDownward color="error" fontSize="small" />
          )}
          <Typography
            variant="body2"
            color={expenseChange >= 0 ? "success.main" : "error.main"}
          >
            {Math.abs(expenseChange)?.toFixed(1)}% from last month
          </Typography>
        </Box>
      </Paper>
      <Paper
        elevation={3}
        sx={{ flex: 1, p: 2, borderLeft: "5px solid #2196f3" }}
      >
        <Typography variant="subtitle2" color="textSecondary">
          Total Balance
        </Typography>
        <Typography variant="h5" color="primary">
          {totalBalance > 0 ? (
            totalBalance?.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
            })
          ) : (
            0.00?.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
            })
          )
          }

        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          {balanceChange >= 0 ? (
            <ArrowUpward color="success" fontSize="small" />
          ) : (
            <ArrowDownward color="error" fontSize="small" />
          )}
          <Typography
            variant="body2"
            color={balanceChange >= 0 ? "success.main" : "error.main"}
          >
            {Math.abs(balanceChange)?.toFixed(1)}% from last month
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default TotalCalculation;
