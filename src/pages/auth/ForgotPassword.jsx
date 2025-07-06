import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Box, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter email address.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL_DEV}/users/forgot-password`, { email });
            if (response?.data?.code === 200) {
                toast.success(response?.data?.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Box
            bgcolor="#e3f2fd"
            sx={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                p: 2,
            }}
        >
            <Box
                sx={{
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    userSelect: "none",
                }}

            >
                <QueryStatsIcon sx={{ fontSize: 140, color: "#1976d2" }} />
                <Typography
                    variant="h2"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mt: 1 }}
                >
                    Fintrack
                </Typography>
            </Box>

            <Paper elevation={4} sx={{ borderRadius: 4, p: 4, width: 400 }}>
                <div className="flex items-center justify-center md:hidden">
                    <QueryStatsIcon sx={{ fontSize: 45, color: "#1976d2" }} />
                    <Typography
                        fontWeight="bold"
                        color="primary"
                        sx={{ mt: 1, fontSize: 25 }}
                    >
                        Fintrack
                    </Typography>
                </div>
                <Box textAlign="center" mb={3}>
                    <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
                        Enter your email to reset your password.
                    </Typography>
                </Box>

                <TextField
                    size="small"
                    fullWidth
                    label="Email Address"
                    margin="normal"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                />

                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, borderRadius: 2 }}
                    onClick={handleForgotPassword}
                >
                    {isLoading ? <CircularProgress sx={{ color: "white" }} size={24} /> : "Reset Password"}
                </Button>
            </Paper>
        </Box>
    );
}

export default ForgotPassword
