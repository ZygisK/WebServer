using WebServer_guys;
using WebServer_guys.models;
using WebServer_guys.services;

var builder = Host.CreateApplicationBuilder(args);

// Load the base-products.json configuration
var baseProductsConfig = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("websites.json", optional: false, reloadOnChange: true)
    .Build();

    builder.Services.Configure<WebsiteConfig>(baseProductsConfig.GetSection("Websites"));

builder.Services.AddHostedService<Worker>();

builder.Services.AddTransient<IDefaultHttpParser, DefaultHttpParser>();
builder.Services.AddTransient<TCPServer>();

var host = builder.Build();

host.Run();
