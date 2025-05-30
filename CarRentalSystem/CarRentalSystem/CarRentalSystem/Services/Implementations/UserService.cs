using CarRentalSystem.DTOs;
using CarRentalSystem.Data;
using CarRentalSystem.Services;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;
using CarRentalSystem.Services.Interfaces;

namespace CarRentalSystem.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly TokenService _tokenService;

        public UserService(UserManager<ApplicationUser> userManager,
                           SignInManager<ApplicationUser> signInManager,
                           TokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public async Task<string> RegisterAsync(UserRegisterDTO dto)
        {
            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Name = dto.Name,
                Surname = dto.Surname,
                DriverLicense = dto.DriverLicense
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));

            // Assign "User" role on registration
            await _userManager.AddToRoleAsync(user, "User");

            return await _tokenService.CreateToken(user);
        }

        public async Task<string> LoginAsync(UserLoginDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                throw new Exception("Invalid credentials");

            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
            if (!result.Succeeded)
                throw new Exception("Invalid credentials");

            return await _tokenService.CreateToken(user);
        }

        public Task<IdentityUser?> GetProfileAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateProfileAsync(string userId, UserUpdateDTO dto)
        {
            throw new NotImplementedException();
        }

        // Other methods omitted for brevity...
    }
}
