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
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  fetchUsers,
  deleteUser,
  updateUser,
  createUser,
  searchUsers,
} from '../../api/users';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    driverLicense: '',
    password: '',
    confirmPassword: ''
  });
  const [search, setSearch] = useState({ name: '', surname: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user = null) => {
    setIsAddMode(!user);
    setCurrentUser(user);
    setForm(
      user
        ? {
            name: user.name || '',
            surname: user.surname || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            driverLicense: user.driverLicense || '',
            password: '',
            confirmPassword: ''
          }
        : {
            name: '',
            surname: '',
            email: '',
            phoneNumber: '',
            driverLicense: '',
            password: '',
            confirmPassword: ''
          }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (isAddMode) {
      if (!form.name || !form.surname || !form.email || !form.password) {
        setError('Name, surname, email and password are required');
        return false;
      }
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);

      if (isAddMode) {
        await createUser({
          Name: form.name,
          Surname: form.surname,
          Email: form.email,
          PhoneNumber: form.phoneNumber,
          DriverLicense: form.driverLicense,
          Password: form.password
        });
        setSuccess('User created successfully!');
      } else {
        await updateUser(currentUser.id, {
          Email: form.email,
          PhoneNumber: form.phoneNumber,
          DriverLicense: form.driverLicense
        });
        setSuccess('User updated successfully!');
      }

      loadUsers();
      handleCloseDialog();
    } catch (err) {
      setError(err.message || (isAddMode ? 'Failed to create user' : 'Failed to update user'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.email}?`)) {
      try {
        setLoading(true);
        await deleteUser(user.id);
        setSuccess('User deleted successfully!');
        setUsers(prev => prev.filter(u => u.id !== user.id));
      } catch (err) {
        setError(err.message || 'Failed to delete user.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await searchUsers(search.name, search.surname);
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Search failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearch({ name: '', surname: '' });
    loadUsers();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        User Management
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add User
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          name="name"
          label="Name"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
          size="small"
        />
        <TextField
          name="surname"
          label="Surname"
          value={search.surname}
          onChange={(e) => setSearch({ ...search, surname: e.target.value })}
          size="small"
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleReset} disabled={loading}>
          Reset
        </Button>
      </Stack>

      {loading && users.length === 0 ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Driver License</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.surname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.driverLicense}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenDialog(user)} disabled={loading}>
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(user)}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>{isAddMode ? 'Add New User' : 'Edit User'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {isAddMode && (
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Surname"
                  name="surname"
                  value={form.surname}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </>
            )}
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Driver License"
              name="driverLicense"
              value={form.driverLicense}
              onChange={handleChange}
              fullWidth
            />
            {isAddMode && (
              <>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            color={isAddMode ? 'success' : 'primary'}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : isAddMode ? (
              'Create User'
            ) : (
              'Update User'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert onClose={() => setSuccess(null)} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}