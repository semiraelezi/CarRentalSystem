import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';

export default function ContactUs() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1565c0' }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Have a question or need assistance? Fill out the form below and our team will get back to you soon!
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField label="Name" fullWidth sx={{ mb: 2 }} />
          <TextField label="Email" type="email" fullWidth sx={{ mb: 2 }} />
          <TextField label="Message" multiline rows={4} fullWidth sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
