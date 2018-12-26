using AutoMapper;
using BL.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Util;

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
            services.AddHealthChecks()
                .AddNpgSql(Configuration.GetConnectionString(AppConstants.ConnectionStringNames.Postgresql));
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, AutoMapper.IConfigurationProvider autoMapper)
        {
            app.UseHealthChecks("/healthcheck");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            //            app.UseHttpsRedirection();
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
