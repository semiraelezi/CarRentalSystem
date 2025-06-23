import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Container, Box, Typography, Button, Paper, Chip, Stack, 
  CircularProgress, Alert, FormControlLabel, Checkbox, TextField, MenuItem 
} from '@mui/material';
import { DirectionsCar, LocalGasStation, AirlineSeatReclineNormal, ElectricCar, Settings } from '@mui/icons-material';
import { openBookingModal } from '../../redux/slices/bookingSlice';
import BookingModal from '../booking/BookingModal';
import { fetchCars } from '../../api/cars';

const carTypes = [
  { label: 'Hatchback', value: 'hatchback' },
  { label: 'Sedan', value: 'sedan' },
  { label: 'SUV', value: 'suv' },
  { label: 'Electric', value: 'electric' },
];

export default function RentACar() {
  const dispatch = useDispatch();
  const [fuelType, setFuelType] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        setCars(data);
      } catch (err) {
        setError('Failed to load cars. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  const filteredCars = cars.filter(car => {
    const fuelMatch = fuelType ? car.fuel?.toLowerCase() === fuelType.toLowerCase() : true;
    const typeMatch = selectedTypes.length > 0 ? selectedTypes.includes(car.type) : true;
    return fuelMatch && typeMatch;
  });

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleBookNow = (car) => {
    const today = new Date();
    const defaultRental = {
      carId: car.id,
      carType: car.type,
      make: car.make,
      model: car.model,
      pickupLocation: '',
      returnLocation: '',
      pickUpDate: today.toISOString().slice(0,10),
      returnDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0,10),
      name: '',
      surname: '',
      email: '',
      phoneNumber: '',
      driversLicenseNumber: '',
      pricePerDay: car.pricePerDay
    };

    dispatch(openBookingModal(defaultRental));
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 10 }} />;
  if (error) return <Alert severity="error" sx={{ my: 4 }}>{error}</Alert>;

  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#1565c0' }}>
          Rent a Car
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Stack spacing={4}>
              {filteredCars.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography>No cars found matching your filters</Typography>
                </Paper>
              ) : filteredCars.map(car => (
                <Paper key={car.id} elevation={4} sx={{ p: 2, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {car.make} {car.model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {car.year} • {car.transmission}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Chip icon={<LocalGasStation />} label={car.fuel} size="small" />
                      <Chip icon={<AirlineSeatReclineNormal />} label={`${car.seats} Seats`} size="small" />
                      <Chip icon={<DirectionsCar />} label={car.type} size="small" />
                      <Chip icon={car.fuel === 'Electric' ? <ElectricCar /> : <Settings />} 
                            label={car.transmission} size="small" />
                    </Stack>
                  </Box>
                  <Box sx={{ minWidth: 150, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                      ${car.pricePerDay} <Typography component="span">/ day</Typography>
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ mt: 2, px: 4 }}
                      onClick={() => handleBookNow(car)}
                    >
                      Book Now
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
          <Box sx={{ minWidth: 250, p: 3, bgcolor: '#f7f9fc', borderRadius: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Filters</Typography>
            <Stack spacing={3}>
              <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Car Type</Typography>
                {carTypes.map(type => (
                  <FormControlLabel
                    key={type.value}
                    control={<Checkbox checked={selectedTypes.includes(type.value)} 
                    onChange={() => handleTypeChange(type.value)} />}
                    label={type.label}
                  />
                ))}
              </div>
              <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Fuel Type</Typography>
                <TextField
                  select
                  fullWidth
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  size="small"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Petrol">Petrol</MenuItem>
                  <MenuItem value="Diesel">Diesel</MenuItem>
                  <MenuItem value="Electric">Electric</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </TextField>
              </div>
            </Stack>
          </Box>
        </Box>

        <BookingModal />
      </Container>
    </Box>
  );
}