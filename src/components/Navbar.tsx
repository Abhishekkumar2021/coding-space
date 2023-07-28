import { AppBar, Avatar, Button, Icon, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { BiCodeCurly } from 'react-icons/bi'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import {Link } from 'react-router-dom'
import { AccountCircle, Logout } from '@mui/icons-material'
import {SiCodeforces, SiLeetcode} from 'react-icons/si'
import { FaClipboardList } from 'react-icons/fa'

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


    const handleLogout = async () => {
        // Logout
        handleClose();
        await logOut();
    }

    const handleCodeforces = () => {
        // Redirect to codeforces
        handleClose();
        navigate('/codeforces');
    }

    const handleLeetcode = () => {
        // Redirect to leetcode
        handleClose();
        navigate('/leetcode');
    }

    const handleProblems = () => {
        // Redirect to problems
        handleClose();
        navigate('/problems');
    }

    return (
        <AppBar sx={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000, backgroundColor: 'white', color:'black' }}>
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
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Coding Space
                    </Link>
                </Typography>
                <Stack direction="row" spacing={2}>
                    {/* Open this menu on clicking on avatar */}
                    <Button
                        variant="outlined"
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
                        <MenuItem onClick={handleProfile}>
                            {/* Icon */}
                            <Stack direction="row" alignItems="center" spacing={1} >
                                <IconButton>
                                    <Icon>
                                        <AccountCircle />
                                    </Icon>
                                </IconButton>
                                <Typography variant="body1" >My Profile</Typography>
                            </Stack>
                        </MenuItem>
                        <MenuItem onClick={handleCodeforces}>
                            {/* Icon */}
                            <Stack direction="row" alignItems="center" spacing={1} >
                                <IconButton>
                                    <Icon>
                                        <SiCodeforces/>
                                    </Icon>
                                </IconButton>
                                <Typography variant="body1" >Codeforces</Typography>
                            </Stack>
                        </MenuItem>
                        <MenuItem onClick={handleLeetcode}>
                            {/* Icon */}
                            <Stack direction="row" alignItems="center" spacing={1} >
                                <IconButton>
                                    <Icon>
                                        <SiLeetcode/>
                                    </Icon>
                                </IconButton>
                                <Typography variant="body1" >Leetcode</Typography>
                            </Stack>
                        </MenuItem>
                        <MenuItem onClick={handleProblems}>
                            {/* Icon */}
                            <Stack direction="row" alignItems="center" spacing={1} >
                                <IconButton>
                                    <Icon>
                                        <FaClipboardList />
                                    </Icon>
                                </IconButton>
                                <Typography variant="body1" >All problems</Typography>
                            </Stack>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            {/* Icon */}
                            <Stack direction="row" alignItems="center" spacing={1} >
                                <IconButton>
                                    <Icon>
                                        <Logout />
                                    </Icon>
                                </IconButton>
                                <Typography variant="body1" >Logout</Typography>
                            </Stack>
                        </MenuItem>
                    </Menu>  
                    {getAvatar()}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar