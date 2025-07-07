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

    const isReminderDue = (row) => {
        const now = dayjs();
        const due = dayjs(row.dueDate);

        switch (row.frequency) {
            case "Daily":
                return due.diff(now, "hour") <= 3 && due.isAfter(now);
            case "Weekly":
                return due.diff(now, "day") <= 1 && due.isAfter(now);
            case "Monthly":
                return due.diff(now, "day") <= 3 && due.isAfter(now);
            case "Yearly":
                return due.diff(now, "month") <= 1 && due.isAfter(now);
            default:
                return false;
        }
    };


    function formulateBillStatus(row) {
        const now = dayjs();
        switch (true) {
            case row.isPaid:
                return "Paid";
            case isReminderDue(row):
                return "Bill Approaching"
            case now.isAfter(row.dueDate):
                return "Overdue"
            default:
                break;
        }
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
            field: "status",
            headerName: "Bill Status",
            flex: 1,
            type: "date",
            sortable: true,
            renderCell: ({ row }) => {
                const status = formulateBillStatus(row);

                const getStatusColor = () => {
                    switch (status) {
                        case "Paid":
                            return {
                                color: "success.main",
                                bgcolor: "success.light",
                            };
                        case "Bill Approaching":
                            return {
                                color: "warning.main",
                                bgcolor: "warning.light",
                            };
                        case "Overdue":
                            return {
                                color: "error.main",
                                bgcolor: "error.light",
                            };
                        default:
                            return {
                                color: "text.primary",
                                bgcolor: "transparent",
                            };
                    }
                };

                const { color, bgcolor } = getStatusColor();

                return (
                    <Typography
                        variant="body2"
                        sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 8,
                            fontWeight: 500,
                            bgcolor,
                            color: '#fff',
                            display: "inline-block",
                            textAlign: "center",
                        }}
                    >
                        {status}
                    </Typography>
                );
            },
        },
        {
            field: "action",
            flex: 1,
            headerName: "",
            sortable: false,
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
