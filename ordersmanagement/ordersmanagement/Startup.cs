using AutoMapper;
using BL.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Microsoft.Extensions.DependencyInjection;
using OrdersManagement.Middlewares.ExceptionHandler;

namespace OrdersManagement
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddVersionedApiExplorer(SetupApiExplorerOptions);
            services.AddApiVersioning(SetupApiVersioningOptions);
            services.AddMvcCore().AddJsonOptions(SetupJsonOptions);
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddAutoMapper();
            services.RegisterBusinessServices(Configuration);
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, AutoMapper.IConfigurationProvider autoMapper)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            //            app.UseHttpsRedirection();
            app.UseCustomExceptionHandler();
            autoMapper.AssertConfigurationIsValid();
            app.UseMvc();
        }

        private static void SetupApiExplorerOptions(ApiExplorerOptions options)
        {
            options.GroupNameFormat = "'v'VVV";
            options.SubstituteApiVersionInUrl = true;
        }
        private static void SetupJsonOptions(MvcJsonOptions jsonOptions)
        {
            jsonOptions.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
        }
        private static void SetupApiVersioningOptions(ApiVersioningOptions options)
        {
            options.ReportApiVersions = true;
            options.AssumeDefaultVersionWhenUnspecified = true;
            options.DefaultApiVersion = new ApiVersion(1, 0);
        }
    }
}
