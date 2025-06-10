using System.ComponentModel.DataAnnotations;

namespace CarRentalSystem.DTOs
{
    public class CreateRentalDTO
    {
       
        public string CarType { get; set; }

      
        public string PickupLocation { get; set; }

       
        public string ReturnLocation { get; set; }

        
        public DateTime PickUpDate { get; set; }

        
        public DateTime ReturnDate { get; set; }

        // Required fields for rental creation
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string? DriversLicenseNumber { get; set; }
    }
}
