import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

export default function Navbar() {
  const navigate = useNavigate();

  // Check if user is logged in by token presence
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName'); // adjust key if different

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    // remove any other user info you store
    navigate('/'); // redirect to home after logout
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #1565c0 60%, #42a5f5 100%)',
        boxShadow: 3,
      }}
      elevation={3}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
            CarRentalSystem
          </Typography>
        </Box>
        <Box>
          <Button component={Link} to="/" sx={{ color: '#fff', mx: 1 }}>
            HOME
          </Button>
          <Button component={Link} to="/rent" sx={{ color: '#fff', mx: 1 }}>
            RENT A CAR
          </Button>
          <Button component={Link} to="/my-bookings" sx={{ color: '#fff', mx: 1 }}>
            MY BOOKINGS
          </Button>
          <Button component={Link} to="/about" sx={{ color: '#fff', mx: 1 }}>
            ABOUT US
          </Button>
          

          {token ? (
            <>
              <Typography
                component="span"
                sx={{ color: '#fff', mx: 2, fontWeight: 600 }}
              >
                Hello, {userName || 'User'}
              </Typography>
              <Button onClick={handleLogout} sx={{ color: '#fff', mx: 1 }}>
                LOGOUT
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" sx={{ color: '#fff', mx: 1 }}>
                LOGIN
              </Button>
              <Button component={Link} to="/register" sx={{ color: '#fff', mx: 1 }}>
                REGISTER
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
