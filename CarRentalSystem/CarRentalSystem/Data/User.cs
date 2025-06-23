namespace CarRentalSystem.Data
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string? DriversLicenseNumber { get; set; }

        // Role is automatically "User" for any User instance
        public string Role { get; set; } = "User";
    }

    public class Admin : User
    {
        public Admin()
        {
            // When creating Admin, role is automatically "Admin"
            Role = "Admin";
        }

        // Admin-specific properties can go here
    }
}