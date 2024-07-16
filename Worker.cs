using System.Net.Sockets;
using Microsoft.Extensions.Options;
using WebServer_guys.models;
using WebServer_guys.services;

namespace WebServer_guys;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly TCPServer _server;
    private readonly IDefaultHttpParser _parser;

    private readonly IList<WebsiteModel>? websites;

    public Worker(IOptions<WebsiteConfig> websiteConfig, ILogger<Worker> logger, TCPServer server, IDefaultHttpParser parser)
    {
        websites = websiteConfig.Value.Websites;
        _logger = logger;
        _server = server;
        _parser = parser;
    }

    public void StartWebsites()
    {
        foreach (var website in websites) //start a website
        {
            var websiteServer = new TCPServer(_parser); 
            _ = websiteServer.StartServerAsync(website);
        }
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        StartWebsites();
        while (!stoppingToken.IsCancellationRequested)
        {
            if (_logger.IsEnabled(LogLevel.Information))
            {
                // _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            }

            await Task.Delay(1000, stoppingToken);
        }
    }
}