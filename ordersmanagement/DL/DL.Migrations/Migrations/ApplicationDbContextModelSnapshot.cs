﻿// <auto-generated />
using System;
using DL.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DL.Migrations.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("DL.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Amount");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Title")
                        .HasMaxLength(500);

                    b.Property<DateTime?>("UpdateDate");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Orders");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Amount = 1056.45m,
                            CreateDate = new DateTime(2018, 12, 25, 19, 3, 50, 258, DateTimeKind.Utc).AddTicks(6997),
                            Title = "New Year's Presents",
                            UserId = "101"
                        },
                        new
                        {
                            Id = 2,
                            Amount = 498.21m,
                            CreateDate = new DateTime(2018, 12, 25, 19, 3, 50, 258, DateTimeKind.Utc).AddTicks(7521),
                            Title = "Table",
                            UserId = "202"
                        },
                        new
                        {
                            Id = 3,
                            Amount = 381.02m,
                            CreateDate = new DateTime(2018, 12, 25, 19, 3, 50, 258, DateTimeKind.Utc).AddTicks(7525),
                            Title = "Chair",
                            UserId = "5c20cf2275330c7821d6237c"
                        },
                        new
                        {
                            Id = 4,
                            Amount = 160.45m,
                            CreateDate = new DateTime(2018, 12, 25, 19, 3, 50, 258, DateTimeKind.Utc).AddTicks(7529),
                            Title = "Shoes",
                            UserId = "5c20cf3b75330c7821d6237d"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
