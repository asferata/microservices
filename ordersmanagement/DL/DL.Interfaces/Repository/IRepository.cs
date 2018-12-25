using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DL.Entities.Base;

namespace DL.Interfaces.Repository
{
    public interface IRepository<TEntity> where TEntity: BaseEntity
    {
        Task<TEntity> GetByIdAsync(int id);
        Task<List<TEntity>> ListAsync();
    }
}
