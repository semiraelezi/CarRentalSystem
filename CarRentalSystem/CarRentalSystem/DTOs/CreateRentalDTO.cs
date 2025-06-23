using System.ComponentModel.DataAnnotations;

namespace CarRentalSystem.DTOs
{
    public class CreateRentalDTO
    {
        [Required]
        public int CarId { get; set; }  // <-- Added CarId to specify exact car

        public string CarType { get; set; }
        [Required]
        public string PickupLocation { get; set; }

        [Required]
        public string ReturnLocation { get; set; }

        [Required]
        public DateTime PickUpDate { get; set; }

        [Required]
        public DateTime ReturnDate { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        public string? DriversLicenseNumber { get; set; }
    }
}
