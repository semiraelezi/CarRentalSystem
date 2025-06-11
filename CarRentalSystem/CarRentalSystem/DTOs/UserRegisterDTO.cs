﻿namespace CarRentalSystem.DTOs
{
    public class UserRegisterDTO
    {
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Password { get; set; } = null!;

        public string DriverLicense { get; set; } = null!;


    }
}