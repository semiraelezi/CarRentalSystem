const API_BASE_URL = "http://localhost:5000/api/rentals";

export async function createBooking(bookingData) {
  const token = localStorage.getItem("token");
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create booking");
  }

  return response.json();
}
export async function cancelBooking(rentalId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/cancel/${rentalId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to cancel booking");
  }

  return response.json();
}

export async function getUserBookings() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/user`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch bookings");
  }

  return response.json();
}