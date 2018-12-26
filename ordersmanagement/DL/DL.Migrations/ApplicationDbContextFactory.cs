using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using DL.Context;
using DL.Util;
using Util;

namespace DL.Migrations
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var configuration = SetupConfigurationRoot();
            var connectionString = configuration.GetConnectionString(AppConstants.ConnectionStringNames.Postgresql);
            var dbContextOptions = SetupDbContextOptions(connectionString);
            return new ApplicationDbContext(dbContextOptions);
        }

        private IConfigurationRoot SetupConfigurationRoot()
        {
            var isDevelopment = IsDevelopment();
            var builder = SetupConfigurationBuilder(isDevelopment);
            return builder.Build();
        }

        private bool IsDevelopment()
        {
            var devEnvironmentVariable = Environment.GetEnvironmentVariable(AppConstants.EnvironmentConfigPropertyName);
            return string.IsNullOrEmpty(devEnvironmentVariable) || devEnvironmentVariable.ToLower() == AppConstants.DevelopmentEnvironmentValue;
        }

        private IConfigurationBuilder SetupConfigurationBuilder(bool isDevelopment)
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            if (isDevelopment)
                builder.AddUserSecrets<ApplicationDbContextFactory>();

            return builder;
        }

        private DbContextOptions<ApplicationDbContext> SetupDbContextOptions(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseNpgsql(connectionString, options => options.MigrationsAssembly(typeof(ApplicationDbContextFactory).Assembly.GetName().Name));
            return optionsBuilder.Options;
        }
    }
}
