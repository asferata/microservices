﻿using DL.Context;
using DL.Entities;
using DL.Interfaces.DbContext;
using DL.Interfaces.Repository;
using DL.Interfaces.UnitOfWork;
using DL.Migrations;
using DL.Repositories;
using DL.Util;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Util;

namespace DL.Infrastructure
{
    public static class ServiceSetup
    {
        private static IServiceCollection _services;

        public static void RegisterDataServices(this IServiceCollection services, IConfiguration configuration)
        {
            _services = services;
            SetupEntityFramework(configuration);
            MigrateDatabase();
            RegisterServices();
        }

        private static void SetupEntityFramework(IConfiguration configuration)
        {
            _services.AddHealthChecks()
                .AddDbContextCheck<ApplicationDbContext>();

            var connectionString = configuration.GetConnectionString(AppConstants.ConnectionStringNames.Postgresql);
            _services.AddEntityFrameworkNpgsql().AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql(connectionString,
                    b => b.MigrationsAssembly(typeof(ApplicationDbContextFactory).Assembly.GetName().Name));
            });
        }

        private static void MigrateDatabase()
        {
            var context = (ApplicationDbContext)_services.BuildServiceProvider().GetService(typeof(ApplicationDbContext));
            context.Database.Migrate();
        }

        private static void RegisterServices()
        {
            _services.AddScoped<IUnitOfWork, UnitOfWork.UnitOfWork>();
            _services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
            _services.AddScoped<IRepository<Order>, Repository<Order>>();
        }
    }
}
