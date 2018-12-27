using System.Threading.Tasks;
using Refit;

namespace DL.Repositories
{
    public interface IProgramApi
    {
        [Get("/api/v1/programs")]
        Task<string> List();
        
        [Get("/api/v1/programs/{id}")]
        Task<string> Get(string id);
        
        [Get("/api/v1/programs/{id}/exercises")]
        Task<string> GetExercises(string id);
    }
}