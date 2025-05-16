using CarRentalSystem.Data;
using CarRentalSystem.DTOs;

namespace CarRentalSystem.Services.Interfaces
{
    public interface IUserService
    {
        Task<string> RegisterAsync(UserRegisterDTO dto);
        Task<string> LoginAsync(UserLoginDTO dto);
        Task<User?> GetProfileAsync(int userId);
        Task UpdateProfileAsync(int userId, UserUpdateDTO dto);
    }
}
