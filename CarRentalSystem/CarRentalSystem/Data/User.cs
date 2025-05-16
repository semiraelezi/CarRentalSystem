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

        // Role can be derived from the type of user, or kept for convenience
        public virtual string Role => "User";
    }

    public class Admin : User
    {
        // Add admin-specific properties if needed
        // For example, admin permissions or admin notes
        public override string Role => "Admin";

        // Additional admin-specific fields can go here
    }
}