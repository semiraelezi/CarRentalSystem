using CarRentalSystem.Data;
using CarRentalSystem.DTOs;
using CarRentalSystem.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CarRentalSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ApiExplorerSettings(GroupName = "User")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        // User registration (no admin)
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDTO dto)
        {
            try
            {
                var token = await _userService.RegisterAsync(dto);
                return Ok(new { Token = token, Message = "User registered successfully." });
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // User login (admin and user)
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO dto)
        {
            try
            {
                var token = await _userService.LoginAsync(dto);
                return Ok(new { Token = token });
            }
            catch (System.Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        // Optional: only admin can create roles or assign roles - secure these later!
        // You may remove or secure these endpoints as needed.

        //[HttpPost("role")]
        //public async Task<IActionResult> CreateRole(string roleName)
        //{
        //    // Implementation here or move to AdminController
        //}

        //[HttpPost("assign")]
        //public async Task<IActionResult> AssignRoleToUser(string email, string roleName)
        //{
        //    // Implementation here or move to AdminController
        //}
    }
}
