using CarRentalSystem.Data;
using CarRentalSystem.DTOs;
using CarRentalSystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRentalSystem.Services.Implementations; // Add this to use SimpleEmailSender

public class RentalService : IRentalService
{
    private readonly AppDbContext _context;
    private readonly SimpleEmailSender _emailSender = new SimpleEmailSender();

    public RentalService(AppDbContext context)
    {
        _context = context;
    }

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
            return 0;

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

        // ✅ Send confirmation email
        var subject = "Rental Booked Successfully";
        var body = $"Hi {rentalDto.Name},<br>Your rental for a {availableCar.Make} {availableCar.Model} from {rentalDto.PickUpDate:dd/MM/yyyy} to {rentalDto.ReturnDate:dd/MM/yyyy} has been booked.<br>Total Price: {rental.TotalPrice:C}.<br>Thank you!";
        await _emailSender.SendEmail(rentalDto.Email, subject, body);

        return rental.RentalId;
    }

    public async Task<bool> CancelRentalAsync(int rentalId)
    {
        var rental = await _context.Rentals.FindAsync(rentalId);
        if (rental == null)
            return false;

        _context.Rentals.Remove(rental);
        await _context.SaveChangesAsync();

        // ✅ Send cancellation email
        var subject = "Rental Canceled";
        var body = $"Hello {rental.Name},<br>Your rental scheduled from {rental.PickUpDate:dd/MM/yyyy} to {rental.ReturnDate:dd/MM/yyyy} has been canceled.";
        await _emailSender.SendEmail(rental.Email, subject, body);

        return true;
    }

    public Task<List<Rental>> GetAllRentalsAsync()
    {
        throw new NotImplementedException();
    }
}
