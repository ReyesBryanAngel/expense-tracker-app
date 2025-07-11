import dayjs from 'dayjs';
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import { categoryTextColor } from "../utils/constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GlobalDataContext } from "../contexts/globalData";
import { useContext, useState } from "react";

const useTransactionColumns = (setIsTransactionModalOpen) => {
  const { setForm, setIsEditMode } = useContext(GlobalDataContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const handleOpenForm = (row) => {
    setForm(row);
    setIsTransactionModalOpen(true);
    setIsEditMode(true)
  }

  const columns = [
    {
      field: "category",
      headerName: "Category",
      sortable: true,
      flex: 1,
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
      editable: true,
      renderCell: ({ row }) => {
        const transactionType = row.type;
        const iconColor = transactionType === "expense" ? "#f44336" : "#4caf50";

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              height: "100%"
            }}
          >
            <Box
              sx={{
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WalletIcon sx={{ color: iconColor, fontSize: 20 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 180,
                }}
              >
                {row.description}
              </Typography>
              {/* <Typography color="text.secondary">{row.category}</Typography> */}
            </Box>
          </Box>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      sortable: true,
      flex: 1,
      renderCell: ({ row }) => {
        const moneyColor = row.type === "expense" ? "error" : "success";
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography color={moneyColor}>
              <span>{row.type === "expense" ? "-" : "+"}</span>&nbsp;
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
      flex: 1,
      type: "date",
      sortable: true,
      valueFormatter: (params) =>
       dayjs(params).format("MMMM DD, YYYY h:mm A"),
    },
    {
      field: "action",
      flex: 1,
      headerName: "",
      sortable: false,
      type: "date",
      renderCell: ({ row }) => {

        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%", gap: 1 }}>
            <Tooltip title="Edit Transaction">
              <IconButton color="primary" onClick={() => handleOpenForm(row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Transaction">
              <IconButton color="error" onClick={() => {
                setTransactionId(row?._id);
                setIsDeleteModalOpen(true);
              }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return { columns, isDeleteModalOpen, transactionId, setIsDeleteModalOpen };
};

export default useTransactionColumns;
