namespace CarRentalSystem.DTOs
{
    public class CarCreateDTO
    {
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
    }
}
