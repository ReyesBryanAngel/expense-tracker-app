import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from 'react-router-dom';

const AccountVerifiedPage = () => {
    const navigate = useNavigate();
    const { verificationToken } = useParams();

    return (
        <>
            {verificationToken ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    bgcolor="#e3f2fd"
                // sx={{ background: "linear-gradient(135deg, #6B4EFF 0%, #A074FF 100%)", }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            textAlign: 'center',
                            padding: 5,
                            borderRadius: 4,
                            backgroundColor: 'white',
                            maxWidth: 400,
                        }}
                    >
                        <CheckCircleIcon sx={{ fontSize: 60, color: '#2196f3', mb: 2 }} />

                        <Typography variant="h6" gutterBottom>
                            Your email has been verified
                        </Typography>
                        <Typography variant="body2" color="textSecondary" mb={3}>
                            Thank you for confirming your email address. Your account is now active and ready to use.
                        </Typography>

                        <Button
                            onClick={() => navigate('/')}
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: '#2196f3', textTransform: 'none' }}
                        >
                            Go to Login
                        </Button>
                    </Paper>
                </Box>
            ) :
                <Typography>No Token provided for verification.</Typography>
            }
        </>
    );
};

export default AccountVerifiedPage;
