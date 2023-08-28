import { Stack, useTheme, TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import { Link } from 'react-router-dom';
import useColorMode from '../hooks/useColorMode';

const Signup = () => {
    const {
        signUp,
        googleSignIn,
        githubSignIn,
    } = useAuth();
    const navigate = useNavigate();

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

    const handleGoogleSignup = async () => {
        try{
            await googleSignIn();
            setSuccess('Account created successfully');
            setSuccessOpen(true);

        }
        catch(err: any){
            setError(err.message || 'Something went wrong');
            setErrorOpen(true);
        }
    };

    const handleGithubSignup = async () => {
        try{
            await githubSignIn();
            setSuccess('Account created successfully');
            setSuccessOpen(true);
        }
        catch(err: any){
            setError(err.message || 'Something went wrong');
            setErrorOpen(true);
        }
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
            setSuccess('Account created successfully');
            setSuccessOpen(true);

            // Redirect to home page after 1s
            setTimeout(() => {
                navigate('/');
            }
            , 1000);

            resetForm();
        }
        catch(err: any){
            if(err.code === 'auth/email-already-in-use'){
                setError('Email already in use');
            }
            else if(err.code === 'auth/invalid-email'){
                setError('Invalid email, please try again');
            }
            else if(err.code === 'auth/weak-password'){
                setError('Password must be at least 6 characters');
            }
            else{
                setError(err.message || 'Something went wrong');
            }
            setErrorOpen(true);
            resetForm();
        }

    };

    const {colorMode} = useColorMode();
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Error */}
            <Notification message={error} type="error" open={errorOpen} setOpen={setErrorOpen} />
            {/* Success */}
            <Notification message={success} type="success" open={successOpen} setOpen={setSuccessOpen} />
            <Stack spacing={3} maxWidth="400px" width="100%" padding={4} component="form"  sx={{
                background: colorMode === 'light' ? theme.palette.background.paper : theme.palette.action.hover,
                borderRadius: '10px',
                boxShadow: 3,
            
            }} >
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
                    <Link to="/login" style={{ textDecoration: 'none', color: theme.palette.primary.main }} >
                        Login
                    </Link>
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Box sx={{ width: '100%', height: '1px', backgroundColor: colorMode === 'light' ? 'black' : 'white' }} />
                    <Typography variant="body2" color="text.secondary" align="center">
                        Or
                    </Typography>
                    <Box sx={{ width: '100%', height: '1px', backgroundColor: colorMode === 'light' ? 'black' : 'white' }} />
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Button variant="outlined" startIcon={<FcGoogle />} sx={{
                        flex: 1
                    }} onClick={handleGoogleSignup}>
                        Google
                    </Button>
                    <Button variant="outlined" startIcon={<FaGithub />} sx={{
                        flex: 1
                    }} onClick={handleGithubSignup}>
                        GitHub
                    </Button> 
                </Stack>
            </Stack>
        </Box>
    );
};  

export default Signup;