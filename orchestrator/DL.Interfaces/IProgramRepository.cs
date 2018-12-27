using System.Threading.Tasks;

namespace DL.Interfaces
{
    public interface IProgramRepository
    {
        Task<string> ListAsync();

        Task<string> GetAsync(string id);

        Task<string> GetExercisesAsync(string id);
    }
}