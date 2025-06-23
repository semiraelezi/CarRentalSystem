import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isBookingModalOpen: false,
  currentBooking: null,  // store all dates as ISO strings here
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    openBookingModal(state, action) {
      state.isBookingModalOpen = true;
      state.currentBooking = { ...action.payload };
    },
    closeBookingModal(state) {
      state.isBookingModalOpen = false;
      state.currentBooking = null;
    },
  }
});

export const { openBookingModal, closeBookingModal } = bookingSlice.actions;
export default bookingSlice.reducer;
