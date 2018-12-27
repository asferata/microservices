using System.Threading.Tasks;
using BL.Interfaces;
using DL.Interfaces;

namespace BL.Services
{
    public class ProgramService : IProgramService
    {
        private readonly IProgramRepository _programRepository;

        public ProgramService(IProgramRepository programRepository)
        {
            this._programRepository = programRepository;
        }

        public async Task<string> ListAsync()
        {
            return await _programRepository.ListAsync().ConfigureAwait(false);
        }

        public async Task<string> GetAsync(string id)
        {
            return await _programRepository.GetAsync(id).ConfigureAwait(false);
        }

        public async Task<string> GetExercisesAsync(string id)
        {
            return await _programRepository.GetExercisesAsync(id).ConfigureAwait(false);
        }
    }
}