using Codit.ConnectedCar.API.Authorization;
using Codit.ConnectedCar.API.Common;
using Codit.ConnectedCar.API.HistoricalData;
using Codit.ConnectedCar.API.Tracker;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;

namespace Codit.ConnectedCar.API
{
    public class Startup
    {
        public Startup(IHostingEnvironment environment)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(environment.ContentRootPath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{environment.EnvironmentName}.json", true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddSockets();
            services.AddMemoryCache();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });
            services.Configure<ApiKeyConfig>(Configuration.GetSection("Authorization"));
            services.Configure<TelemetryStorageConfig>(Configuration.GetSection("TelemetryStorage"));

            services.AddSingleton<ApiKeyAttribute>();
            services.AddSingleton<IStorageAccessFactory, StorageAccessFactory>();

            services.AddTransient<IEventService, EventService>();
            services.AddTransient<IHistoricalDataService, HistoricalDataService>();

            SetupSwaggerGeneration(services);
            SetupSignalr(services);
        }

        private static void SetupSwaggerGeneration(IServiceCollection services)
        {
            var swaggerInfo = new Info
            {
                Title = "Connected Car API",
                Version = "v1",
                Description = "API with regards to the Codit Connected Car"
            };

            services.AddSwaggerGen(swaggerGenerationOptions =>
            {
                swaggerGenerationOptions.SwaggerDoc("v1", swaggerInfo);
                swaggerGenerationOptions.DescribeAllEnumsAsStrings();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseCors("AllowAll");
            app.UseMvc();
            app.UseSignalR(x => x.MapHub<TrackerHub>("trackerHub"));
            app.UseSwagger();
            app.UseSwaggerUI(swaggerUiOptions =>
            {
                swaggerUiOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Connected Car API");
            });
        }

        private static void SetupSignalr(IServiceCollection services)
        {
            services.AddSignalRCore();
            services.AddSignalR(x => x.JsonSerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());
            services.AddSingleton(typeof(DefaultHubLifetimeManager<>), typeof(DefaultHubLifetimeManager<>));
            services.AddSingleton(typeof(HubLifetimeManager<>), typeof(DefaultHubLifetimeManager<>));
        }
    }
}