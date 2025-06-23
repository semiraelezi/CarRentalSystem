using CarRentalSystem.Data;
using CarRentalSystem.DTOs;
using CarRentalSystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalSystem.Services.Implementations
{
    public class CarService : ICarService
    {
        private readonly AppDbContext _context;

        public CarService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CarDTO>> GetAllCarsAsync()
        {
            return await _context.Cars
                .Select(car => new CarDTO
                {
                    CarId = car.CarId,
                    Make = car.Make,
                    Model = car.Model,
                    Year = car.Year,
                    Type = car.Type,
                    PricePerDay = car.PricePerDay,
                    Discount = car.Discount,
                    Fuel = car.Fuel,
                    Transmission = car.Transmission,
                    Seats = car.Seats,
                    Color = car.Color,
                    LicensePlate = car.LicensePlate,
                    IsAvailable = car.IsAvailable
                }).ToListAsync();
        }

        public async Task<CarDTO> GetCarByIdAsync(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return null;

            return new CarDTO
            {
                CarId = car.CarId,
                Make = car.Make,
                Model = car.Model,
                Year = car.Year,
                Type = car.Type,
                PricePerDay = car.PricePerDay,
                Discount = car.Discount,
                Fuel = car.Fuel,
                Transmission = car.Transmission,
                Seats = car.Seats,
                Color = car.Color,
                LicensePlate = car.LicensePlate,
                IsAvailable = car.IsAvailable
            };
        }

        public async Task<CarDTO> CreateCarAsync(CarCreateDTO carDto)
        {
            var car = new Car
            {
                Make = carDto.Make,
                Model = carDto.Model,
                Year = carDto.Year,
                Type = carDto.Type,
                PricePerDay = carDto.PricePerDay,
                Discount = carDto.Discount,
                Fuel = carDto.Fuel,
                Transmission = carDto.Transmission,
                Seats = carDto.Seats,
                Color = carDto.Color,
                LicensePlate = carDto.LicensePlate,
                IsAvailable = true // default to available on creation
            };

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return new CarDTO
            {
                CarId = car.CarId,
                Make = car.Make,
                Model = car.Model,
                Year = car.Year,
                Type = car.Type,
                PricePerDay = car.PricePerDay,
                Discount = car.Discount,
                Fuel = car.Fuel,
                Transmission = car.Transmission,
                Seats = car.Seats,
                Color = car.Color,
                LicensePlate = car.LicensePlate,
                IsAvailable = car.IsAvailable
            };
        }

        public async Task<bool> UpdateCarAsync(int id, CarUpdateDTO dto)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
                return false;

            car.PricePerDay = dto.PricePerDay;
            car.Discount = dto.Discount;
            car.Color = dto.Color;
            car.LicensePlate = dto.LicensePlate;
            car.IsAvailable = dto.IsAvailable;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCarAsync(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return false;

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
