import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Chip,
  Checkbox,
  FormControlLabel,
  Divider,
  Stack,
  MenuItem, 
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import SettingsIcon from '@mui/icons-material/Settings';
import { openBookingModal } from '../../redux/slices/bookingSlice';
import BookingModal from '../booking/BookingModal';

const carTypes = [
  { label: 'Hatchback', value: 'hatchback' },
  { label: 'Sedan', value: 'sedan' },
  { label: 'SUV', value: 'suv' },
  { label: 'Electric', value: 'electric' },
];

const cars = [
  {
    id: 1,
    make: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    fuel: 'Benzine',
    seats: 5,
    price: 35,
    image: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/auto-1957037_1280.jpg',
    transmission: 'Automatic',
    type: 'hatchback',
  },
  {
    id: 2,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    fuel: 'Electric',
    seats: 5,
    price: 70,
    image: 'https://cdn.pixabay.com/photo/2019/12/10/14/55/tesla-4682473_1280.jpg',
    transmission: 'Automatic',
    type: 'electric',
  },
  {
    id: 3,
    make: 'BMW',
    model: '320d',
    year: 2021,
    fuel: 'Diesel',
    seats: 5,
    price: 50,
    image: 'https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_1280.jpg',
    transmission: 'Manual',
    type: 'sedan',
  },
];

export default function RentACar() {
  const dispatch = useDispatch();
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [fuelType, setFuelType] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Filter logic
  const filteredCars = cars.filter(car => {
    const fuelMatch = fuelType ? car.fuel.toLowerCase() === fuelType.toLowerCase() : true;
    const typeMatch = selectedTypes.length > 0 ? selectedTypes.includes(car.type) : true;
    return fuelMatch && typeMatch;
  });

  // Handle car type checkbox
  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Booking handler
  const handleBookNow = (car) => {
    dispatch(openBookingModal(car));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #fff 60%, #1565c0 100%)',
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#1565c0' }}>
          Rent a Car
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          {/* LEFT: Car List */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack spacing={4}>
              {filteredCars.length === 0 && (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography>No cars found for your criteria.</Typography>
                </Paper>
              )}
              {filteredCars.map(car => (
                <Paper
                  key={car.id}
                  elevation={4}
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    bgcolor: '#f7f9fc',
                    minHeight: 140,
                  }}
                >
                  {/* Car Image */}
                  <Box
                    sx={{
                      minWidth: 160,
                      maxWidth: 180,
                      height: 120,
                      overflow: 'hidden',
                      borderRadius: 3,
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={car.image}
                      alt={`${car.make} ${car.model}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  {/* Car Details */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {car.make} {car.model}{' '}
                      <Typography variant="caption" color="text.secondary" component="span">
                        or similar
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {car.year} • {car.transmission}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        icon={<LocalGasStationIcon />}
                        label={car.fuel}
                        size="small"
                        sx={{ bgcolor: '#e3eafc', fontWeight: 500 }}
                      />
                      <Chip
                        icon={<AirlineSeatReclineNormalIcon />}
                        label={`${car.seats} Seats`}
                        size="small"
                        sx={{ bgcolor: '#e3eafc', fontWeight: 500 }}
                      />
                      <Chip
                        icon={<DirectionsCarIcon />}
                        label={car.type.charAt(0).toUpperCase() + car.type.slice(1)}
                        size="small"
                        sx={{ bgcolor: '#e3eafc', fontWeight: 500 }}
                      />
                      <Chip
                        icon={car.fuel === 'Electric' ? <ElectricCarIcon /> : <SettingsIcon />}
                        label={car.transmission}
                        size="small"
                        sx={{ bgcolor: '#e3eafc', fontWeight: 500 }}
                      />
                    </Stack>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ color: '#1565c0', textTransform: 'none', fontWeight: 600 }}
                    >
                      View All Specifications
                    </Button>
                  </Box>
                  {/* Price & Book */}
                  <Box sx={{ minWidth: 150, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                      ${car.price}{' '}
                      <Typography variant="body2" component="span">
                        / day
                      </Typography>
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ borderRadius: 3, fontWeight: 700, mt: 2, px: 4 }}
                      onClick={() => handleBookNow(car)}
                    >
                      Book Now
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>

          {/* RIGHT: Sidebar Search & Filter */}
          <Box sx={{ width: 320, flexShrink: 0 }}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: '#fff',
                position: 'sticky',
                top: 32,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Search & Filter
              </Typography>
              <TextField
                label="Pick-up Location"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Return Location"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Typography variant="caption" color="text.secondary">
                Pick-up Date
              </Typography>
              <DatePicker
                selected={pickupDate}
                onChange={date => setPickupDate(date)}
                placeholderText="Select Date"
                dateFormat="yyyy/MM/dd"
                customInput={
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ mb: 2, mt: 0.5 }}
                  />
                }
              />
              <Typography variant="caption" color="text.secondary">
                Return Date
              </Typography>
              <DatePicker
                selected={returnDate}
                onChange={date => setReturnDate(date)}
                placeholderText="Select Date"
                dateFormat="yyyy/MM/dd"
                customInput={
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ mb: 2, mt: 0.5 }}
                  />
                }
              />
              <TextField
                label="Fuel Type"
                select
                value={fuelType}
                onChange={e => setFuelType(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Benzine">Benzine</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
              </TextField>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Vehicle Type
              </Typography>
              <Stack>
                {carTypes.map(type => (
                  <FormControlLabel
                    key={type.value}
                    control={
                      <Checkbox
                        checked={selectedTypes.includes(type.value)}
                        onChange={() => handleTypeChange(type.value)}
                        color="primary"
                      />
                    }
                    label={type.label}
                  />
                ))}
              </Stack>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, borderRadius: 3, fontWeight: 700, py: 1 }}
              >
                Search
              </Button>
            </Paper>
          </Box>
        </Box>
        <BookingModal />
      </Container>
    </Box>
  );
}
