using Microsoft.AspNetCore.Identity;

namespace CarRentalSystem.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? DriverLicense { get; set; }  // New property for driver license
    }
}
