import { Box } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { useContext } from "react";
import { GlobalDataContext } from "../contexts/globalData";
import { useNavigate } from "react-router-dom";

export const SidebarFooter = () => {
    const { setIsProfileModalOpen } = useContext(GlobalDataContext);
    const navigate = useNavigate();
    return (
        <Box sx={{ mt: 'auto', px: 2, pb: 1 }}>
            <Divider sx={{ mb: 1 }} />
            <ListItemButton
                onClick={() => setIsProfileModalOpen(true)}
                sx={{
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton
                onClick={() => {
                    localStorage.clear();
                    navigate('/');
                }}
                sx={{
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </Box>
    )
}