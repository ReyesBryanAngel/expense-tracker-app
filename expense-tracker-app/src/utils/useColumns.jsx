import dayjs from "dayjs";
import { Box, Tooltip, Typography } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import { categoryTextColor } from "./constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const useColumns = () => {
  const columns = [
    {
      field: "category",
      headerName: "Category",
      sortable: true,
      width: 210,
      // flex: 1,
      renderCell: ({ value }) => {
        const colorSet = categoryTextColor[value] || {
          bg: "#f5f5f5",
          text: "#757575",
        };

        return (
          <Box
            sx={{
              backgroundColor: colorSet.bg,
              color: colorSet.text,
              px: 1,
              py: 0.25,
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 600,
              textAlign: "center",
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              display: "inline-block",
            }}
          >
            {value}
          </Box>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 310,
      // flex: 2, // ← allow column to grow
      editable: true,
      renderCell: ({ row }) => {
        const transactionType = row.type;
        const backgroundColor =
          transactionType === "expense" ? "#fdecea" : "#e6f4ea";
        const iconColor = transactionType === "expense" ? "#f44336" : "#4caf50";

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                // width: 36,
                height: 36,
                borderRadius: "50%",
                // backgroundColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WalletIcon sx={{ color: iconColor, fontSize: 20 }} />
            </Box>
            <Box>
              <Typography
                fontWeight={600}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 180, // or any max width that fits your design
                }}
              >
                {row.description}
              </Typography>
              <Typography color="text.secondary">{row.category}</Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      sortable: true,
      width: 210,
      // flex: 1, // ← allow column to grow
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography>
              {row?.amount?.toLocaleString("en-PH", {
                style: "currency",
                currency: "PHP",
              })}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 210,
      // flex: 1, // ← allow column to grow
      type: "date",
      sortable: true,
      valueFormatter: (params) => dayjs(params).format("MMMM DD, YYYY"),
    },
    {
      field: "action",
      width: 210,
      headerName: "",
      sortable: false,
      // flex: 1, // ← allow column to grow
      type: "date",
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <EditIcon color="primary" sx={{ cursor: "pointer" }} />
            <DeleteIcon color="error" sx={{ cursor: "pointer" }} />
          </Box>
        );
      },
    },
  ];

  return { columns };
};

export default useColumns;
