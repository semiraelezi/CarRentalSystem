using CarRentalSystem.DTOs;
using CarRentalSystem.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]  // Only authenticated users can access
public class RentalsController : ControllerBase
{
    private readonly IRentalService _rentalService;

    public RentalsController(IRentalService rentalService)
    {
        _rentalService = rentalService;
    }

    [HttpGet("user")]
    public async Task<IActionResult> GetUserRentalsForUser()
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized(new { error = "User not authorized." });

            var rentals = await _rentalService.GetUserRentalsAsync(userId);
            return Ok(rentals);
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, new { error = "An unexpected error occurred.", details = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateRental([FromBody] CreateRentalDTO rentalDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(new { error = "Invalid rental data.", details = ModelState });

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized(new { error = "User not authorized." });

            var rentalId = await _rentalService.CreateRentalAsync(rentalDto, userId);

            if (rentalId > 0)
                return Ok(new { message = "Rental created.", rentalId });

            return BadRequest(new { error = "Failed to create rental. Possibly no available cars or invalid data." });
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, new { error = "An unexpected error occurred.", details = ex.Message });
        }
    }

    [HttpDelete("cancel/{rentalId}")]
    public async Task<IActionResult> CancelRental(int rentalId)
    {
        try
        {
            var success = await _rentalService.CancelRentalAsync(rentalId);

            if (success)
                return Ok(new { message = "Rental cancelled." });

            return NotFound(new { error = "Rental not found or cannot be cancelled." });
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, new { error = "An unexpected error occurred.", details = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetUserRentals()
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized(new { error = "User not authorized." });

            var rentals = await _rentalService.GetUserRentalsAsync(userId);

            return Ok(rentals);
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, new { error = "An unexpected error occurred.", details = ex.Message });
        }
    }
}
