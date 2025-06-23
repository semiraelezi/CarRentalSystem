namespace CarRentalSystem.DTOs
{
    public class CarDTO
    {
        public int CarId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public string Type { get; set; }
        public decimal PricePerDay { get; set; }
        public decimal Discount { get; set; }
        public string Fuel { get; set; }
        public string Transmission { get; set; }
        public int Seats { get; set; }
        public string Color { get; set; }
        public string LicensePlate { get; set; }
        public bool IsAvailable { get; set; }
        public string Status => IsAvailable ? "Available" : "Not Available";

    }

}