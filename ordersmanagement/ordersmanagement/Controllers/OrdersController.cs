using Microsoft.AspNetCore.Mvc;
using OrdersManagement.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL.Interfaces.Orders;

namespace OrdersManagement.Controllers
{
    [ApiVersion("1")]
    [Route("api/v{Api-Version:apiVersion}/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var result = await _orderService.GetOrdersAsync().ConfigureAwait(false);
            return new OkObjectResult(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(long id)
        {
            var result = await _orderService.GetOrderAsync(id).ConfigureAwait(false);
            return new OkObjectResult(result);
        }
    }
}