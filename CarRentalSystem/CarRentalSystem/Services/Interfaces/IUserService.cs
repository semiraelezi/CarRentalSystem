using CarRentalSystem.DTOs;
using Microsoft.AspNetCore.Identity;

namespace CarRentalSystem.Services.Interfaces
{
    public interface IUserService
    {
        Task<string> RegisterAsync(UserRegisterDTO dto);
        Task<string> LoginAsync(UserLoginDTO dto);

        // IdentityUser uses string for Id, so use string here instead of int
        Task<IdentityUser?> GetProfileAsync(string userId);
        Task UpdateProfileAsync(string userId, UserUpdateDTO dto);
    }
}
