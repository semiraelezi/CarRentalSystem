import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CircularProgress,
  Alert,
  Paper,
  Chip,
} from '@mui/material';
import { fetchCars } from '../../api/cars';
// Import Link from react-router-dom for navigation
import { Link as RouterLink } from 'react-router-dom';

export default function HomePage() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredCars = cars.filter(car =>
    (car.make?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (car.model?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (car.type?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff' }}>
      {/* Blue background for the search card */}
      <Box sx={{ 
        background: '#1976d2',
        pt: 8, pb: 6, px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}>
        <Typography variant="h3" sx={{ 
          fontWeight: 'bold', 
          mb: 2, 
          textAlign: 'center',
          color: '#fff'
        }}>
          PREMIUM <br /> CAR RENTAL <br /> IN MACEDONIA!
        </Typography>

        {/* Search card with improved design */}
        <Paper
          elevation={8}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            p: 3,
            mt: 2,
            borderRadius: 3,
            minWidth: 300,
            maxWidth: 1000,
            width: '100%',
            gap: 2,
            background: '#fff',
          }}
        >
          <TextField
            label="Pick-up Location"
            variant="outlined"
            sx={{ flex: 1 }}
            size="small"
          />
          <TextField
            label="Return Location"
            variant="outlined"
            sx={{ flex: 1 }}
            size="small"
          />
          <TextField
            label="Pick-up Date-Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1 }}
            size="small"
          />
          <TextField
            label="Return Date-Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1 }}
            size="small"
          />
          <TextField
            label="Search car..."
            variant="outlined"
            sx={{ flex: 1 }}
            size="small"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ 
              px: 4, 
              height: 40,
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 2
            }}
          >
            SEARCH
          </Button>
        </Paper>
      </Box>

      {/* Car Listing Section - UPDATED CARD DESIGN */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : filteredCars.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No cars found matching your search
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredCars.map(car => (
              <Grid item xs={12} key={car.carId || car.id}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 4,
                    boxShadow: 2,
                    p: 2,
                    minHeight: 140,
                  }}
                >
                  {/* Car Details */}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {car.make} {car.model}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        &nbsp;or similar
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {car.year} • {car.transmission}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                      <Chip label={car.fuel} size="small" />
                      <Chip label={`${car.seats} Seats`} size="small" />
                      <Chip 
                        label={car.type.charAt(0).toUpperCase() + car.type.slice(1)} 
                        size="small" 
                      />
                      <Chip label={car.transmission} size="small" />
                    </Box>
                  </Box>
                  
                  {/* Price and Button */}
                  <Box sx={{ minWidth: 120, textAlign: 'right', ml: 2 }}>
                    <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                      ${car.pricePerDay}
                      <Typography component="span" variant="body2" color="text.secondary">
                        &nbsp;/ day
                      </Typography>
                    </Typography>
                    <Button
                      component={RouterLink}
                      to="/rent"
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 2,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        px: 3,
                        boxShadow: 1,
                      }}
                    >
                      BOOK NOW
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
