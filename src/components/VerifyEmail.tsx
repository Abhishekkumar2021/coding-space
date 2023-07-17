import { Box, Button, Link, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import Notification from './Notification';


const VerifyEmail = () => {
    const backgroundImage = 'https://images.unsplash.com/photo-1526894826544-0f81b0a5796d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80';
    const [sent, setSent] = useState(false);

    const {verifyEmail} = useAuth();

    // Send verification email on mount
    useEffect(() => {
        verifyEmail();
        setSent(true);
    }
    , [verifyEmail]);

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} >
            <Notification open={sent} setOpen={setSent} message="Verification email sent!" type="success" />
            <Stack spacing={2} maxWidth="400px" width="100%" padding={4} component="form" sx={{ boxShadow: 3, borderRadius: 2, background: 'white' }} >
                <Typography variant="h4" color="primary.main" >Verify Email</Typography>
                <Typography variant="body1" >Please check your email to verify your account.</Typography>
                <Link href="/login" underline="none" >
                    <Button variant="contained" color="primary" disableElevation fullWidth >
                        Login
                    </Button>
                </Link>
            </Stack>

        </Box>
    )
}

export default VerifyEmail