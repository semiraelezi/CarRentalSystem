import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Divider,
  Paper,
  Alert,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { closeBookingModal, addBooking } from '../../redux/slices/bookingSlice';

export default function BookingModal() {
  const dispatch = useDispatch();
  const { isBookingModalOpen, currentBooking } = useSelector(state => state.bookings);
  const { user } = useSelector(state => state.auth);

  // Form state
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [driverName, setDriverName] = useState(user?.name || '');
  const [driverPhone, setDriverPhone] = useState(user?.phone || '');
  const [driverLicense, setDriverLicense] = useState('');

  // Calculate rental days and total cost
  const calculateCost = () => {
    if (!pickupDate || !returnDate || !currentBooking) return 0;
    const days = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
    return days * currentBooking.price;
  };

  const handleSubmit = () => {
    if (!pickupDate || !returnDate || !pickupLocation || !driverName || !driverPhone || !driverLicense) {
      alert('Please fill in all required fields');
      return;
    }

    const bookingData = {
      car: currentBooking,
      pickupDate: pickupDate.toISOString(),
      returnDate: returnDate.toISOString(),
      pickupLocation,
      returnLocation: returnLocation || pickupLocation,
      driverName,
      driverPhone,
      driverLicense,
      totalCost: calculateCost(),
      rentalDays: Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24)),
    };

    dispatch(addBooking(bookingData));
    alert('Booking confirmed successfully!');
    handleClose();
  };

  const handleClose = () => {
    dispatch(closeBookingModal());
    // Reset form
    setPickupDate(null);
    setReturnDate(null);
    setPickupLocation('');
    setReturnLocation('');
    setDriverLicense('');
  };

  if (!currentBooking) return null;

  return (
    <Dialog
      open={isBookingModalOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4 }
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1565c0' }}>
          Book Your Car
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {currentBooking.make} {currentBooking.model}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3}>
          {/* Car Summary */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2, bgcolor: '#f7f9fc', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img
                  src={currentBooking.image}
                  alt={`${currentBooking.make} ${currentBooking.model}`}
                  style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {currentBooking.make} {currentBooking.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentBooking.year} • {currentBooking.fuel} • {currentBooking.seats} Seats
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${currentBooking.price} / day
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Rental Dates */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Pickup Date *
            </Typography>
            <DatePicker
              selected={pickupDate}
              onChange={date => setPickupDate(date)}
              minDate={new Date()}
              placeholderText="Select pickup date"
              dateFormat="yyyy/MM/dd"
              customInput={
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: '#fff', borderRadius: 2 }}
                />
              }
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Return Date *
            </Typography>
            <DatePicker
              selected={returnDate}
              onChange={date => setReturnDate(date)}
              minDate={pickupDate || new Date()}
              placeholderText="Select return date"
              dateFormat="yyyy/MM/dd"
              customInput={
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: '#fff', borderRadius: 2 }}
                />
              }
            />
          </Grid>

          {/* Locations */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pickup Location *"
              value={pickupLocation}
              onChange={e => setPickupLocation(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Return Location (optional)"
              value={returnLocation}
              onChange={e => setReturnLocation(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
          </Grid>

          {/* Driver Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Driver Information
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Driver Name *"
              value={driverName}
              onChange={e => setDriverName(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number *"
              value={driverPhone}
              onChange={e => setDriverPhone(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Driver License Number *"
              value={driverLicense}
              onChange={e => setDriverLicense(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
          </Grid>

          {/* Cost Summary */}
          {pickupDate && returnDate && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Paper elevation={2} sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Booking Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Rental Days:</Typography>
                  <Typography>{Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24))} days</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Daily Rate:</Typography>
                  <Typography>${currentBooking.price}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total Cost:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1565c0' }}>
                    ${calculateCost()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} color="inherit" size="large">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: 3, fontWeight: 700, px: 4 }}
        >
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
}
