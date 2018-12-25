using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DL.Context.EntityConfigurations;
using DL.Entities;
using DL.Entities.Base;
using DL.Interfaces.DbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DL.Context
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new OrderEntityTypeConfiguration());
        }
        
        public override int SaveChanges()
        {
            BeforeSave();
            return base.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            BeforeSave();
            return await base.SaveChangesAsync().ConfigureAwait(false);
        }

        private void BeforeSave()
        {
            var entries = GetEntriesWithState(EntityState.Added, EntityState.Modified);
            Parallel.ForEach(entries, entry => entry.ReviseUpdateAndCreateDates());
        }
        private IEnumerable<EntityEntry> GetEntriesWithState(params EntityState[] entityStates)
        {
            return ChangeTracker.Entries().Where(x => x.Entity is BaseEntity &&
                                                      entityStates.Any(state => x.State == state));
        }

        DbSet<T> IDbContext.Set<T>()
        { 
            return base.Set<T>();
        }

        EntityEntry<T> IDbContext.Entry<T>(T entity)
        { 
            return base.Entry(entity);
        }
    }

    public static class EntityEntryExtensions
    {
        public static void ReviseUpdateAndCreateDates(this EntityEntry entityEntry)
        {
            if (entityEntry.State == EntityState.Added)
            {
                ((BaseEntity)entityEntry.Entity).CreateDate = DateTime.UtcNow;
            }
            ((BaseEntity)entityEntry.Entity).UpdateDate = DateTime.UtcNow;
        }
    }
}
