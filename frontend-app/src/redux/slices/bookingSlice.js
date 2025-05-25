import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
  currentBooking: null,
  isBookingModalOpen: false,
};

export const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    openBookingModal: (state, action) => {
      state.currentBooking = action.payload;
      state.isBookingModalOpen = true;
    },
    closeBookingModal: (state) => {
      state.currentBooking = null;
      state.isBookingModalOpen = false;
    },
    addBooking: (state, action) => {
      const newBooking = {
        id: Date.now(), // Simple ID generation
        ...action.payload,
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
      };
      state.bookings.push(newBooking);
      state.isBookingModalOpen = false;
      state.currentBooking = null;
    },
    cancelBooking: (state, action) => {
      const index = state.bookings.findIndex(booking => booking.id === action.payload);
      if (index !== -1) {
        state.bookings[index].status = 'cancelled';
      }
    },
  },
});

export const { openBookingModal, closeBookingModal, addBooking, cancelBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
