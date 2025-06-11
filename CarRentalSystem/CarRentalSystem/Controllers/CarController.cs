using Microsoft.AspNetCore.Mvc;

namespace CarRentalSystem.Controllers
{
    public class CarController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
