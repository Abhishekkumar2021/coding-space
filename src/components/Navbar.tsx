import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { BiCodeCurly } from 'react-icons/bi'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import {Link } from 'react-router-dom'

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const getAvatar = () => {
        if (user.photoURL) {
            return <Avatar alt="User" src={user.photoURL} />
        }
        else if (user.displayName) {
            return <Avatar alt="User" >{user.displayName.charAt(0)}</Avatar>
        }
        else {
            return <Avatar alt="User" >{user.email.charAt(0).toUpperCase()}</Avatar>
        }
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleProfile = () => {
        // Redirect to profile page
        handleClose();
        navigate('/profile');
    }

    const handleAccount = () => {
        // Redirect to account page
        handleClose();
        navigate('/account');
    }

    const handleLogout = async () => {
        // Logout
        handleClose();
        await logOut();
    }

    return (
        <AppBar sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <BiCodeCurly />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                   {/* make link to home */}
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                        Coding Space
                    </Link>
                </Typography>
                <Stack direction="row" spacing={2}>
                    {/* Open this menu on clicking on avatar */}
                    <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        color='inherit'
                        >
                        {user.displayName || user.email}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleAccount}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>  
                    {getAvatar()}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar