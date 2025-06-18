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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { toast } from "react-toastify";
import { passwordRegex } from "../../utils/constants";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const isFormInvalid = Object.values(form).some((value) => !value);
    if (isFormInvalid) {
      setError("Please fill out all the fields.");
      return;
    }

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { confirmPassword, ...payload } = form;
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/register`,
        {
          ...payload,
          age: Number(payload.age),
        }
      );
      if (response?.data?.code === 201) {
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed.");
    }
  };

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
          <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
            Create your account to start tracking your finances.
          </Typography>
        </Box>

        <TextField
          size="small"
          fullWidth
          label="First Name"
          margin="normal"
          value={form.firstName}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, firstName: e.target.value }));
            setError("");
          }}
        />
        <TextField
          size="small"
          fullWidth
          label="Last Name"
          margin="normal"
          value={form.lastName}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, lastName: e.target.value }));
            setError("");
          }}
        />
        <TextField
          size="small"
          fullWidth
          label="Email Address"
          margin="normal"
          value={form.email}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, email: e.target.value }));
            setError("");
          }}
        />
        <TextField
          size="small"
          fullWidth
          label="Phone Number"
          margin="normal"
          value={form.phoneNumber}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, phoneNumber: e.target.value }));
            setError("");
          }}
        />
        <TextField
          size="small"
          fullWidth
          label="Age"
          type="number"
          margin="normal"
          value={form.age}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, age: e.target.value }));
            setError("");
          }}
        />
        <TextField
          size="small"
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={form.password}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, password: e.target.value }));
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
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={form.confirmPassword}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, confirmPassword: e.target.value }));
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
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <Typography textAlign="center" variant="body2" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Link href="/" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
