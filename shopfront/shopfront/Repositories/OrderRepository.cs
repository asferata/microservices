using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ShopFront.DTO;

namespace ShopFront.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly Configs.Services _services;
        private static readonly HttpClient httpClient = new HttpClient();

        public OrderRepository(IOptions<Configs.Services> services)
        {
            _services = services.Value;
        }

        public async Task<List<SimpleOrderDTO>> List()
        {
            var result = await httpClient.GetStringAsync($"http://{_services.OrdersManagement}/api/Orders");
            return JsonConvert.DeserializeObject<List<SimpleOrderDTO>>(result);
        }
        
        public async Task<SimpleOrderDTO> Get(long id)
        {
            var result = await httpClient.GetStringAsync($"http://{_services.OrdersManagement}/api/Orders/{id}");
            return JsonConvert.DeserializeObject<SimpleOrderDTO>(result);
        }
    }
}