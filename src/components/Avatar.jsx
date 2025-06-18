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
    DialogContent,
} from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useNavigate } from 'react-router-dom';
import LogoutIcon from "@mui/icons-material/Logout";
import 'dayjs/locale/en';
import { jwtDecode } from "jwt-decode";
import { getInitials } from '../utils/globalFunctions';


const Avatar = () => {
    const [avatar, setAvatar] = useState(null);
    const [profileInfo, setProfileInfo] = useState({ name: "", email: "" })
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
        const userName = `${decodedToken?.firstName} ${decodedToken?.lastName}`
        const initials = getInitials(userName);
        setProfileInfo({ name: userName, email: decodedToken?.email })
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
                {/* Avatar content */}
                <DialogContent>
                    <div className='absolute right-0 top-0'>
                        <IconButton onClick={closeDialog} disableRipple>
                            <HighlightOffRoundedIcon />
                        </IconButton>
                    </div>
                    <div className="flex flex-col py-5 relative">
                        <div className='px-3 whitespace-nowrap'>
                            <div>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    Name: {profileInfo.name}
                                    {/* Name: Angel Bryan Reyes */}
                                </Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "30px" }}>
                                    Email: {profileInfo.email}
                                    {/* Email: reyesangelbryan@gmail.com */}
                                </Typography>
                            </div>

                        </div>
                    </div>
                </DialogContent>
            </Dialog><Toolbar className="flex justify-end">
                <Tooltip title='Profile' onClick={openAvatar} sx={{ position: "relative" }}>
                    <IconButton disableRipple>
                        <div
                            className="flex justify-center items-center rounded-full w-10 h-10 p-4 border-2 text-white bg-blue-500"
                            // style={{
                            //     background: "linear-gradient(135deg, #6B4EFF 0%, #A074FF 100%)",
                            // }}
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