using AutoMapper;
using BL.DtoModels.Orders;
using BL.Interfaces.Orders;
using BL.Util.Exceptions;
using DL.Entities;
using DL.Interfaces.Repository;
using DL.Util.DataLayerExceptions;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using Util;

namespace BL.Orders
{
    public class OrderService:IOrderService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Order> _orderRepository;
        private readonly ILogger<OrderService> _logger;

        public OrderService(IMapper mapper, IRepository<Order> orderRepository, ILogger<OrderService> logger)
        {
            _mapper = mapper;
            _orderRepository = orderRepository;
            _logger = logger;
        }

        public async Task<List<OrderDto>> GetOrdersAsync()
        {
            var orders = await _orderRepository.ListAsync().ConfigureAwait(false);
            return _mapper.Map<List<OrderDto>>(orders);
        }

        public async Task<OrderDto> GetOrderAsync(int orderId)
        {
            var order = await LoadOrderByIdAsync(orderId).ConfigureAwait(false);
            return _mapper.Map<OrderDto>(order);
        }

        private async Task<Order> LoadOrderByIdAsync(int orderId)
        {
            try
            {
                return await _orderRepository.GetByIdAsync(orderId).ConfigureAwait(false);
            }
            catch (EntityNotFoundException ex)
            {
                _logger.LogInformation(LoggerEvents.LoadOrderById, ex, $"Order {orderId} not found");
                throw new NoDataException(ErrorMessage.OrderNotFound(orderId));
            }
        }
    }
}
