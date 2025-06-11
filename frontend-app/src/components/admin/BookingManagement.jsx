import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fetchBookings, updateBookingStatus } from '../../api/bookings';

// Mock bookings data for demonstration
const initialBookings = [
  {
    id: 101,
    car: { make: 'Volkswagen', model: 'Golf', licensePlate: 'SK-1234-AB' },
    user: { name: 'John Doe', phone: '123456789' },
    pickupDate: '2025-06-01',
    returnDate: '2025-06-05',
    pickupLocation: 'Skopje',
    returnLocation: 'Skopje',
    status: 'confirmed',
    totalCost: 140,
  },
  {
    id: 102,
    car: { make: 'Tesla', model: 'Model 3', licensePlate: 'SK-5678-CD' },
    user: { name: 'Jane Smith', phone: '987654321' },
    pickupDate: '2025-06-10',
    returnDate: '2025-06-15',
    pickupLocation: 'Ohrid',
    returnLocation: 'Skopje',
    status: 'cancelled',
    totalCost: 350,
  },
];

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const handleOpen = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null);
  };

  const handleCancel = async (id) => {
    try {
      await updateBookingStatus(id, 'cancelled');
      setBookings(prev => prev.map(b => b.id === id ? {...b, status: 'cancelled'} : b));
      handleClose();
    } catch (err) {
      alert('Failed to cancel booking');
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateBookingStatus(id, 'completed');
      setBookings(prev => prev.map(b => b.id === id ? {...b, status: 'completed'} : b));
      handleClose();
    } catch (err) {
      alert('Failed to complete booking');
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

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Booking Management
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Car</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Pickup</TableCell>
              <TableCell>Return</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>#{booking.id}</TableCell>
                <TableCell>
                  {booking.car.make} {booking.car.model}
                  <br />
                  <Typography variant="caption" color="text.secondary">
                    {booking.car.licensePlate}
                  </Typography>
                </TableCell>
                <TableCell>
                  {booking.user.name}
                  <br />
                  <Typography variant="caption" color="text.secondary">
                    {booking.user.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  {booking.pickupDate}
                  <br />
                  <Typography variant="caption" color="text.secondary">
                    {booking.pickupLocation}
                  </Typography>
                </TableCell>
                <TableCell>
                  {booking.returnDate}
                  <br />
                  <Typography variant="caption" color="text.secondary">
                    {booking.returnLocation}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    color={getStatusColor(booking.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>${booking.totalCost}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleOpen(booking)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent dividers>
          {selectedBooking && (
            <>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Car: {selectedBooking.car.make} {selectedBooking.car.model} ({selectedBooking.car.licensePlate})
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                User: {selectedBooking.user.name} ({selectedBooking.user.phone})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2">
                <strong>Pickup:</strong> {selectedBooking.pickupDate} at {selectedBooking.pickupLocation}
              </Typography>
              <Typography variant="body2">
                <strong>Return:</strong> {selectedBooking.returnDate} at {selectedBooking.returnLocation}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {selectedBooking.status}
              </Typography>
              <Typography variant="body2">
                <strong>Total Cost:</strong> ${selectedBooking.totalCost}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Close
          </Button>
          {selectedBooking && selectedBooking.status === 'confirmed' && (
            <>
              <Button
                color="error"
                startIcon={<CancelIcon />}
                onClick={() => handleCancel(selectedBooking.id)}
              >
                Cancel
              </Button>
              <Button
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={() => handleComplete(selectedBooking.id)}
              >
                Mark as Completed
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
