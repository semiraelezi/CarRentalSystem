using CarRentalSystem.Data;
using CarRentalSystem.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AdminController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("all-users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var nonAdminUsers = new List<ApplicationUser>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (!roles.Contains("Admin"))
                    nonAdminUsers.Add(user);
            }

            var result = nonAdminUsers.Select(u => new {
                u.Id,
                u.Email,
                u.PhoneNumber,
                u.Name,
                u.Surname,
                u.DriverLicense
            });

            return Ok(result);
        }

        [HttpGet("search-users")]
        public async Task<IActionResult> SearchUsers([FromQuery] string name, [FromQuery] string surname)
        {
            var users = await _userManager.Users
                .Where(u => u.Name != null && u.Surname != null &&
                            u.Name.ToLower().Trim() == name.ToLower().Trim() &&
                            u.Surname.ToLower().Trim() == surname.ToLower().Trim())
                .ToListAsync();

            var filteredUsers = new List<ApplicationUser>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (!roles.Contains("Admin"))
                    filteredUsers.Add(user);
            }

            if (!filteredUsers.Any())
                return NotFound("No matching users found.");

            var result = filteredUsers.Select(u => new
            {
                u.Id,
                u.Email,
                u.PhoneNumber,
                u.Name,
                u.Surname,
                u.DriverLicense
            });

            return Ok(result);
        }

        // Updated to use ID parameter
        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser([FromQuery] string id, [FromBody] UserRegisterDTO dto)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound("User not found.");

            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Contains("Admin"))
                return BadRequest("Cannot update an admin user.");

            user.Email = dto.Email;
            user.PhoneNumber = dto.PhoneNumber;
            user.Name = dto.Name;       // Added: update name
            user.Surname = dto.Surname; // Added: update surname
            user.DriverLicense = dto.DriverLicense;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("User updated.");
        }

        // Updated to use ID parameter
        [HttpDelete("delete-user")]
        public async Task<IActionResult> DeleteUser([FromQuery] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound("User not found.");

            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Contains("Admin"))
                return BadRequest("Cannot delete an admin user.");

            var email = user.Email;

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok($"User with email '{email}' has been deleted.");
        }

        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateDTO dto)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Password))
            {
                return BadRequest("Email and password are required.");
            }

            // Check if user already exists
            var existingUser = await _userManager.FindByEmailAsync(dto.Email);
            if (existingUser != null)
            {
                return BadRequest("User with this email already exists.");
            }

            // Create new user
            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                Name = dto.Name,
                Surname = dto.Surname,
                PhoneNumber = dto.PhoneNumber,
                DriverLicense = dto.DriverLicense
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            // Assign "User" role
            await _userManager.AddToRoleAsync(user, "User");

            return Ok(new
            {
                user.Id,
                user.Email,
                user.Name,
                user.Surname,
                user.PhoneNumber,
                user.DriverLicense
            });
        }
    }
}
