import { Container, Typography, Box } from '@mui/material';

export default function AboutUs() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#1565c0' }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome to CarRental! We are dedicated to providing premium car rental services across Macedonia.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Our mission is to make your travel experience smooth, comfortable, and affordable. With a diverse fleet of vehicles and a passionate team, we ensure you get the best service every time.
        </Typography>
        <Typography variant="body1">
          Thank you for choosing us for your journey!
        </Typography>
      </Box>
    </Container>
  );
}
