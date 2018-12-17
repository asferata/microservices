using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopFront.DTO;
using ShopFront.Repositories;

namespace ShopFront.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;

        public OrderService(IOrderRepository orderRepository, IUserRepository userRepository)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
        }

        public async Task<List<OrderDTO>> List()
        {
            var orders = await _orderRepository.List();
            List<OrderDTO> fullOrders = new List<OrderDTO>();
            foreach (var order in orders)
            {
                var userDto = await _userRepository.Get(order.UserId);
                fullOrders.Add(new OrderDTO
                {
                    Id = order.Id,
                    Amount = order.Amount,
                    Title = order.Title,
                    User = userDto
                });
            }

            return fullOrders;
        }

        public async Task<OrderDTO> Get(long id)
        {
            var order = await _orderRepository.Get(id);
            var userDto = await _userRepository.Get(order.UserId);
            return new OrderDTO
            {
                Id = order.Id,
                Amount = order.Amount,
                Title = order.Title,
                User = userDto
            };
        }
    }
}