using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CarRentalSystem.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CarRentalSystem.Services
{
    public class TokenService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<TokenService> _logger;

        public TokenService(
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            ILogger<TokenService> logger)
        {
            _userManager = userManager;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<string> CreateToken(ApplicationUser user)
        {
            try
            {
                var expiration = DateTime.UtcNow.AddMinutes(
                    _configuration.GetValue<int>("Jwt:ExpireMinutes", 30));

                var roles = await _userManager.GetRolesAsync(user);
                _logger.LogInformation("Creating token for user {UserId} with roles {Roles}", user.Id, string.Join(",", roles));

                var token = CreateJwtToken(
                    CreateClaims(user, roles),
                    CreateSigningCredentials(),
                    expiration
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating token for user {UserId}", user.Id);
                throw;
            }
        }

        private List<Claim> CreateClaims(ApplicationUser user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id), // Standard JWT claim
                new Claim(ClaimTypes.NameIdentifier, user.Id), // ASP.NET Core default
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }

        private JwtSecurityToken CreateJwtToken(List<Claim> claims, SigningCredentials credentials, DateTime expiration)
        {
            return new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: credentials
            );
        }

        private SigningCredentials CreateSigningCredentials()
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );
            return new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        }
    }
}