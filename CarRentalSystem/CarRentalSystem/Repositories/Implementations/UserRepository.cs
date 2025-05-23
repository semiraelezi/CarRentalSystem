using CarRentalSystem.Data;
using CarRentalSystem.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRentalSystem.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly AppDbContext _context;

        public UserRepository(UserManager<ApplicationUser> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<ApplicationUser?> GetByIdAsync(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }

        public async Task<ApplicationUser?> GetByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<IEnumerable<ApplicationUser>> GetAllAsync()
        {
            // Using EF Core DbContext directly to get all users
            return await _context.Users.ToListAsync();
        }

        public async Task AddAsync(ApplicationUser user)
        {
            // Here we delegate user creation to UserManager
            var result = await _userManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                throw new System.Exception($"Failed to create user: {string.Join(", ", result.Errors)}");
            }
        }

        public async Task UpdateAsync(ApplicationUser user)
        {
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new System.Exception($"Failed to update user: {string.Join(", ", result.Errors)}");
            }
        }

        public async Task DeleteAsync(ApplicationUser user)
        {
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                throw new System.Exception($"Failed to delete user: {string.Join(", ", result.Errors)}");
            }
        }
    }
}
