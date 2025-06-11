import { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Paper, Grid } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CarSearch() {
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #fff 60%, #1565c0 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, color: '#222' }}>
              PREMIUM<br />CAR RENTAL<br />IN MACEDONIA!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right', position: 'relative' }}>
            <img
              src="https://cdn.pixabay.com/photo/2017/01/06/19/15/auto-1957037_1280.jpg"
              alt="Car"
              style={{ width: '100%', maxWidth: 550, zIndex: 2 }}
            />
          </Grid>
        </Grid>
        <Paper
          elevation={6}
          sx={{
            p: 2,
            mt: { xs: 4, md: -8 },
            maxWidth: 900,
            mx: 'auto',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            position: 'relative',
            zIndex: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">Pick-up Location</Typography>
            <TextField fullWidth placeholder="Pick-Up Location" variant="outlined" size="small" sx={{ bgcolor: '#fff', borderRadius: 2 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">Return Location</Typography>
            <TextField fullWidth placeholder="Return Location" variant="outlined" size="small" sx={{ bgcolor: '#fff', borderRadius: 2 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">Pick-up and Return Date-Time</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <DatePicker
                selected={pickupDate}
                onChange={date => setPickupDate(date)}
                placeholderText="Select Date-Time"
                showTimeSelect
                dateFormat="Pp"
                customInput={<TextField variant="outlined" size="small" sx={{ bgcolor: '#fff', borderRadius: 2, width: 130 }} />}
              />
              <DatePicker
                selected={returnDate}
                onChange={date => setReturnDate(date)}
                placeholderText="Select Date-Time"
                showTimeSelect
                dateFormat="Pp"
                customInput={<TextField variant="outlined" size="small" sx={{ bgcolor: '#fff', borderRadius: 2, width: 130 }} />}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ height: 48, borderRadius: 3, px: 4, fontWeight: 700 }}
          >
            SEARCH
          </Button>
        </Paper>
      </Container>
      {/* Decorative blue shape in the background */}
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: { xs: '70vw', md: '50vw' },
          height: { xs: '50vw', md: '40vw' },
          bgcolor: '#1565c0',
          borderTopLeftRadius: '50vw',
          zIndex: 0,
        }}
      />
    </Box>
  );
}
