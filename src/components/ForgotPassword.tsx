import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [success, setSuccess] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const navigate = useNavigate();
    const backgroundImage = 'https://images.unsplash.com/photo-1526894826544-0f81b0a5796d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80';

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await resetPassword(email);
            setSuccess('Mail sent successfully');
            setSuccessOpen(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            setError(err.message);
            setErrorOpen(true);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} >
            {/* Error */}
            <Notification message={error} type="error" open={errorOpen} setOpen={setErrorOpen} />
            {/* Success */}
            <Notification message={success} type="success" open={successOpen} setOpen={setSuccessOpen} />

            <Stack spacing={3} maxWidth="400px" width="100%" padding={4} component="form" sx={{ boxShadow: 3, borderRadius: 2, background: 'white' }} >

                <Typography variant="h5" align="left">
                    Enter your email address below and we'll send you a link to reset your password.
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

                <Button type="submit" fullWidth variant="contained" disableElevation onClick={handleSubmit} >
                    Send
                </Button>
                
            </Stack>
        </Box>
    );
}

export default ForgotPassword