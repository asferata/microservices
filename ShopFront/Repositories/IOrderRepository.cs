using System.Collections.Generic;
using System.Threading.Tasks;
using ShopFront.DTO;

namespace ShopFront.Repositories
{
    public interface IOrderRepository
    {
        Task<List<SimpleOrderDTO>> List();
        Task<SimpleOrderDTO> Get(long id);
    }
}