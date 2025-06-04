namespace CarRentalSystem.DTOs
{
    public class CarUpdateDTO
    {
      
        public decimal PricePerDay { get; set; }
        public decimal Discount { get; set; }
        public string Color { get; set; }
        public string LicensePlate { get; set; }
    }
}
