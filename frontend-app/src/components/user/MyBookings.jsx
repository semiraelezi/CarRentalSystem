import React, { useEffect, useState } from 'react';
import { cancelBooking, getUserBookings } from '../../api/bookings';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelLoadingId, setCancelLoadingId] = useState(null);

  const fetchBookings = async () => {
    try {
      setError('');
      setLoading(true);
      const data = await getUserBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (rentalId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      setCancelLoadingId(rentalId);
      await cancelBooking(rentalId);
      await fetchBookings(); // Refresh the list
    } catch (err) {
      alert(err.message);
    } finally {
      setCancelLoadingId(null);
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 10 }} />;
  if (error) return <Alert severity="error" sx={{ my: 4 }}>{error}</Alert>;

  if (bookings.length === 0) return (
    <Typography sx={{ mt: 6, textAlign: 'center' }}>You have no active bookings.</Typography>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1565c0' }}>
        My Bookings
      </Typography>
      <Stack spacing={3}>
        {bookings.map(booking => {
          const pickUpDate = new Date(booking.pickUpDate);
          const returnDate = new Date(booking.returnDate);
          const days = (returnDate - pickUpDate) / (1000 * 60 * 60 * 24);
          
          return (
            <Paper key={booking.id} sx={{ p: 3, borderRadius: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {booking.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {pickUpDate.toLocaleDateString()} - {returnDate.toLocaleDateString} ({days} days)
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip label={`Pickup: ${booking.pickupLocation}`} size="small" />
                    <Chip label={`Return: ${booking.returnLocation}`} size="small" />
                  </Stack>
                  <Typography>
                    {booking.name} {booking.surname} • {booking.phoneNumber}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    ${booking.totalPrice.toFixed(2)}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    disabled={cancelLoadingId === booking.id || booking.status === 'Cancelled'}
                    onClick={() => handleCancel(booking.id)}
                    sx={{ mt: 1 }}
                  >
                    {cancelLoadingId === booking.id 
                      ? 'Cancelling...' 
                      : booking.status === 'Cancelled' 
                        ? 'Already Cancelled' 
                        : 'Cancel Booking'}
                  </Button>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}