using System.ComponentModel.DataAnnotations;

namespace CarRentalSystem.Data
{
    public class Rental
    {
        [Key]
        public int RentalId { get; set; }  // Required primary key

        [Required]
        public int CarId { get; set; }

        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string? DriversLicenseNumber { get; set; }

        public DateTime PickUpDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public string PickupLocation { get; set; }

        public string ReturnLocation { get; set; }

        public string Status { get; set; }

        public decimal TotalPrice { get; set; }


        public Car Car { get; set; }

    }
}
