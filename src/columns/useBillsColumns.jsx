import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GlobalDataContext } from "../contexts/globalData";
import { useContext, useState } from "react";

const useBillsColumns = (setIsBillModalOpen) => {
    const { setBillForm, setIsEditMode } = useContext(GlobalDataContext);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [billId, setBillId] = useState(null);
    const handleOpenForm = (row) => {
        setBillForm(row);
        setIsBillModalOpen(true);
        setIsEditMode(true)
    }

    const columns = [
        {
            field: "name",
            headerName: "Bill Name",
            sortable: true,
            flex: 1,
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
            field: "frequency",
            headerName: "Frequency",
            sortable: true,
            flex: 1,
        },
        {
            field: "dueDate",
            headerName: "Due Date",
            flex: 1,
            type: "date",
            sortable: true,
            valueFormatter: (params) =>
                dayjs(params).format("MMMM DD, YYYY h:mm A"),
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
                    <Box sx={{ display: "flex", alignItems: "center", height: "100%", gap: 2 }}>
                        <EditIcon color="primary" sx={{ cursor: "pointer" }} onClick={() => handleOpenForm(row)} />
                        <DeleteIcon color="error" sx={{ cursor: "pointer" }} onClick={() => {
                            setBillId(row?._id);
                            setIsDeleteModalOpen(true);
                        }} />
                    </Box>
                );
            },
        },
    ];

    return { columns, isDeleteModalOpen, billId, setIsDeleteModalOpen };
};

export default useBillsColumns;
