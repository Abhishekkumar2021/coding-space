import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Stack spacing={2} maxWidth="400px" width="100%" padding={4} component="form" sx={{ boxShadow: 3, borderRadius: 2, background: 'white' }} >
        <Avatar alt="User" src={user?.photoURL} sx={{ width: '100px', height: '100px', margin: 'auto' }} />
        <Typography variant="h4" color="primary.main" >{user?.displayName}</Typography>
        <Typography variant="body1" >{user?.email}</Typography>
        <Typography variant="body1" >Last login at: {user?.metadata.lastSignInTime.toString().substring(0, 22)}</Typography>
        <Link to="/edit-profile" style={{ textDecoration: 'none' }} >
          <Button variant="contained" color="primary" disableElevation fullWidth >
            Edit Profile
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}

export default Profile