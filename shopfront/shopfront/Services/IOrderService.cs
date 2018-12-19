using System.Collections.Generic;
using System.Threading.Tasks;
using ShopFront.DTO;

namespace ShopFront.Services
{
    public interface IOrderService
    {
        Task<List<OrderDTO>> List();
        Task<OrderDTO> Get(long id);
    }
}