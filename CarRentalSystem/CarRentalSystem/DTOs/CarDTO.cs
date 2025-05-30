namespace CarRentalSystem.DTOs
{
    public class CarDTO
    {
        public int Id { get; set; }  // Required primary key
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public string Type { get; set; }
        public decimal PricePerDay { get; set; }
    }
}
