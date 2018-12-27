using System.Threading.Tasks;
using DL.Interfaces;
using Microsoft.Extensions.Options;
using Refit;
using Utils.Configs;

namespace DL.Repositories
{
    public class ProgramRepository : IProgramRepository
    {
        private readonly Utils.Configs.Services _services;
        private readonly IProgramApi _api;
        
        public ProgramRepository(IOptions<Services> services)
        {
            _services = services.Value;           
            _api = RestService.For<IProgramApi>($"http://{_services.ProgramServiceUrl}");
        }

        public async Task<string> ListAsync()
        {
            return await _api.List().ConfigureAwait(false);
        }

        public async Task<string> GetAsync(string id)
        {
            return await _api.Get(id).ConfigureAwait(false);
        }

        public async Task<string> GetExercisesAsync(string id)
        {
            return await _api.GetExercises(id).ConfigureAwait(false);
        }
    }
}