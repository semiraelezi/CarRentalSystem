import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

const isLoggedIn = !!localStorage.getItem('token');

export default function Navbar() {
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
          <img
            src=""
            alt="Logooo"
            style={{ height: 40, marginRight: 12 }}
          />
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
          <Button component={Link} to="/contact" sx={{ color: '#fff', mx: 1 }}>
            CONTACT
          </Button>
          <Button component={Link} to="/login" sx={{ color: '#fff', mx: 1 }}>
            LOGIN
          </Button>
          {!isLoggedIn && (
            <Button component={Link} to="/register" sx={{ color: '#fff', mx: 1 }}>
              REGISTER
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
