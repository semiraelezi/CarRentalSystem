import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Link } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // You can add authentication logic here

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #fff 60%, #1565c0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <img
              src="https://trilon.mk/wp-content/uploads/2021/06/cropped-logo-1.png"
              alt="Logo"
              style={{ width: 60, marginBottom: 10 }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1565c0' }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>
          <form>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={{ bgcolor: '#f7f9fc', borderRadius: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
              sx={{ bgcolor: '#f7f9fc', borderRadius: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2, borderRadius: 3, fontWeight: 700 }}
            >
              Login
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link href="/register" underline="hover" color="#1565c0">
              Don&apos;t have an account? Register
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
