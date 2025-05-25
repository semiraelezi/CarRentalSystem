// src/api/cars.js
export async function fetchCars() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            make: 'Volkswagen',
            model: 'Golf',
            year: 2022,
            fuel: 'Benzine',
            seats: 5,
            price: 35,
            transmission: 'Automatic',
            type: 'hatchback',
            licensePlate: 'SK-1234-AB',
            color: 'Blue',
          },
          {
            id: 2,
            make: 'Tesla',
            model: 'Model 3',
            year: 2023,
            fuel: 'Electric',
            seats: 5,
            price: 70,
            transmission: 'Automatic',
            type: 'electric',
            licensePlate: 'SK-5678-CD',
            color: 'White',
          },
        ]);
      }, 400);
    });
  }
  
  export async function saveCar(carData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...carData, id: carData.id || Date.now() });
      }, 300);
    });
  }
  
  export async function deleteCar(carId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, carId });
      }, 300);
    });
  }
  