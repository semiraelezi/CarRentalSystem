﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRentalSystem.Migrations
{
    /// <inheritdoc />
    public partial class isavailablepart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAvailable",
                table: "Cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAvailable",
                table: "Cars");
        }
    }
}
