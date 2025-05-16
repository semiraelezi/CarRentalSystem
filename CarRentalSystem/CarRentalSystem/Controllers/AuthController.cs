using Microsoft.AspNetCore.Mvc;

namespace CarRentalSystem.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
