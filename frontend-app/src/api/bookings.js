// Simulated API calls for bookings
export async function fetchBookings() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 101,
            car: { id: 1, make: 'Volkswagen', model: 'Golf', licensePlate: 'SK-1234-AB' },
            user: { id: 1, name: 'John Doe', phone: '123456789' },
            pickupDate: '2025-06-01',
            returnDate: '2025-06-05',
            pickupLocation: 'Skopje',
            returnLocation: 'Skopje',
            status: 'confirmed',
            totalCost: 140,
          },
          // ...more mock bookings
        ]);
      }, 400);
    });
  }
  
  export async function updateBookingStatus(bookingId, status) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, bookingId, status });
      }, 300);
    });
  }
  