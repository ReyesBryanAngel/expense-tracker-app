import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`, { email: email, password: password }).then((response) => {
      setIsLoading(true)
      if (response?.data?.code === 200) {
        localStorage.setItem('accessToken', JSON.stringify(response?.data?.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(response?.data?.refreshToken));
        navigate('/dashboard');
      }
    }).catch((error) => {
      setError(error.response.data.message);
    }).finally(() => {
      setIsLoading(false)
    });
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

      {/* Login Form */}
      <Paper elevation={4} sx={{ borderRadius: 4, p: 4, width: 400, zIndex: 2 }}>
        <Box textAlign="center" mb={3}>
          <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
            Sign in to manage your finances
          </Typography>
        </Box>

        <TextField
          size="small"
          fullWidth
          label="Email Address"
          margin="normal"
          required
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <TextField
          size="small"
          fullWidth
          label="Password"
          placeholder="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value)
            setError("");
          }}
          type={showPassword ? "text" : "password"}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <div className='text-start'>
            {<p style={{ color: "#BD271E" }}>{error}</p>}
          </div>
        )}
        {/* <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Remember me"
          />
          <Link href="#" variant="body2" sx={{ alignSelf: 'self-end' }}>
            Forgot password?
          </Link>
        </Box> */}
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mt={1}
          onClick={() => navigate('/forgot-password')}
        >
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Box>

        <Button fullWidth variant="contained" sx={{ mt: 2, borderRadius: 2 }} onClick={handleLogin}>
          {isLoading ? <CircularProgress sx={{ color: "white" }} size={24} /> : "Sign in"}
        </Button>

        {/* <Divider sx={{ my: 3 }}>Or continue with</Divider>

        <Box display="flex" justifyContent="space-between" gap={2}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Facebook
          </Button>
        </Box> */}

        <Typography textAlign="center" variant="body2" sx={{ mt: 3 }} onClick={() => navigate('/signup')}>
          Don’t have an account?{" "}
          <Link href="#" underline="hover">
            Sign up
          </Link>
        </Typography>

        {/* <Typography
          textAlign="center"
          variant="caption"
          color="text.secondary"
          sx={{ whiteSpace: "nowrap", marginLeft: 1.5 }}
        >
          © 2023 Personal Finance Tracker. All rights reserved.
        </Typography> */}
      </Paper>
    </Box>

  );
};

export default Login;
