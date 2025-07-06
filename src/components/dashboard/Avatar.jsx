import { useState, useEffect } from 'react';
import {
    Typography,
    Toolbar,
    IconButton,
    ListItemText,
    Tooltip,
    Menu,
    MenuItem,
    ListItemIcon,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,

} from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useNavigate } from 'react-router-dom';
import LogoutIcon from "@mui/icons-material/Logout";
import 'dayjs/locale/en';
import { jwtDecode } from "jwt-decode";
import { getInitials } from '../../utils/globalFunctions';
import ProfileCard from '../ProfileCard';


const Avatar = () => {
    const [avatar, setAvatar] = useState(null);
    const [profileInfo, setProfileInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        age: "",
        phoneNumber: "",
        isVerified: ""
    })
    const [profile, setProfile] = useState(false);
    const [anchorEl, setAnchorEl] = useState(false);
    const accessToken = localStorage.getItem('accessToken')
    const parsedToken = JSON.parse(accessToken)
    const navigate = useNavigate();

    const logoutUser = () => {
        if (parsedToken) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            navigate('/')
        }
    }

    useEffect(() => {
        const decodedToken = jwtDecode(parsedToken)
        const username = `${decodedToken?.firstName} ${decodedToken?.lastName}`
        const initials = getInitials(username);
        setProfileInfo({
            email: decodedToken?.email,
            firstName: decodedToken?.firstName,
            lastName: decodedToken?.lastName,
            age: decodedToken?.age,
            phoneNumber: decodedToken?.phoneNumber,
            isVerified: decodedToken?.isVerified
        })
        setAvatar(initials);
    }, [])

    const open = Boolean(anchorEl);

    const openAvatar = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const isAvatarOpen = () => {
        setAnchorEl(null);
    }
    const closeDialog = () => {
        setProfile(false);
    }

    return (
        <>
            <Dialog
                onClose={closeDialog}
                open={profile}
            >
                <DialogTitle sx={{
                    bgcolor: '#1976d2',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height:'60px'

                }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Profile Information
                    </Typography>
                    <IconButton onClick={closeDialog} sx={{ color: 'white' }}>
                        <HighlightOffRoundedIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                   <ProfileCard profileInfo={profileInfo} />
                </DialogContent>
            </Dialog>
            <Toolbar className="flex justify-end">
                <Tooltip title='Profile' onClick={openAvatar} sx={{ position: "relative" }}>
                    <IconButton disableRipple>
                        <div
                            className="flex justify-center items-center rounded-full w-10 h-10 p-4 border-2 text-white bg-blue-500"
                        >
                            <div className="flex text-xs">
                                {avatar}
                                {/* AR */}
                            </div>
                        </div>
                    </IconButton>
                </Tooltip>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClick={isAvatarOpen}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => { setProfile(true); }}>
                        <ListItemIcon>
                            <PermIdentityIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={logoutUser}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </>
    )
}

export default Avatar;