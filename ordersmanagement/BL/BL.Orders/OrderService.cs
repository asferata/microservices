using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BL.DtoModels.Orders;
using BL.Interfaces.Orders;

namespace BL.Orders
{
    public class OrderService:IOrderService
    {
        public async Task<List<OrderDto>> GetOrders()
        {
            throw new NotImplementedException();
        }

        public async Task<OrderDto> GetOrder(int orderId)
        {
            throw new NotImplementedException();
        }
    }
}
