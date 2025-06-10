using CarRentalSystem.Data;
using CarRentalSystem.DTOs;
using CarRentalSystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class RentalService : IRentalService
{
    private readonly AppDbContext _context;

    public RentalService(AppDbContext context)
    {
        _context = context;
    }

  




    // Returns the RentalId of the created rental, or 0 if creation failed
    public async Task<int> CreateRentalAsync(CreateRentalDTO rentalDto)
    {
        var availableCar = await _context.Cars
            .Where(c => c.Type == rentalDto.CarType)
            .Where(c => !_context.Rentals.Any(r =>
                r.CarId == c.CarId &&
                r.Status == "Booked" &&
                (
                    (rentalDto.PickUpDate >= r.PickUpDate && rentalDto.PickUpDate < r.ReturnDate) ||
                    (rentalDto.ReturnDate > r.PickUpDate && rentalDto.ReturnDate <= r.ReturnDate) ||
                    (rentalDto.PickUpDate <= r.PickUpDate && rentalDto.ReturnDate >= r.ReturnDate)
                )
            ))
            .FirstOrDefaultAsync();

        if (availableCar == null)
            return 0; // No available car found

        var rental = new Rental
        {
            CarId = availableCar.CarId,
            PickupLocation = rentalDto.PickupLocation,
            ReturnLocation = rentalDto.ReturnLocation,
            PickUpDate = rentalDto.PickUpDate,
            ReturnDate = rentalDto.ReturnDate,
            Status = "Booked",
            TotalPrice = availableCar.PricePerDay * (decimal)(rentalDto.ReturnDate - rentalDto.PickUpDate).TotalDays,
            Name = rentalDto.Name,
            Surname = rentalDto.Surname,
            Email = rentalDto.Email,
            PhoneNumber = rentalDto.PhoneNumber,
            DriversLicenseNumber = rentalDto.DriversLicenseNumber
        };

        _context.Rentals.Add(rental);
        await _context.SaveChangesAsync();

        return rental.RentalId; // Return the generated ID
    }

    public async Task<bool> CancelRentalAsync(int rentalId)
    {
        var rental = await _context.Rentals.FindAsync(rentalId);
        if (rental == null)
            return false;

        _context.Rentals.Remove(rental);
        await _context.SaveChangesAsync();
        return true;
    }

    public Task<List<Rental>> GetAllRentalsAsync()
    {
        throw new NotImplementedException();
    }

   
}
