import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/admin';
const token = localStorage.getItem('token');

const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
};

const handleError = (error) => {
  if (error.response) {
    // Server responded with a status code outside 2xx
    const message = error.response.data?.message || 
                   error.response.data?.title || 
                   error.response.statusText;
    throw new Error(message || 'Request failed');
  } else if (error.request) {
    // Request was made but no response received
    throw new Error('No response received from server');
  } else {
    // Something happened in setting up the request
    throw new Error(error.message || 'Error setting up request');
  }
};

export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/all-users`, authHeader);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const createUser = async (userData) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/create-user`,
      {
        Name: userData.Name,
        Surname: userData.Surname,
        Email: userData.Email,
        PhoneNumber: userData.PhoneNumber,
        DriverLicense: userData.DriverLicense,
        Password: userData.Password,
        Role: 'User'
      },
      authHeader
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/update-user?id=${id}`,
      {
        Email: userData.Email,
        PhoneNumber: userData.PhoneNumber,
        DriverLicense: userData.DriverLicense
      },
      authHeader
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/delete-user?id=${id}`,
      authHeader
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const searchUsers = async (name, surname) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/search-users?name=${encodeURIComponent(name)}&surname=${encodeURIComponent(surname)}`,
      authHeader
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};