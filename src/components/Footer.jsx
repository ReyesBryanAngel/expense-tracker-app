// components/Footer.tsx

import { Box, Typography, Link, Container } from "@mui/material";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#f5f5f5",
                py: 3,
                mt: "auto",
                borderTop: "1px solid #e0e0e0",
            }}
        >
            <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h6" fontWeight="bold" color="primary" sx={{ ml: 2 }}>
                    <QueryStatsIcon fontSize="large" color="primary" />
                    FinTrack
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    Track your income and expenses with ease.
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                    © {new Date().getFullYear()} Finance Tracker. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
