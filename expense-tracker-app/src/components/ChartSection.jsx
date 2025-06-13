import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Paper } from "@mui/material";
import TimeRange from "../components/TimeRange";

const ChartSection = ({ transactions, filter, handleFilterChange }) => {
  const monthsSet = new Set();

  transactions.forEach(({ date }) => {
    const d = new Date(date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    monthsSet.add(key);
  });

  const sortedMonthKeys = Array.from(monthsSet).sort(); // Sort chronologically
  const months = sortedMonthKeys.map((key) => {
    const [year, month] = key.split("-");
    return new Date(`${year}-${month}-01`).toLocaleString("default", {
      month: "short",
    });
  });

  // Initialize maps
  const incomeMap = {};
  const expenseMap = {};
  sortedMonthKeys.forEach((key) => {
    incomeMap[key] = 0;
    expenseMap[key] = 0;
  });

  // Populate income/expense per month
  transactions.forEach(({ date, amount, type }) => {
    const d = new Date(date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}`;

    if (type === "income") incomeMap[key] += amount;
    else expenseMap[key] += amount;
  });

  const incomeData = sortedMonthKeys.map((key) => incomeMap[key] || 0);
  const expenseData = sortedMonthKeys.map((key) => expenseMap[key] || 0);

  return (
    <Paper elevation={3} sx={{ px: 2, py: 2 }}>
      <TimeRange filter={filter} handleFilterChange={handleFilterChange} />
      <Box sx={{ width: "100%", minHeight: 325 }}>
        <LineChart
          height={325}
          series={[
            { data: incomeData, label: "Income", color: "#3f51b5" },
            { data: expenseData, label: "Expenses", color: "#f9a825" },
          ]}
          xAxis={[{ scaleType: "band", data: months }]}
          margin={{ left: 50, right: 20, top: 30, bottom: 30 }}
        />
      </Box>
    </Paper>
  );
};

export default ChartSection;
