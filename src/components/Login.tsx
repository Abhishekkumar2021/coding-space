import { Stack, TextField, Button, Box, Typography, Link, InputAdornment } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';

export const Login = () => {
    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={3} maxWidth="400px" width="100%" padding={4} component="form" sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign in
                </Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    variant='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="current-password"
                    variant='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type="submit" fullWidth variant="contained" disableElevation >
                    Sign In
                </Button>

                <Typography variant="body2" color="text.secondary" align="center">
                    Don't have an account?&nbsp;
                    <Link href="#" underline="hover">
                        Sign Up
                    </Link>
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Box sx={{ width: '100%', height: '1px', backgroundColor: 'black' }} />
                    <Typography variant="body2" color="text.secondary" align="center">
                        Or
                    </Typography>
                    <Box sx={{ width: '100%', height: '1px', backgroundColor: 'black' }} />
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Button variant="outlined" startIcon={<FcGoogle />} sx={{
                        flex: 1, color: 'black', borderColor: 'lightgray', '&:hover': {
                            borderColor: 'gray'
                        },
                    }} >
                        Google
                    </Button>
                    <Button variant="outlined" startIcon={<FaGithub />} sx={{
                        flex: 1, color: 'black', borderColor: 'lightgray', '&:hover': {
                            borderColor: 'gray'
                        },
                    }} >
                        GitHub
                    </Button>
                </Stack>
            </Stack>
        </Box>

    );
};