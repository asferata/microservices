using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ShopFront.DTO;

namespace ShopFront.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly Configs.Services _services;
        private static readonly HttpClient httpClient = new HttpClient();

        public UserRepository(IOptions<Configs.Services> services)
        {
            _services = services.Value;
        }

        public async Task<List<UserDTO>> List()
        {
            var result = await httpClient.GetStringAsync($"http://{_services.UsersManagement}/api/Users");
            return JsonConvert.DeserializeObject<List<UserDTO>>(result);
        }
        
        public async Task<UserDTO> Get(string id)
        {
            try
            {
                var result = await httpClient.GetStringAsync($"http://{_services.UsersManagement}/api/Users/{id}");
                return JsonConvert.DeserializeObject<UserDTO>(result);
            }
            catch (Exception e)
            {
                Console.Out.WriteLine("Exception during getting user with id " + id);
                Console.Out.WriteLine(e);
                return null;
            }
        }
    }
}