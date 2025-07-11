import React from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from '../state/index.js'
import profileImage from "../assets/profile.jpeg"
import { useState } from 'react'
import { AppBar, Button, IconButton, InputBase, MenuItem, Toolbar, useTheme, Menu, Box, Typography } from '@mui/material'

function Navbar({
    isSidebarOpen,
    setIsSidebarOpen
}) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [ anchorEl, setAnchorEl ] = useState(null)
    const isOPen = Boolean(anchorEl);
    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

  return (
    <AppBar sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
    }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* {Leftside} */}
            <FlexBetween sx={{ gap: "8px" }}>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon/>
                </IconButton>
                <FlexBetween 
                backgroundColor = {theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1rem"
                >
                    <InputBase placeholder='Search'/>
                    <IconButton>
                        <Search/>
                    </IconButton>
                </FlexBetween>
            </FlexBetween>

            {/* {Right Side} */}
            <FlexBetween gap="1.5rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlined sx={{ fontSize: "25px" }}/>
                    ) : (
                        <LightModeOutlined sx={{ fontSize: "25px" }}/>
                    )}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{ fontSize: "25px" }}/>
                </IconButton>

                <FlexBetween >
                    <Button onClick={handleClick} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "0.5rem"}}>
                        <Box
                        component="img"
                        alt="profile"
                        src={profileImage}
                        height="32px"
                        width="32px"
                        borderRadius="50%"
                        sx={{ objectFit: "cover" }}
                        />
                        <Box textAlign="left">
                            <Typography
                                fontWeight="bold"
                                fontSize="0.85rem"
                                sx={{ color: theme.palette.secondary[100] }}
                            >
                                {"Aditya"}
                            </Typography>
                            <Typography
                                fontSize="0.75rem"
                                sx={{ color: theme.palette.secondary[200] }}
                            >
                                {"user"}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined
                        sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                        />
                    </Button>
                    <Menu anchorEl={anchorEl} open={isOPen} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                        <MenuItem onClick={handleClose}>
                            Logout
                        </MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
