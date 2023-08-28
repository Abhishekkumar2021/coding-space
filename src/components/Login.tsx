import { Stack,useTheme, TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Notification from './Notification';
import { Link } from 'react-router-dom';
import useColorMode from '../hooks/useColorMode';


const Login = () => {
    const { 
        signIn,
        googleSignIn,
        githubSignIn,
    } = useAuth();
    const navigate = useNavigate();

    // state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<any>(null);
    const [success, setSuccess] = useState<any>(null);
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            setSuccess('Logged in successfully');
            setSuccessOpen(true);

            // Redirect to home page after 1s
            setTimeout(() => {
                navigate('/');
            }
            , 1000);

            resetForm();
        }
        catch (err: any) {
            if(err.code === 'auth/user-not-found'){
                setError('No user found with this email');
            }
            else if(err.code === 'auth/wrong-password'){
                setError('Incorrect password');
            }
            else if(err.code === 'auth/invalid-email'){
                setError('Invalid email, please try again');
            }
            else{
                setError(err.message || 'Something went wrong');
            }
            setErrorOpen(true);
            resetForm();
        }

    };

    const handleGoogleLogin = async () => {
        try{
            await googleSignIn();
            setSuccess('Signed in successfully');
            setSuccessOpen(true);

            // Redirect to home page after 1s
            setTimeout(() => {
                navigate('/');
            }
            , 1000);

        }
        catch(err: any){
            setError(err.message || 'Something went wrong');
            setErrorOpen(true);
        }
    };

    const handleGithubLogin = async () => {
        try{
            await githubSignIn();
            setSuccess('Signed in successfully');
            setSuccessOpen(true);

            // Redirect to home page after 1s
            setTimeout(() => {
                navigate('/');
            }
            , 1000);

        }
        catch(err: any){
            setError(err.message || 'Something went wrong');
            setErrorOpen(true);
        }
    };

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: any) => {
        setPassword(e.target.value);
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const {colorMode} = useColorMode();
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
            {/* Error */}
            <Notification message={error} type="error" open={errorOpen} setOpen={setErrorOpen} />
            {/* Success */}
            <Notification message={success} type="success" open={successOpen} setOpen={setSuccessOpen} />
            <Stack spacing={3} maxWidth="400px" width="100%" padding={4} component="form"  sx={{
                background: colorMode === 'light' ? theme.palette.background.paper : theme.palette.action.hover,
                borderRadius: '10px',
                boxShadow: 3,
            
            }} >

                <Typography variant="h4" component="h1" gutterBottom  sx={{ fontWeight: 700, textAlign: 'center' }} >
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
                    value={email}
                    onChange={handleEmail}
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
                    type="password"
                    autoComplete="current-password"
                    variant='outlined'
                    value={password}
                    onChange={handlePassword}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type="submit" fullWidth variant="contained" disableElevation onClick={handleSubmit} >
                    Sign In
                </Button>

                <Typography variant="body2" color="text.secondary" align="center">
                    <Link to="/forgot-password" style={{ textDecoration: 'none' , color: theme.palette.primary.main }}>
                        Forgot password?
                    </Link>
                </Typography>

                <Typography variant="body2" color="text.secondary" align="center">
                    Don't have an account?&nbsp;
                    <Link to="/signup" style={{ textDecoration: 'none' , color:  theme.palette.primary.main }}>
                        Sign up
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
                        flex: 1, 
                    }} 
                    onClick={handleGoogleLogin}
                    >
                        Google
                    </Button>
                    <Button variant="outlined" startIcon={<FaGithub />} sx={{
                        flex: 1,
                    }} 
                    onClick={handleGithubLogin}
                    >
                        GitHub
                    </Button>
                </Stack>
            </Stack>
        </Box>

    );
};

export default Login;