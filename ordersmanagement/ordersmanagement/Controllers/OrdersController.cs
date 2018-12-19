using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OrdersManagement.DTO;

namespace OrdersManagement.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private List<OrderDTO> Orders = new List<OrderDTO> {
            new OrderDTO { Id = 1, UserId = 101, Title = "New Year's Presents", Amount = 1056.45m},
            new OrderDTO { Id = 2, UserId = 202, Title = "Table", Amount = 498.21m},
            new OrderDTO { Id = 3, UserId = 303, Title = "Chair", Amount = 381.02m},
            new OrderDTO { Id = 4, UserId = 404, Title = "Shoes", Amount = 160.45m}
        };

        [HttpGet]
        public ActionResult<IEnumerable<OrderDTO>> Get()
        {
            return Orders.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<OrderDTO> Get(long id)
        {
            return Orders.First(x => x.Id == id);
        }
    }
}