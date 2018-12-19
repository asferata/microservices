using Microsoft.AspNetCore.Mvc;

namespace ShopFront.Controllers
{
    [Route("/healthcheck")]
    [ApiController]
    public class IndexController : ControllerBase
    {
        // GET
        public IActionResult Index()
        {
            return Ok("It's alive");
        }
    }
}