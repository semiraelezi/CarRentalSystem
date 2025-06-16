using CarRentalSystem.Data;
using CarRentalSystem.DTOs;
using CarRentalSystem.Services.Implementations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Xunit;
using Moq;
public class CarServiceTests
{
    private AppDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString()) // unique DB per test
            .Options;
        return new AppDbContext(options);
    }

    [Fact]
    public async Task CreateCarAsync_CreatesCar_ReturnsCarDTO()
    {
        // Arrange
        var context = GetDbContext();
        var service = new CarService(context);
        var createDto = new CarCreateDTO
        {
            Make = "Honda",
            Model = "Civic",
            Year = 2021,
            Type = "Sedan",
            PricePerDay = 40m,
            Discount = 5,
            Fuel = "Gasoline",
            Transmission = "Automatic",
            Seats = 5,
            Color = "Blue",
            LicensePlate = "ABC123"
        };

        // Act
        var result = await service.CreateCarAsync(createDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Honda", result.Make);
        Assert.True(result.IsAvailable);
    }

    [Fact]
    public async Task GetCarByIdAsync_ReturnsCarDTO_WhenCarExists()
    {
        // Arrange
        var context = GetDbContext();
        var car = new Car
        {
            Make = "Toyota",
            Model = "Corolla",
            Year = 2020,
            Type = "Sedan",
            PricePerDay = 35m,
            Discount = 0,
            Fuel = "Gasoline",
            Transmission = "Manual",
            Seats = 5,
            Color = "Red",
            LicensePlate = "XYZ789",
            IsAvailable = true
        };
        context.Cars.Add(car);
        await context.SaveChangesAsync();

        var service = new CarService(context);

        // Act
        var result = await service.GetCarByIdAsync(car.CarId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Toyota", result.Make);
    }

    [Fact]
    public async Task GetCarByIdAsync_ReturnsNull_WhenCarDoesNotExist()
    {
        var context = GetDbContext();
        var service = new CarService(context);

        var result = await service.GetCarByIdAsync(999);

        Assert.Null(result);
    }

    [Fact]
    public async Task UpdateCarAsync_UpdatesCar_ReturnsTrue()
    {
        var context = GetDbContext();
        var car = new Car
        {
            Make = "Ford",
            Model = "Focus",
            Year = 2018,
            Type = "Hatchback",
            PricePerDay = 30m,
            Discount = 0,
            Fuel = "Diesel",
            Transmission = "Manual",
            Seats = 5,
            Color = "White",
            LicensePlate = "FOCUS1",
            IsAvailable = true
        };
        context.Cars.Add(car);
        await context.SaveChangesAsync();

        var service = new CarService(context);

        var updateDto = new CarUpdateDTO
        {
            PricePerDay = 28m,
            Discount = 10,
            Color = "Black",
            LicensePlate = "FOCUS1",
            IsAvailable = false
        };

        var result = await service.UpdateCarAsync(car.CarId, updateDto);

        Assert.True(result);

        var updatedCar = await context.Cars.FindAsync(car.CarId);
        Assert.Equal(28m, updatedCar.PricePerDay);
        Assert.Equal(10, updatedCar.Discount);
        Assert.Equal("Black", updatedCar.Color);
        Assert.False(updatedCar.IsAvailable);
    }

    [Fact]
    public async Task UpdateCarAsync_ReturnsFalse_WhenCarNotFound()
    {
        var context = GetDbContext();
        var service = new CarService(context);

        var updateDto = new CarUpdateDTO
        {
            PricePerDay = 28m,
            Discount = 10,
            Color = "Black",
            LicensePlate = "FOCUS1",
            IsAvailable = false
        };

        var result = await service.UpdateCarAsync(999, updateDto);

        Assert.False(result);
    }

    [Fact]
    public async Task DeleteCarAsync_DeletesCar_ReturnsTrue()
    {
        var context = GetDbContext();
        var car = new Car
        {
            Make = "BMW",
            Model = "X5",
            Year = 2019,
            Type = "SUV",
            PricePerDay = 80m,
            Discount = 0,
            Fuel = "Gasoline",
            Transmission = "Automatic",
            Seats = 5,
            Color = "Black",
            LicensePlate = "BMWX5",
            IsAvailable = true
        };
        context.Cars.Add(car);
        await context.SaveChangesAsync();

        var service = new CarService(context);

        var result = await service.DeleteCarAsync(car.CarId);

        Assert.True(result);

        var deletedCar = await context.Cars.FindAsync(car.CarId);
        Assert.Null(deletedCar);
    }

    [Fact]
    public async Task DeleteCarAsync_ReturnsFalse_WhenCarNotFound()
    {
        var context = GetDbContext();
        var service = new CarService(context);

        var result = await service.DeleteCarAsync(999);

        Assert.False(result);
    }

    
}
