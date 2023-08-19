import { AppBar, Avatar, Button, Icon, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { BiCodeCurly } from 'react-icons/bi'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import {Link } from 'react-router-dom'
import { AccountCircle, DarkMode, LibraryAdd, LightMode, Logout } from '@mui/icons-material'
import { FaClipboardList } from 'react-icons/fa'
import { SiCompilerexplorer } from 'react-icons/si'
import {MdOutlineTaskAlt} from 'react-icons/md'
import useColorMode from '../hooks/useColorMode'

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
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

    const handleDaily = () => {
        // Redirect to daily task page
        handleClose();
        navigate('/daily');
    }


    const handleLogout = async () => {
        // Logout
        handleClose();
        await logOut();
    }

    const handleProblems = () => {
        // Redirect to problems
        handleClose();
        navigate('/problems');
    }

    const handleCompiler = () => {
        // Redirect to compiler
        handleClose();
        navigate('/compiler');
    }

    const handleLibrary = () =>{
        handleClose();
        navigate('/library');
    }

    return (
        <AppBar sx={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000}} >
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
                    <IconButton onClick={toggleColorMode} color="inherit" aria-label="mode">
                        {colorMode === 'light' ? <DarkMode/> : <LightMode/>}
                    </IconButton>

                    {/* Open this menu on clicking on avatar */}
                    <Button
                        variant="contained"
                        disableElevation
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
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
                        <MenuItem onClick={handleDaily}>
                            {/* Icon */}
                            <Stack direction="row" alignItems="center" spacing={1} >
                                <IconButton>
                                    <Icon>
                                        <MdOutlineTaskAlt />
                                    </Icon>
                                </IconButton>
                                <Typography variant="body1" >Daily Task</Typography>
                            </Stack>
                        </MenuItem> 
                        <MenuItem onClick={handleLibrary}>
                            {/* Icon */}
                            <Stack direction="row" alignItems="center" spacing={1} >
                                <IconButton>
                                    <Icon>
                                        <LibraryAdd />
                                    </Icon>
                                </IconButton>
                                <Typography variant="body1" >Your Library</Typography>
                            </Stack>
                        </MenuItem> 
                        <MenuItem onClick={handleCompiler}>
                            {/* Icon */}
                            <Stack direction="row" alignItems="center" spacing={1} >
                                <IconButton>
                                    <Icon>
                                        <SiCompilerexplorer />
                                    </Icon>
                                </IconButton>
                                <Typography variant="body1" >Online Comipler</Typography>
                            </Stack>
                        </MenuItem>
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