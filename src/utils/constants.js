export const categoryColors = {
  Housing: "#9c27b0", // Purple
  Food: "#ffb300", // Amber/Yellow-Orange
  Transportation: "#3949ab", // Green
  Entertainment: "#f44336", // Red
  Others: "#42a5f5", // Light Blue
  Utilities: "#6d4c41", // Brown (kept from original for utility look)
  Rent: "#ab47bc", // Optional: if still used
  Salary: "#2e7d32", // Optional: green for income
};

export const categoryTextColor = {
  Income: {
    bg: "#e0f7e9", // light mint green
    text: "#2e7d32", // dark green
  },
  Salary: {
    bg: "#e8f5e9", // light green
    text: "#2e7d32", // dark green
  },
  Housing: {
    bg: "#ede7f6", // soft lavender
    text: "#5e35b1", // deep purple
  },
  Food: {
    bg: "#fff8e1", // soft yellow
    text: "#fbc02d", // darker yellow
  },
  Entertainment: {
    bg: "#ffebee", // light red
    text: "#e53935", // stronger red
  },
  Transportation: {
    bg: "#e3f2fd", // soft blue
    text: "#3949ab", // indigo
  },
  Utilities: {
    bg: "#efebe9", // soft brown background
    text: "#6d4c41", // brown
  },
  Others: {
    bg: "#e3f2fd", // soft blue background
    text: "#42a5f5", // light blue
  },
};

export const categoryList = [
  "Housing",
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Others",
];

export const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&_*])(?=.*\d).{8,}$/;


// const [transactions, setTransactions] = useState([
//   {
//     id: 1,
//     amount: 3500,
//     category: "Salary",
//     description: "Salary from freelance",
//     type: "income",
//     date: "2025-03-01",
//   },
//   {
//     id: 2,
//     amount: 1200,
//     category: "Housing",
//     description: "Imus house",
//     type: "expense",
//     date: "2025-04-02",
//   },
//   {
//     id: 3,
//     amount: 85.75,
//     category: "Food",
//     description: "1 week grocery",
//     type: "expense",
//     date: "2025-06-03",
//   },
//   {
//     id: 4,
//     amount: 2000,
//     category: "Salary",
//     description: "May freelance",
//     type: "income",
//     date: "2025-05-10",
//   },
//   {
//     id: 5,
//     amount: 400,
//     category: "Utilities",
//     description: "Electric bill",
//     type: "expense",
//     date: "2025-05-15",
//   },
//   {
//     id: 6,
//     amount: 650,
//     category: "Transportation",
//     description: "Transportation whole May",
//     type: "expense",
//     date: "2025-05-15",
//   },
//   {
//     id: 7,
//     amount: 300,
//     category: "Entertainment",
//     description: "For fun of March",
//     type: "expense",
//     date: "2025-03-15",
//   },
//   {
//     id: 8,
//     amount: 1200,
//     category: "Others",
//     description: "Unexpected expnse of January",
//     type: "expense",
//     date: "2025-01-15",
//   },
// ]);
