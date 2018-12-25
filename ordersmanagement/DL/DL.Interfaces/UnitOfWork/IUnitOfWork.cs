using DL.Entities.Base;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DL.Interfaces.UnitOfWork
{
    public interface IUnitOfWork
    {
        void SaveChanges();

        Task SaveChangesAsync();

        TEntity Add<TEntity>(TEntity entity) where TEntity : BaseEntity;

        void Add<TEntity>(ICollection<TEntity> entities) where TEntity : BaseEntity;

        void Update<TEntity>(TEntity entity) where TEntity : BaseEntity;

        void Delete<TEntity>(TEntity entity) where TEntity : BaseEntity;

        void DeleteCollection<TEntity>(ICollection<TEntity> entities) where TEntity : BaseEntity;

        void Patch<TEntity>(TEntity entity, string[] properties) where TEntity : BaseEntity;
    }
}
