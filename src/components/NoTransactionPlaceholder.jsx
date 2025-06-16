import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const NoTransactionsPlaceholder = ({ onAddTransaction }) => {
    return (
        <Box
            sx={{
                textAlign: "center",
                // mt: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(to bottom right, #eef3fd, #e6eaff)",
                minHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "#e6ebff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                }}
            >
                <MonetizationOnIcon sx={{ fontSize: 40, color: "#6B4EFF" }} />
            </Box>

            <Typography variant="h5" fontWeight="bold" gutterBottom>
                No Transactions Yet
            </Typography>

            <Typography variant="body1" color="textSecondary" mb={3}>
                Start your financial tracking journey by adding your first <br />
                income or expense transaction.
            </Typography>

            <Button
                size="large"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAddTransaction}
                sx={{
                    background: "linear-gradient(135deg, #6B4EFF 0%, #A074FF 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    px: 3,
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": {
                        background: "linear-gradient(135deg, #5a3ee6 0%, #905cf8 100%)",
                    },
                }}
            >
                Add Your First Transaction
            </Button>
        </Box>
    );
};

export default NoTransactionsPlaceholder;
