using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DL.Entities.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DL.Interfaces.DbContext
{
    public interface IDbContext
    {
        DbSet<T> Set<T>() where T : BaseEntity;
        EntityEntry<T> Entry<T>(T entity) where T : BaseEntity;
        int SaveChanges();
        Task<int> SaveChangesAsync();
        void Dispose();
    }
}
