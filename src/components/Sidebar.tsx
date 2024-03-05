import React, { useState } from 'react';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Drawer, Box, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {

    const drawerStyle = {
        width: isCollapsed ? '56px' : '240px',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: 'width 0.5s ease',
        background: '#424242', 
        color: 'white',
    };

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: `${isCollapsed ? '56px' : '240px'} 1fr` }}>
            <Drawer
                variant="permanent"
                sx={drawerStyle}
                PaperProps={{ sx: drawerStyle }}
                open={true}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'flex-end',
                    color: 'grey',
                    padding: '0.6rem'
                }}>
                    <IconButton onClick={toggleSidebar} size="large" sx={{ color: 'white' }}>
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ borderColor: 'white' }} /> 
                <List>
                    <ListItem button>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <DashboardIcon />
                        </ListItemIcon>
                        {!isCollapsed && <ListItemText primary="Dashboard" />}
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
};
