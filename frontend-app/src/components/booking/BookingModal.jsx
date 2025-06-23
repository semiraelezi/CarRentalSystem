import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, Button, TextField, Stack } from '@mui/material';
import { closeBookingModal } from '../../redux/slices/bookingSlice';
import { createBooking } from '../../api/bookings';

export default function BookingModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.bookings.isBookingModalOpen);
  const booking = useSelector(state => state.bookings.currentBooking);

  const [formData, setFormData] = useState({
    carId: '',
    carType: '',
    make: '',
    model: '',
    pickupLocation: '',
    returnLocation: '',
    pickUpDate: '',
    returnDate: '',
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    driversLicenseNumber: '',
    pricePerDay: 0
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (booking) {
      setFormData({
        carId: booking.carId || '',
        carType: booking.carType || '',
        make: booking.make || '',
        model: booking.model || '',
        pickupLocation: booking.pickupLocation || '',
        returnLocation: booking.returnLocation || '',
        pickUpDate: booking.pickUpDate || '',
        returnDate: booking.returnDate || '',
        name: booking.name || '',
        surname: booking.surname || '',
        email: booking.email || '',
        phoneNumber: booking.phoneNumber || '',
        driversLicenseNumber: booking.driversLicenseNumber || '',
        pricePerDay: booking.pricePerDay || 0
      });
    }
  }, [booking]);

  const handleClose = () => {
    dispatch(closeBookingModal());
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotalPrice = () => {
    if (!formData.pickUpDate || !formData.returnDate) return 0;
    const days = Math.max(1, (new Date(formData.returnDate) - new Date(formData.pickUpDate)) / (1000 * 60 * 60 * 24));
    return (days * formData.pricePerDay).toFixed(2);
  };

  const validateForm = () => {
    if (
      !formData.pickupLocation.trim() ||
      !formData.returnLocation.trim() ||
      !formData.pickUpDate ||
      !formData.returnDate ||
      !formData.name.trim() ||
      !formData.surname.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.driversLicenseNumber.trim()
    ) {
      alert('Please fill in all fields');
      return false;
    }
    if (new Date(formData.pickUpDate) > new Date(formData.returnDate)) {
      alert('Return date must be after pickup date');
      return false;
    }
    return true;
  };

  const handleConfirm = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Only send the fields your backend expects:
      const bookingData = {
        carId: formData.carId,
        carType: formData.carType,
        pickupLocation: formData.pickupLocation,
        returnLocation: formData.returnLocation,
        pickUpDate: formData.pickUpDate,
        returnDate: formData.returnDate,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        driversLicenseNumber: formData.driversLicenseNumber
      };

      await createBooking(bookingData);
      alert('Booking confirmed!');
      handleClose();
    } catch (err) {
      alert(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 400,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Book: {formData.make} {formData.model}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
          ${formData.pricePerDay}/day • Total: ${calculateTotalPrice()}
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Pickup Location"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Return Location"
            name="returnLocation"
            value={formData.returnLocation}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Pick Up Date"
            name="pickUpDate"
            type="date"
            value={formData.pickUpDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Return Date"
            name="returnDate"
            type="date"
            value={formData.returnDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="First Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Driver's License Number"
            name="driversLicenseNumber"
            value={formData.driversLicenseNumber}
            onChange={handleChange}
            fullWidth
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirm} disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
