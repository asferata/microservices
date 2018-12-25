using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BL.DtoModels.Orders;

namespace BL.Interfaces.Orders
{
    public interface IOrderService
    {
        Task<List<OrderDto>> GetOrders();
        Task<OrderDto> GetOrder(int orderId);
    }
}
