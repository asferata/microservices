using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopFront.DTO;
using ShopFront.Services;

namespace ShopFront.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public ValuesController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // GET api/values
        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> Get()
        {
            return await _orderService.List();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> Get(long id)
        {
            return await _orderService.Get(id);
        }
        
/*
        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
