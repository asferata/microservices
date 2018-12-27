using System.Threading.Tasks;
using BL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Orchestrator.Controllers
{
    [ApiVersion("1")]
    [Route("api/v{Api-Version:apiVersion}/[controller]")]
    [ApiController]
    public class ProgramsController : ControllerBase
    {
        private readonly IProgramService _programService;

        public ProgramsController(IProgramService programService)
        {
            _programService = programService;
        }
        
        [HttpGet]
        public async Task<ActionResult> List()
        {
            var result = await _programService.ListAsync().ConfigureAwait(false);
            return new OkObjectResult(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(string id)
        {
            var result = await _programService.GetAsync(id).ConfigureAwait(false);
            return new OkObjectResult(result);
        }
        
        [HttpGet("{id}/exercises")]
        public async Task<ActionResult> GetExercises(string id)
        {
            var result = await _programService.GetExercisesAsync(id).ConfigureAwait(false);
            return new OkObjectResult(result);
        }
    }
}