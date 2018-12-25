using Microsoft.Extensions.DependencyInjection;
using System;
using Microsoft.Extensions.Configuration;
using DL.Infrastructure;

namespace BL.Infrastructure
{
    public static class ServiceSetup
    {
        private static IServiceCollection _services;

        public static void RegisterBusinessServices(this IServiceCollection services, IConfiguration configuration)
        {
            _services = services;
            RegisterServices();
            services.RegisterDataServices(configuration);
        }

        private static void RegisterServices()
        {
        }
    }
}
