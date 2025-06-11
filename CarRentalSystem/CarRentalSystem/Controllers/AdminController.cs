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

        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser([FromQuery] string name, [FromQuery] string surname, [FromBody] UserRegisterDTO dto)
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(u => u.Name.ToLower().Trim() == name.ToLower().Trim() &&
                                          u.Surname.ToLower().Trim() == surname.ToLower().Trim());

            if (user == null)
                return NotFound("User not found.");

            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Contains("Admin"))
                return BadRequest("Cannot update an admin user.");

            user.Email = dto.Email;
            user.PhoneNumber = dto.PhoneNumber;
            user.DriverLicense = dto.DriverLicense;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("User updated.");
        }

        [HttpDelete("delete-user")]
        public async Task<IActionResult> DeleteUser([FromQuery] string name, [FromQuery] string surname)
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(u => u.Name.ToLower().Trim() == name.ToLower().Trim() &&
                                          u.Surname.ToLower().Trim() == surname.ToLower().Trim());

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
    }
   }
