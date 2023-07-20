import { Avatar, Box, Button, Icon, IconButton, Stack, Typography } from '@mui/material'
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Mail, Login, Edit } from '@mui/icons-material';

const Profile = () => {
  const { user } = useAuth();
  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Stack spacing={2} maxWidth="400px" width="100%" padding={4} component="form" sx={{ boxShadow: 3, borderRadius: 2, background: 'white' }} >
        <Avatar alt="User" src={user?.photoURL} sx={{ width: '100px', height: '100px', margin: 'auto' }} />
        <Typography variant="h4" color="primary.main" textAlign='center' >{user?.displayName}</Typography>
        <Stack direction="row" alignItems="center" spacing={1} >
          <IconButton>
            <Icon>
              <Mail />
            </Icon>
          </IconButton>
          <Typography variant="body1" >{user?.email}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} >
          <IconButton>
            <Icon>
              <Login />
            </Icon>
          </IconButton>
          <Typography variant="body1" >{user?.metadata.creationTime.toString().substring(0, 22)}</Typography>
        </Stack>
  
        <Link to="/edit-profile" style={{ textDecoration: 'none' }} >
          <Button variant="contained" color="primary" disableElevation fullWidth startIcon={<Edit />} >
            Edit Profile
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}

export default Profile