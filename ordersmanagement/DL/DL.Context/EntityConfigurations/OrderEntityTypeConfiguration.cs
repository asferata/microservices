using System;
using System.Collections.Generic;
using DL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DL.Context.EntityConfigurations
{
    public class OrderEntityTypeConfiguration: IEntityTypeConfiguration<Order>
    {
        private List<Order> _orders;
        public OrderEntityTypeConfiguration()
        {
            CreateInitializeData();
        }

        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.Property(order => order.Title)
                .HasMaxLength(500);

            builder.HasData(_orders.ToArray());
        }

        private void CreateInitializeData()
        {
            _orders = new List<Order>
            {
                new Order { Id = 1, UserId = "101", Title = "New Year's Presents", Amount = 1056.45m, CreateDate = DateTime.UtcNow},
                new Order { Id = 2, UserId = "202", Title = "Table", Amount = 498.21m, CreateDate = DateTime.UtcNow},
                new Order { Id = 3, UserId = "5c20cf2275330c7821d6237c", Title = "Chair", Amount = 381.02m, CreateDate = DateTime.UtcNow},
                new Order { Id = 4, UserId = "5c20cf3b75330c7821d6237d", Title = "Shoes", Amount = 160.45m, CreateDate = DateTime.UtcNow},
            };
        }
    }
}
