using BL.Interfaces.Orders;
using BL.Orders;
using DL.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
            _services.AddScoped<IOrderService, OrderService>();
        }
    }
}
