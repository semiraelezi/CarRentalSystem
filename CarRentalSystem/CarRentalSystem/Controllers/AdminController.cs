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
        public async Task<IActionResult> SearchUsers([FromQuery] string? name, [FromQuery] string? surname)
        {
            var query = _userManager.Users.AsQueryable();

            if (!string.IsNullOrEmpty(name))
                query = query.Where(u => u.Name != null && u.Name.Contains(name));

            if (!string.IsNullOrEmpty(surname))
                query = query.Where(u => u.Surname != null && u.Surname.Contains(surname));

            var users = await query.ToListAsync();

            var filteredUsers = new List<ApplicationUser>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (!roles.Contains("Admin"))
                    filteredUsers.Add(user);
            }

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
        public async Task<IActionResult> UpdateUser([FromQuery] string email, [FromBody] UserRegisterDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound("User not found.");

            user.Email = dto.Email;
            user.UserName = dto.Email;
            user.PhoneNumber = dto.PhoneNumber;
            user.Name = dto.Name;
            user.Surname = dto.Surname;
            user.DriverLicense = dto.DriverLicense;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            if (!string.IsNullOrWhiteSpace(dto.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var passResult = await _userManager.ResetPasswordAsync(user, token, dto.Password);
                if (!passResult.Succeeded)
                    return BadRequest(passResult.Errors);
            }

            return Ok("User updated.");
        }

        [HttpDelete("delete-user")]
        public async Task<IActionResult> DeleteUser([FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound("User not found.");

            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Contains("Admin"))
                return BadRequest("Cannot delete admin user.");

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("User deleted.");
        }
    }
}
