import { Box, Toolbar, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from '@mui/icons-material/Person';
import { SidebarFooter } from "../components/SidebarFooter";
import SecurityIcon from '@mui/icons-material/Security';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { UserProfile } from "../components/UserProfile";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useUserActivity } from "../utils/userActivity";

const ApplicationLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    useUserActivity(840000, navigate, location)
    const NAVIGATION = [
        { segment: "dashboard", title: "Dashboard", icon: <BarChartIcon /> },
        { segment: "transactions", title: "Transactions", icon: <CreditCardIcon /> },
        { segment: "roles", title: "Roles", icon: <SecurityIcon /> }
    ];

    const demoTheme = createTheme({
        cssVariables: {
            colorSchemeSelector: "data-toolpad-color-scheme",
        },
        colorSchemes: { light: true, dark: true },
        breakpoints: {
            values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
        },
    });

    const router = {
        pathname: location.pathname,
        navigate: (path) => navigate(path),
    };

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme} branding={{
                logo: <div className="flex items-center justify-center">
                    <QueryStatsIcon color="primary" sx={{ fontSize: 30 }} />
                    <Typography
                        fontWeight="bold"
                        sx={{ mt: 1, fontSize: 20 }}
                        color="primary"
                    >
                        Fintrack
                    </Typography>
                </div>,
            }}
        >
            <DashboardLayout
                defaultSidebarCollapsed
                sx={{
                    '& .MuiAppBar-root a[href="/"] .MuiTypography-h6': {
                        display: 'none',
                    },
                    '& .MuiListItemButton-root': {
                        mb: 1,
                    },
                }}
                slots={{ sidebarFooter: SidebarFooter }}
            >
                <UserProfile />
                <Box>{children}</Box>
            </DashboardLayout>
        </AppProvider>
    );
};

export default ApplicationLayout;