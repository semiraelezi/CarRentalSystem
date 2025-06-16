using CarRentalSystem.Data;
using CarRentalSystem.Repositories.Implementations;
using Microsoft.AspNetCore.Identity;
using Moq;
using System.Threading.Tasks;
using Xunit;

public class UserRepositorySimpleTests
{
    private readonly Mock<UserManager<ApplicationUser>> _mockUserManager;
    private readonly UserRepository _userRepository;

    public UserRepositorySimpleTests()
    {
        var userStoreMock = new Mock<IUserStore<ApplicationUser>>();
        _mockUserManager = new Mock<UserManager<ApplicationUser>>(
            userStoreMock.Object, null, null, null, null, null, null, null, null);

        _userRepository = new UserRepository(_mockUserManager.Object, null);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsUser()
    {
        var userId = "123";
        var user = new ApplicationUser { Id = userId, UserName = "testuser" };

        _mockUserManager.Setup(um => um.FindByIdAsync(userId))
            .ReturnsAsync(user);

        var result = await _userRepository.GetByIdAsync(userId);

        Assert.NotNull(result);
        Assert.Equal("testuser", result.UserName);
    }

    [Fact]
    public async Task AddAsync_Succeeds()
    {
        var user = new ApplicationUser { UserName = "newuser" };

        _mockUserManager.Setup(um => um.CreateAsync(user))
            .ReturnsAsync(IdentityResult.Success);

        await _userRepository.AddAsync(user);

        _mockUserManager.Verify(um => um.CreateAsync(user), Times.Once);
    }
}
