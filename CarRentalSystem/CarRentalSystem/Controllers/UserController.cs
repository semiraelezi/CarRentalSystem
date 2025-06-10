using CarRentalSystem.DTOs;
using CarRentalSystem.Services.Implementations;
using CarRentalSystem.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class RentalsController : ControllerBase
{
    private readonly IRentalService _rentalService;
    private readonly ICarService _carService;


    public RentalsController(IRentalService rentalService)
    {
        _rentalService = rentalService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateRental([FromBody] CreateRentalDTO rentalDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var rentalId = await _rentalService.CreateRentalAsync(rentalDto);

        if (rentalId > 0)
            return Ok(new { message = "Rental created.", rentalId });

        return BadRequest("Failed to create rental. Possibly no available cars or invalid data.");
    }

    [HttpDelete("cancel/{rentalId}")]  // Use DELETE HTTP method instead of POST
    public async Task<IActionResult> CancelRental(int rentalId)
    {
        var success = await _rentalService.CancelRentalAsync(rentalId);

        if (success)
            return Ok("Rental deleted.");

        return NotFound("Rental not found or cannot be deleted.");
    }

   

}
