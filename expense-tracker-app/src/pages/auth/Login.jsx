import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
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

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

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
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#EEE",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              mb: 1,
            }}
          >
            <Typography color="primary" fontWeight="bold">
              $
            </Typography>
          </Box>
          <Typography variant="h6" fontWeight="bold">
            FinanceTracker
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to manage your finances
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Email Address"
          placeholder="you@example.com"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Remember me"
          />
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Box>

        <Button fullWidth variant="contained" sx={{ mt: 2, borderRadius: 2 }}>
          Sign in
        </Button>

        <Divider sx={{ my: 3 }}>Or continue with</Divider>

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
        </Box>

        <Typography textAlign="center" variant="body2" sx={{ mt: 3 }}>
          Don’t have an account?{" "}
          <Link href="#" underline="hover">
            Sign up
          </Link>
        </Typography>

        <Typography
          textAlign="center"
          variant="caption"
          color="text.secondary"
          sx={{ whiteSpace: "nowrap", marginLeft: 1.5 }}
        >
          © 2023 Personal Finance Tracker. All rights reserved.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
