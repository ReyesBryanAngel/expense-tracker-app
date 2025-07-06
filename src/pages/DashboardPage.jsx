import { useState, useMemo, useContext } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import ChartSection from "../components/dashboard/ChartSection";
import TotalCalculation from "../components/dashboard/TotalCalculation";
import { PieChart } from "@mui/x-charts";
import { categoryColors } from "../utils/constants";
import NoTransactionsPlaceholder from "../components/NoTransactionPlaceholder";
import useFetchTransactions from "../hooks/useFetchTransactions";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import { GlobalDataContext } from "../contexts/globalData";

const DashboardPage = () => {
  const { transactions, isPending } = useFetchTransactions();
  const { isTransactionModalOpen, setIsTransactionModalOpen } = useContext(GlobalDataContext);
  const [filter, setFilter] = useState("30d");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getFilteredTransactions = () => {
    const now = new Date();
    let cutoff;

    switch (filter) {
      case "30d":
        cutoff = new Date();
        cutoff.setDate(now.getDate() - 30);
        break;
      case "3m":
        cutoff = new Date();
        cutoff.setMonth(now.getMonth() - 3);
        break;
      case "6m":
        cutoff = new Date();
        cutoff.setMonth(now.getMonth() - 6);
        break;
      case "year":
        cutoff = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return transactions;
    }

    return transactions?.filter((t) => new Date(t.date) >= cutoff);
  };

  const {
    totalIncome,
    totalExpenses,
    totalBalance,
    incomeChange,
    expenseChange,
    balanceChange,
  } = useMemo(() => {
    if (!transactions) return {};
    const now = new Date();
    const currentMonth = now.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const currentYear = now.getFullYear();
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const filterByMonth = (date, month, year) => {
      const d = new Date(date);
      return d.getMonth() === month && d.getFullYear() === year;
    };

    const income = transactions?.filter((t) => t.type === "income")?.reduce((acc, t) => acc + t.amount, 0);

    const expenses = transactions?.filter((t) => t.type === "expense")?.reduce((acc, t) => acc + t.amount, 0);

    const lastMonthIncome = transactions?.filter(
      (t) =>
        t.type === "income" && filterByMonth(t.date, lastMonth, lastMonthYear)
    )?.reduce((acc, t) => acc + t.amount, 0);

    const lastMonthExpenses = transactions?.filter(
      (t) =>
        t.type === "expense" &&
        filterByMonth(t.date, lastMonth, lastMonthYear)
    )?.reduce((acc, t) => acc + t.amount, 0);

    const incomeChange = lastMonthIncome
      ? ((income - lastMonthIncome) / lastMonthIncome) * 100
      : 0;

    const expenseChange = lastMonthExpenses
      ? ((expenses - lastMonthExpenses) / lastMonthExpenses) * 100
      : 0;

    const lastMonthBalance = lastMonthIncome - lastMonthExpenses;

    const balanceChange = lastMonthBalance
      ? ((income - expenses - lastMonthBalance) / Math.abs(lastMonthBalance)) *
      100
      : 0;

    return {
      totalIncome: income,
      totalExpenses: expenses,
      totalBalance: income - expenses,
      incomeChange,
      expenseChange,
      balanceChange,
    };
  }, [transactions]);

  const expenseBreakdownData = useMemo(() => {
    if (!transactions) return [];
    const filtered = transactions?.filter((t) => t.type === "expense");
    const total = filtered?.reduce((sum, t) => sum + t.amount, 0);

    const categoryMap = new Map();

    for (const txn of filtered) {
      categoryMap.set(
        txn.category,
        (categoryMap.get(txn.category) || 0) + txn.amount
      );
    }

    const data = Array.from(categoryMap.entries()).map(([category, value]) => ({
      id: category,
      value,
      percentage: total ? ((value / total) * 100).toFixed(1) : 0,
    }));

    return data;
  }, [transactions]);

  return (
    <Box sx={{ mt: 5 }}>
      <TransactionForm
        isModalOpen={isTransactionModalOpen}
        setIsModalOpen={setIsTransactionModalOpen}
      />

      {isPending && !transactions ? (
        <DashboardSkeleton />
      ) : transactions && transactions?.length === 0 ? (
        <NoTransactionsPlaceholder onAddTransaction={() => setIsTransactionModalOpen(true)} />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Container>
            <div className="flex flex-col gap-20">
              <div className="">
                <TotalCalculation
                  totalIncome={totalIncome}
                  incomeChange={incomeChange}
                  totalExpenses={totalExpenses}
                  expenseChange={expenseChange}
                  totalBalance={totalBalance}
                  balanceChange={balanceChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                <div className="col-span-2">
                  <div>
                    <ChartSection
                      transactions={getFilteredTransactions()}
                      filter={filter}
                      handleFilterChange={handleFilterChange}
                    />
                  </div>
                </div>
                <div>
                  <Paper
                    elevation={3}
                    sx={{
                      height: '90%',
                      padding: 3,
                      display: "flex",
                      flexDirection: "column",
                      overflow: "auto",

                      position: 'relative'
                    }}
                  >
                    <div className="flex flex-col justify-center">
                      <Typography
                        sx={{ position: 'absolute', top: 10, left: 10 }}
                        color="textSecondary"
                        variant="h6"
                      >
                        Expense Breakdown
                      </Typography>
                      <PieChart
                        sx={{ mt: 5 }}
                        series={[
                          {
                            data: expenseBreakdownData.map(
                              ({ id, value }) => ({
                                id,
                                value,
                                // label: id,
                                color: categoryColors[id] || "#e0e0e0",
                              })
                            ),
                          },
                        ]}
                        height={290}
                      />
                    </div>

                    <div className="space-y-2 text-sm text-center">
                      {expenseBreakdownData.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center px-4"
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: categoryColors[item.id] || "#e0e0e0",
                              }}
                            ></span>
                            {item.id}
                          </span>
                          <span>{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </Paper>
                </div>
              </div>
            </div>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;
