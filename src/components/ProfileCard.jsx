import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  TextField,
  Typography,
  Grid,
  styled
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { uploadPhoto } from '../services/photo';
import { useMutation } from '@tanstack/react-query';
import useFetchUserPhoto from '../hooks/useFetchUserPhoto';

const ACCEPTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
const HiddenInput = styled('input')({
  display: 'none',
});

const ProfileCard = ({ profileInfo }) => {
  const [photoError, setPhotoError] = useState('');
  const { userPhoto, refetch } = useFetchUserPhoto();

  useEffect(() => {
    return () => {
      if (userPhoto) URL.revokeObjectURL(userPhoto);
    };
  }, [userPhoto]);


  const mutation = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: async (responseData) => {
      await refetch();
    },
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ACCEPTED_FORMATS.includes(file.type)) {
      return setPhotoError('Only JPEG, JPG, and PNG are allowed.');
    }

    if (file.size > 5 * 1024 * 1024) {
      return setPhotoError('File size must be under 5MB.');
    }

    setPhotoError('');
    mutation.mutate(file);
  };

  return (
    <>
      <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      </Box>
      <div className='flex items-center justify-center gap-3'>
        <Box sx={{ textAlign: 'center', mt: -5, position: 'relative' }}>
          <label htmlFor="upload-photo">
            <HiddenInput
              id="upload-photo"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handlePhotoChange} />
            <Avatar
              src={userPhoto || '/default-avatar.png'}
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mt: 3,
                border: '3px solid white',
                cursor: 'pointer'
              }} />
          </label>
          <CheckCircleIcon
            color="success"
            sx={{
              position: 'absolute',
              top: 72,
              right: 'calc(50% - 35px)',
              bgcolor: '#fff',
              borderRadius: '50%',
              fontSize: 28
            }} />
          {photoError && (
            <Typography color="error" variant="body2">
              {photoError}
            </Typography>
          )}
        </Box>
        <div>
          <Typography variant="h6" align="center">
            {profileInfo?.firstName} {profileInfo?.lastName}
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary">
            {profileInfo?.email}
          </Typography>
        </div>

      </div>
      <Box sx={{ px: { xs: 2, md: 6 }, py: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              value={profileInfo?.firstName}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              value={profileInfo?.lastName}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              value={profileInfo?.age}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              value={profileInfo?.phoneNumber}
              variant="standard"
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </Box>

    </>

  );
};

export default ProfileCard;
