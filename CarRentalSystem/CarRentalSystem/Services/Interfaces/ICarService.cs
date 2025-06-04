using CarRentalSystem.DTOs;

namespace CarRentalSystem.Services.Interfaces
{
    public interface ICarService
    {
        Task<IEnumerable<CarDTO>> GetAllCarsAsync();
        Task<CarDTO> GetCarByIdAsync(int id);
        Task<CarDTO> CreateCarAsync(CarCreateDTO carDto);
        Task<bool> UpdateCarAsync(int id, CarUpdateDTO carDto);
        Task<bool> DeleteCarAsync(int id);

    }
}
