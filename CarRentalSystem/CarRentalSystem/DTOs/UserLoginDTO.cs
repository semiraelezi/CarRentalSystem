﻿using CarRentalSystem.DTOs;

namespace CarRentalSystem.DTOs
{
    public class UserLoginDTO
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}