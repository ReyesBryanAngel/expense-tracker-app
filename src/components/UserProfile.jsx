import { useEffect, useContext } from 'react'
import { GlobalDataContext } from '../contexts/globalData'
import DynamicModal from '../components/DynamicModal'
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ProfileCard from '../components/ProfileCard';
import { jwtDecode } from "jwt-decode";
import { Typography, IconButton } from '@mui/material';


export const UserProfile = () => {
    const {
        profileInfo,
        setProfileInfo,
        isProfileModalOpen,
        setIsProfileModalOpen
    } = useContext(GlobalDataContext)
    const token = localStorage.getItem('accessToken')
    const parsedToken = JSON.parse(token)

    useEffect(() => {
        const decodedToken = jwtDecode(parsedToken)
        setProfileInfo({
            email: decodedToken?.email,
            firstName: decodedToken?.firstName,
            lastName: decodedToken?.lastName,
            age: decodedToken?.age,
            phoneNumber: decodedToken?.phoneNumber,
            isVerified: decodedToken?.isVerified
        })
    }, [])
    return (
        <DynamicModal
            open={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            title={
                <>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        User Profile
                    </Typography>
                    <IconButton onClick={() => setIsProfileModalOpen(false)} sx={{ color: 'white' }}>
                        <HighlightOffRoundedIcon />
                    </IconButton>
                </>
            }
            titleSx={{
                bgcolor: '#1976d2',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '60px'
            }}

        >
            <ProfileCard profileInfo={profileInfo} />
        </DynamicModal >
    )
}