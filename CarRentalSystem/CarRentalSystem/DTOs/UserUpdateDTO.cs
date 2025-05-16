namespace CarRentalSystem.DTOs
{
    public class UserUpdateDTO
    {
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string? DriversLicenseNumber { get; set; }
    }
}