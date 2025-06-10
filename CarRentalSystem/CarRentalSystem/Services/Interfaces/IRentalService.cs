using CarRentalSystem.Data;
using CarRentalSystem.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CarRentalSystem.Services.Interfaces
{
    public interface IRentalService
    {
        Task<int> CreateRentalAsync(CreateRentalDTO rentalDto);
        Task<bool> CancelRentalAsync(int rentalId);
       
      
    }
}
