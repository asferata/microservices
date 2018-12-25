using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DL.Entities.Base;
using DL.Interfaces.DbContext;
using DL.Interfaces.Repository;
using DL.Util.DataLayerExceptions;
using Microsoft.EntityFrameworkCore;

namespace DL.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity: BaseEntity
    {
        protected readonly IApplicationDbContext _dbContext;

        public Repository(IApplicationDbContext context)
        {
            _dbContext = context;
        }
        public async Task<TEntity> GetByIdAsync(long id)
        {
            return await _dbContext.Set<TEntity>().FirstOrDefaultAsync(entity => entity.Id == id).ConfigureAwait(false) ??
                   throw new EntityNotFoundException();
        }

        public Task<List<TEntity>> ListAsync()
        {
            return _dbContext.Set<TEntity>().ToListAsync();
        }
    }
}
