using WebServer_guys;
using WebServer_guys.services;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<Worker>();

builder.Services.AddTransient<IDefaultHttpParser, DefaultHttpParser>();
builder.Services.AddTransient<TCPServer>();

var host = builder.Build();

host.Run();
