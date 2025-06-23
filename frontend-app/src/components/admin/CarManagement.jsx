import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { fetchCars, saveCar, deleteCar } from '../../api/cars';

const fuelOptions = ['Benzine', 'Diesel', 'Electric'];
const typeOptions = ['hatchback', 'sedan', 'suv', 'electric'];

export default function CarManagement() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    fuel: '',
    seats: '',
    price: '',
    transmission: '',
    type: '',
    licensePlate: '',
    color: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  const handleOpen = (car = null) => {
    setEditingCar(car);
    setForm(
      car
        ? {
            ...car,
            price: car.pricePerDay ?? car.price ?? '',
            seats: car.seats?.toString() ?? '',
            year: car.year?.toString() ?? '',
            transmission: car.transmission ?? '',
            fuel: car.fuel ?? '',
            type: car.type ?? '',
            licensePlate: car.licensePlate ?? '',
            make: car.make ?? '',
            model: car.model ?? '',
            color: car.color ?? '',
          }
        : {
            make: '',
            model: '',
            year: '',
            fuel: '',
            seats: '',
            price: '',
            transmission: '',
            type: '',
            licensePlate: '',
            color: '',
          }
    );
    setOpen(true);
    setError(null);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCar(null);
    setError(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const {
      make, model, year, fuel, seats,
      price, transmission, type, licensePlate,
      color,
    } = form;

    if (
      !make || !model || !year || !fuel || !seats || !price ||
      !transmission || !type || !licensePlate || !color
    ) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const carData = {
        make,
        model,
        year,
        fuel,
        seats,
        price,
        transmission,
        type,
        licensePlate,
        color,
      };
      if (editingCar) {
        carData.id = editingCar.carId ?? editingCar.id;
      }
      const savedCar = await saveCar(carData);

      if (editingCar) {
        setCars((prev) =>
          prev.map((car) =>
            car.carId === savedCar.carId || car.id === savedCar.id ? savedCar : car
          )
        );
      } else {
        setCars((prev) => [...prev, savedCar]);
      }
      handleClose();
    } catch (err) {
      alert(err.message || 'Failed to save car');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        setLoading(true);
        await deleteCar(id);
        setCars((prev) => prev.filter((car) => car.carId !== id && car.id !== id));
      } catch (err) {
        alert(err.message || 'Failed to delete car');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Car Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        sx={{ mb: 2, borderRadius: 2 }}
        onClick={() => handleOpen()}
      >
        Add Car
      </Button>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Fuel</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price/Day</TableCell>
              <TableCell>Transmission</TableCell>
              <TableCell>License Plate</TableCell>
              <TableCell>Color</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  No cars available.
                </TableCell>
              </TableRow>
            )}
            {cars.map((car) => (
              <TableRow key={car.carId ?? car.id}>
                <TableCell>{car.make}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.fuel}</TableCell>
                <TableCell>{car.seats}</TableCell>
                <TableCell>{car.type}</TableCell>
                <TableCell>${car.pricePerDay ?? car.price}</TableCell>
                <TableCell>{car.transmission}</TableCell>
                <TableCell>{car.licensePlate}</TableCell>
                <TableCell>{car.color}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(car)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(car.carId ?? car.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCar ? 'Edit Car' : 'Add Car'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Make" name="make" value={form.make} onChange={handleChange} fullWidth />
            <TextField label="Model" name="model" value={form.model} onChange={handleChange} fullWidth />
            <TextField
              label="Year"
              name="year"
              value={form.year}
              onChange={handleChange}
              fullWidth
              type="number"
              inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
            />
            <TextField
              label="Fuel"
              name="fuel"
              value={form.fuel}
              onChange={handleChange}
              select
              fullWidth
            >
              {fuelOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Seats"
              name="seats"
              value={form.seats}
              onChange={handleChange}
              fullWidth
              type="number"
              inputProps={{ min: 1, max: 15 }}
            />
            <TextField
              label="Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              select
              fullWidth
            >
              {typeOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Price per Day"
              name="price"
              value={form.price}
              onChange={handleChange}
              fullWidth
              type="number"
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Transmission"
              name="transmission"
              value={form.transmission}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="License Plate"
              name="licensePlate"
              value={form.licensePlate}
              onChange={handleChange}
              fullWidth
            />
            <TextField label="Color" name="color" value={form.color} onChange={handleChange} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
            {editingCar ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
