import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const NoTransactionsPlaceholder = ({ onAddTransaction }) => {
    return (
        <Box

            sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                }}
            >
                <MonetizationOnIcon sx={{ fontSize: 40 }} color="primary" />
            </Box>

            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                No Transactions Yet
            </Typography>

            <Typography variant="body1" color="textSecondary" mb={3}>
                Start your financial tracking journey by adding your first <br />
                income or expense transaction.
            </Typography>

            <Button
                size="large"
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAddTransaction}
                sx={{
                    fontWeight: "bold",
                    px: 3,
                    borderRadius: "8px",
                    textTransform: "none",
                }}
            >
                Add Your First Transaction
            </Button>
        </Box>
    );
};

export default NoTransactionsPlaceholder;
