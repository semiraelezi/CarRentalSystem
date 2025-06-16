using CarRentalSystem.Controllers;
using CarRentalSystem.DTOs;
using CarRentalSystem.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;

public class UserControllerTests
{
    private readonly Mock<IRentalService> _rentalServiceMock;
    private readonly RentalsController _controller;

    public UserControllerTests()
    {
        _rentalServiceMock = new Mock<IRentalService>();
        _controller = new RentalsController(_rentalServiceMock.Object);
    }

    [Fact]
    public async Task CreateRental_ReturnsOk_WhenRentalCreated()
    {
        // Arrange
        var dto = new CreateRentalDTO(); // set properties if needed
        _rentalServiceMock.Setup(s => s.CreateRentalAsync(dto))
            .ReturnsAsync(1); // simulate success, rental ID = 1

        // Act
        var result = await _controller.CreateRental(dto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Contains("Rental created", okResult.Value.ToString());
    }

    [Fact]
    public async Task CreateRental_ReturnsBadRequest_WhenModelStateInvalid()
    {
        // Arrange
        _controller.ModelState.AddModelError("Key", "Error");

        // Act
        var result = await _controller.CreateRental(new CreateRentalDTO());

        // Assert
        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task CreateRental_ReturnsBadRequest_WhenCreationFails()
    {
        // Arrange
        var dto = new CreateRentalDTO();
        _rentalServiceMock.Setup(s => s.CreateRentalAsync(dto))
            .ReturnsAsync(0); // simulate failure

        // Act
        var result = await _controller.CreateRental(dto);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Contains("Failed to create rental", badRequestResult.Value.ToString());
    }

    [Fact]
    public async Task CancelRental_ReturnsOk_WhenSuccess()
    {
        // Arrange
        int rentalId = 1;
        _rentalServiceMock.Setup(s => s.CancelRentalAsync(rentalId))
            .ReturnsAsync(true);

        // Act
        var result = await _controller.CancelRental(rentalId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal("Rental deleted.", okResult.Value);
    }

    [Fact]
    public async Task CancelRental_ReturnsNotFound_WhenFails()
    {
        // Arrange
        int rentalId = 2;
        _rentalServiceMock.Setup(s => s.CancelRentalAsync(rentalId))
            .ReturnsAsync(false);

        // Act
        var result = await _controller.CancelRental(rentalId);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal("Rental not found or cannot be deleted.", notFoundResult.Value);
    }
}
