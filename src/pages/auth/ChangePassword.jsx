import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useParams, useNavigate } from 'react-router-dom';
import { passwordRegex } from '../../utils/constants';

const ChangePassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: "",
        token: token
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChangePassword = async () => {
        if (!passwordRegex.test(form.newPassword)) {
            setError(
                "Password must be at least 8 characters, include one uppercase letter, one number, and one special character."
            );
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const { confirmPassword, ...payload } = form;

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/change-password`, payload);
            if (response?.data?.code === 200) {
                toast.success(response?.data?.message);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
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
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    value={form.newPassword}
                    onChange={(e) => {
                        setForm((prev) => ({ ...prev, newPassword: e.target.value }));
                        setError("");
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    size="small"
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    margin="normal"
                    value={form.confirmPassword}
                    onChange={(e) => {
                        setForm((prev) => ({ ...prev, confirmPassword: e.target.value }));
                        setError("");
                    }}
                     InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
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
                    onClick={handleChangePassword}
                >
                    Change Password
                </Button>

            </Paper>
        </Box>
    )
}

export default ChangePassword;
