using System.ComponentModel.DataAnnotations;

namespace CarRentalSystem.DTOs
{
    public class RentalDTO
    {
        public int Id { get; set; }  // Required primary key


        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
       
        public string PhoneNumber { get; set; } = null!;

        public decimal TotalPrice { get; set; }

        public DateTime ReturnDate { get; set; }

        public DateTime PickUpDate { get; set; }

        public string Model { get; set; }

    }
}
