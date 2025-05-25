import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import carReducer from './slices/carSlice';
import bookingReducer from './slices/bookingSlice';


export default configureStore({
  reducer: {
    auth: authReducer,
    cars: carReducer,
    bookings: bookingReducer
  }
});
