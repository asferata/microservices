using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IProgramService
    {
        Task<string> ListAsync();

        Task<string> GetAsync(string id);

        Task<string> GetExercisesAsync(string id);
    }
}