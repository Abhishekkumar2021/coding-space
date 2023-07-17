import { Stack, TextField, Button, Box, Typography, Link, InputAdornment } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const Signup = () => {
    const {
        user,
        signUp,
    } = useAuth();
    const navigate = useNavigate();
    const backgroundImage = 'https://images.unsplash.com/photo-1526894826544-0f81b0a5796d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80';

    // If user is already logged in, redirect to home page
    if(user) {
        navigate('/');
    }

    // state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<any>(null);
    const [success, setSuccess] = useState<any>(null);
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);


    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: any) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e: any) => {
        setConfirmPassword(e.target.value);
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        if(password !== confirmPassword){
            setError("Passwords do not match");
            setErrorOpen(true);
            return;
        }

        try{
            // signup
            await signUp(email, password);

            // success
            setSuccess('Account created successfully.');
            setSuccessOpen(true);

            // reset form
            resetForm();

            // naviagate to home
            navigate('/');
            
        }
        catch(error: any){
            setError(error.message || 'Something went wrong');
            setErrorOpen(true);

            // reset form
            resetForm();
        }

    };

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            {/* Error */}
            <Notification message={error} type="error" open={errorOpen} setOpen={setErrorOpen} />
            {/* Success */}
            <Notification message={success} type="success" open={successOpen} setOpen={setSuccessOpen} />
            <Stack spacing={3} maxWidth="400px" width="100%" padding={4} component="form" sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }} >
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign up
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
                    value={email}
                    onChange={handleEmail}

                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type='password'
                    autoComplete="current-password"
                    variant='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={password}
                    onChange={handlePassword}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirm-password"
                    label="Confirm Password"
                    name="confirm-password"
                    type='password'
                    autoComplete="confirm-password"
                    variant='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                />
                <Button type="submit" fullWidth variant="contained" disableElevation onClick={handleSubmit}>
                    Submit
                </Button>

                <Typography variant="body2" color="text.secondary" align="center">
                    Already have an account?{' '}
                    <Link href="/login" underline="hover">
                        Sign in
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

export default Signup;