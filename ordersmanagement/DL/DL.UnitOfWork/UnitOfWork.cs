using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DL.Entities.Base;
using DL.Interfaces.DbContext;
using DL.Interfaces.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace DL.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IApplicationDbContext _appDbContext;

        public UnitOfWork(IApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public virtual void SaveChanges()
        {
            _appDbContext.SaveChanges();
        }

        public virtual async Task SaveChangesAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }

        public virtual TEntity Add<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            return GetDbSet<TEntity>().Add(entity).Entity;
        }

        public virtual void Add<TEntity>(ICollection<TEntity> entities) where TEntity : BaseEntity
        {
            GetDbSet<TEntity>().AddRange(entities);
        }

        public void Update<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            var dbContext = GetDbContext<TEntity>();
            var dbEntity = dbContext.Set<TEntity>().Single(t => t.Id == entity.Id);
            dbContext.Entry(dbEntity).CurrentValues.SetValues(entity);
        }

        public void Delete<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            var dbSet = GetDbSet<TEntity>();
            dbSet.Attach(entity);
            dbSet.Remove(entity);
        }

        public void DeleteCollection<TEntity>(ICollection<TEntity> entities) where TEntity : BaseEntity
        {
            var dbSet = GetDbSet<TEntity>();
            dbSet.RemoveRange(entities);
        }

        protected IApplicationDbContext GetDbContext<TEntity>()
        {
            if (typeof(BaseEntity).IsAssignableFrom(typeof(TEntity)))
                return _appDbContext;
            throw new InvalidOperationException("The database context not found for entity " + typeof(TEntity).FullName);
        }

        public IEnumerable<TEntity> GetList<TEntity>() where TEntity : BaseEntity
        {
            return GetDbContext<TEntity>().Set<TEntity>();
        }

        public void Dispose()
        {
            _appDbContext?.Dispose();
        }

        protected DbSet<TEntity> GetDbSet<TEntity>() where TEntity : BaseEntity
        {
            return GetDbContext<TEntity>().Set<TEntity>();
        }

        public void Patch<TEntity>(TEntity entity, string[] properties) where TEntity : BaseEntity
        {
            foreach (var property in properties)
            {
                _appDbContext.Entry(entity).Property(property).IsModified = true;
            }
        }
    }
}
