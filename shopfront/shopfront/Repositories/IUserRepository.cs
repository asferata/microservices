using System.Collections.Generic;
using System.Threading.Tasks;
using ShopFront.DTO;

namespace ShopFront.Repositories
{
    public interface IUserRepository
    {
        Task<List<UserDTO>> List();
        Task<UserDTO> Get(string id);
    }
}