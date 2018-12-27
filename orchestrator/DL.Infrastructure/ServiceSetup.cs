using DL.Interfaces;
using DL.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DL.Infrastructure
{
    public static class ServiceSetup
    {
        private static IServiceCollection _services;

        public static void RegisterDataServices(this IServiceCollection services, IConfiguration configuration)
        {
            _services = services;
            RegisterServices();
        }

        private static void RegisterServices()
        {
            _services.AddScoped<IProgramRepository, ProgramRepository>();
        }
    }
}
