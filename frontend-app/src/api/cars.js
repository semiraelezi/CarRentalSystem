const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function for error handling
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData.message || `Request failed with status ${res.status}`;
    throw new Error(errorMessage);
  }
  return res.json();
};

export async function fetchCars() {
  const res = await fetch('/api/car', {
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}

// Helper to prepare car data
const prepareCarData = (car) => ({
  make: car.make,
  model: car.model,
  year: Number(car.year),
  fuel: car.fuel,
  seats: Number(car.seats),
  pricePerDay: Number(car.price),
  transmission: car.transmission,
  type: car.type,
  licensePlate: car.licensePlate,
  color: car.color,
});

export async function saveCar(car) {
  const headers = getAuthHeaders();
  const body = JSON.stringify(prepareCarData(car));

  if (car.id || car.carId) {
    const id = car.id ?? car.carId;
    const res = await fetch(`/api/car/${id}`, {
      method: 'PUT',
      headers,
      body,
    });
    return handleResponse(res);
  } else {
    const res = await fetch('/api/car', {
      method: 'POST',
      headers,
      body,
    });
    return handleResponse(res);
  }
}

export async function deleteCar(id) {
  const res = await fetch(`/api/car/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}
