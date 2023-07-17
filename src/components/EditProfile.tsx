import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Box, Stack, TextField, Typography } from '@mui/material'

const EditProfile = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState<any>(null)
    const [success, setSuccess] = useState<any>(null)
    const [errorOpen, setErrorOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const [image, setImage] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const { user, updateProfile } = useAuth()
    const [progress, setProgress] = useState(0)

    // Handlers
    const handleName = (e: any) => {
        setName(e.target.value)
    }

    const handleImage = (e: any) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={2} maxWidth="400px" width="100%" padding={4} component="form" sx={{ boxShadow: 3, borderRadius: 2, background: 'white' }} >
                <Typography variant="h4" color="primary.main" >Edit Profile</Typography>
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="image"
                    variant="outlined"
                    fullWidth
                    type="file"
                    onChange={handleImage}
                />
            </Stack>
        </Box>            
    )
}

export default EditProfile