import { Box, Paper, Typography, Grid } from '@mui/material';

export default function AdminHome() {
  // Mock metrics
  const metrics = [
    { label: 'Total Cars', value: 12 },
    { label: 'Total Users', value: 34 },
    { label: 'Total Bookings', value: 21 },
    { label: 'Total Revenue', value: '$4,200' },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Dashboard Overview</Typography>
      <Grid container spacing={3}>
        {metrics.map((m) => (
          <Grid item xs={12} sm={6} md={3} key={m.label}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{m.label}</Typography>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 900 }}>{m.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
