using CarRentalSystem.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRentalSystem.Services.Interfaces
{
    public interface IRentalService
    {
        Task<int> CreateRentalAsync(CreateRentalDTO rentalDto, string userId);
        Task<bool> CancelRentalAsync(int rentalId);
        Task<List<RentalDTO>> GetUserRentalsAsync(string userId);
    }
}
