import dayjs from "dayjs";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GlobalDataContext } from "../contexts/globalData";
import { useContext, useState } from "react";
import PaymentIcon from '@mui/icons-material/Payment';


const useBillsColumns = (setIsBillModalOpen, setIsPayModalOpen) => {
    const { setBillForm, setIsEditMode, setForm } = useContext(GlobalDataContext);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [billId, setBillId] = useState(null);

    const handleOpenForm = (row) => {
        setBillForm(row);
        setIsBillModalOpen(true);
        setIsEditMode(true)
    }

    const handlePayBill = (row) => {
        setBillForm(row);
        setForm((prev) => ({ ...prev, amount: row?.amount }));
        setIsPayModalOpen(true);
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
        const due = dayjs(row.dueDate);
        switch (true) {
            case row.isPaid:
                return "Paid";
            case isReminderDue(row):
                return "Bill Approaching"
            case now.isAfter(row.dueDate):
                return "Overdue";
            case now.isSame(due, "day"):
                return "Pay Day";
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
                dayjs(params).tz('Asia/Manila').format("MMMM DD, YYYY h:mm A"),
        },
        {
            field: "status",
            headerName: "Bill Status",
            flex: 1,
            sortable: true,
            renderCell: ({ row }) => {
                const status = formulateBillStatus(row);

                const getStatusColor = () => {
                    switch (status) {
                        case "Paid":
                            return { color: "success.main", bgcolor: "success.light" };
                        case "Pay Day":
                            return { color: "primary.main", bgcolor: "primary.light" };
                        case "Bill Approaching":
                            return { color: "warning.main", bgcolor: "warning.light" };
                        case "Overdue":
                            return { color: "error.main", bgcolor: "error.light" };
                        default:
                            return { color: "text.primary", bgcolor: "transparent" };
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
                    <Box sx={{ display: "flex", alignItems: "center", height: "100%", gap: 1 }}>
                        <Tooltip title="Edit Bill">
                            <IconButton color="primary" onClick={() => handleOpenForm(row)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Bill">
                            <IconButton color="error" onClick={() => {
                                setBillId(row?._id);
                                setIsDeleteModalOpen(true);
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Pay Now">
                            <IconButton color="success"
                                disabled={row?.isPaid}
                                onClick={() => {
                                    setBillId(row?._id);
                                    handlePayBill(row)
                                }}
                            >
                                <PaymentIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];

    return { columns, isDeleteModalOpen, billId, setIsDeleteModalOpen };
};

export default useBillsColumns;
