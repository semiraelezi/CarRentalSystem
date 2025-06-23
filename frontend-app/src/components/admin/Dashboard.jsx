import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Divider,
} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';

import AdminHome from './AdminHome';
import CarManagement from './CarManagement';
import UserManagement from './UserManagement';
import BookingManagement from './BookingManagement';

const drawerWidth = 240;

export default function Dashboard() {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f4f6fa' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: '#1565c0' }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#1565c0',
            color: '#fff',
          },
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', py: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            CarRental Admin
          </Typography>
        </Toolbar>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin"
              selected={location.pathname === '/admin'}
              sx={{
                bgcolor: location.pathname === '/admin' ? 'rgba(255,255,255,0.15)' : 'inherit',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/cars"
              selected={location.pathname === '/admin/cars'}
              sx={{
                bgcolor: location.pathname === '/admin/cars' ? 'rgba(255,255,255,0.15)' : 'inherit',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>
                <DirectionsCarIcon />
              </ListItemIcon>
              <ListItemText primary="Cars" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/users"
              selected={location.pathname === '/admin/users'}
              sx={{
                bgcolor: location.pathname === '/admin/users' ? 'rgba(255,255,255,0.15)' : 'inherit',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/bookings"
              selected={location.pathname === '/admin/bookings'}
              sx={{
                bgcolor: location.pathname === '/admin/bookings' ? 'rgba(255,255,255,0.15)' : 'inherit',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Bookings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Routes>
          <Route path="" element={<AdminHome />} />
          <Route path="cars" element={<CarManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
        </Routes>
      </Box>
    </Box>
  );
}
