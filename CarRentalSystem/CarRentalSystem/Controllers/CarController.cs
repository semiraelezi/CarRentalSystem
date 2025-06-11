using CarRentalSystem.DTOs;
using CarRentalSystem.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRentalSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]  // Optional, require admin role
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        // GET api/car
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDTO>>> GetAll()
        {
            var cars = await _carService.GetAllCarsAsync();
            return Ok(cars);
        }

        // GET api/car/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarDTO>> GetById(int id)
        {
            var car = await _carService.GetCarByIdAsync(id);
            if (car == null)
                return NotFound();

            return Ok(car);
        }

        // POST api/car
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CarCreateDTO carDto)
        {
            var createdCar = await _carService.CreateCarAsync(carDto);

            // Return CreatedAtAction with new car's id for RESTful response
            return CreatedAtAction(nameof(GetById), new { id = createdCar.CarId }, createdCar);
        }

        // PUT api/car/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] CarUpdateDTO carDto)
        {
            var success = await _carService.UpdateCarAsync(id, carDto);
            if (!success)
                return NotFound();

            return NoContent();
        }

        // DELETE api/car/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var success = await _carService.DeleteCarAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
