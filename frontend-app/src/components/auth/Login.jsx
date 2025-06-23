import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth';
import {
  Alert,
  Button,
  TextField,
  Paper,
  Container,
  Box,
  Typography,
  Snackbar,
  Link
} from '@mui/material';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await loginUser(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('roles', JSON.stringify(data.roles));  // STORE ROLES
      localStorage.setItem('userName', data.name);                  // STORE USER NAME
      
      setSuccess(true);

      // Redirect based on role:
      if (data.roles.includes('Admin')) {
        setTimeout(() => navigate('/admin'), 1500);  // Admin route
      } else {
        setTimeout(() => navigate('/'), 1500); // Normal user route
      }
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="xs">
        <Paper sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#1565c0' }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 3, fontWeight: 700 }}>
              Login
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link href="/register" underline="hover" color="#1565c0">
              Don't have an account? Register
            </Link>
          </Box>
        </Paper>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          message="Login successful!"
        />
      </Container>
    </Box>
  );
}
