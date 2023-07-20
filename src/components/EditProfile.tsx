import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Box, ImageList, ImageListItem, Stack, TextField, Typography } from '@mui/material'
import { PermIdentity, Image } from '@mui/icons-material'

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
    const [preview, setPreview] = useState<any>(null)

    // Handlers
    const handleName = (e: any) => {
        setName(e.target.value)
    }

    const handleImage = (e: any) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={2} maxWidth="400px" width="100%" padding={4} component="form" sx={{ boxShadow: 3, borderRadius: 2, background: 'white' }} >
                <Typography variant="h4" color="primary.main" >Edit Profile</Typography>
                {/* Name */}
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <PermIdentity />
                        ),
                    }}
                />
                {/* Image button */}
                <TextField
                    id="outlined-basic"
                    label="Image"
                    variant="outlined"
                    fullWidth
                    type="file"
                    onChange={handleImage}
                    InputProps={{
                        startAdornment: (
                            <Image />
                        ),
                    }}
                />
                
                {/* Image preview */}
                {preview && 
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                        <ImageListItem>
                            <img
                                src={preview}
                                srcSet={preview}
                                alt="Preview"
                                loading="lazy"
                            />
                        </ImageListItem>
                    </ImageList>
                }
                
            </Stack>
        </Box>            
    )
}

export default EditProfile