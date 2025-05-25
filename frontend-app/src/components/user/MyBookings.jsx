import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import { cancelBooking } from '../../redux/slices/bookingSlice';

export default function MyBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector(state => state.bookings);
  const { user } = useSelector(state => state.auth);

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelBooking(bookingId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'cancelled': return 'error';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #fff 60%, #1565c0 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#1565c0' }}>
          My Bookings
        </Typography>
        
        {bookings.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography>You have no bookings yet.</Typography>
            <Typography color="text.secondary">
              Start by browsing our available cars and make your first booking!
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {bookings.map(booking => (
              <Grid item xs={12} key={booking.id}>
                <Paper elevation={4} sx={{ p: 3, borderRadius: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <img
                      src={booking.car.image}
                      alt={`${booking.car.make} ${booking.car.model}`}
                      style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {booking.car.make} {booking.car.model}
                        </Typography>
                        <Chip
                          label={booking.status}
                          color={getStatusColor(booking.status)}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Booking ID: #{booking.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Driver: {booking.driverName} • Phone: {booking.driverPhone}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pickup: {new Date(booking.pickupDate).toLocaleDateString()} at {booking.pickupLocation}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Return: {new Date(booking.returnDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        ${booking.totalCost}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {booking.rentalDays} days
                      </Typography>
                      {booking.status === 'confirmed' && (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{ mt: 1, display: 'block' }}
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
