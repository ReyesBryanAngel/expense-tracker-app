import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter email address.");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/forgot-password`, { email });
            if (response?.data?.code === 200) {
                toast.success(response?.data?.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    } 
    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, #6B4EFF 0%, #A074FF 100%)",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
            }}
        >
            <Paper elevation={4} sx={{ borderRadius: 4, p: 4, width: 400 }}>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        <QueryStatsIcon fontSize="large" color="primary" />
                        Fintrack
                    </Typography>
                </Box>

                <TextField
                    size="small"
                    fullWidth
                    label="Email Address"
                    margin="normal"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setError("")
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
                    Reset Password
                </Button>

            </Paper>
        </Box>
    )
}

export default ForgotPassword
