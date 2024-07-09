using System.Net.Sockets;

namespace WebServer_guys;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly TCPServer _server;

    public Worker(ILogger<Worker> logger, TCPServer server)
    {
        _logger = logger;
        _server = server;
    }

    public void StartWebsites()
    {
        // foreach (var website in websites)
        // {
        //     var server = new TCPServer(website);
        // }
        _server.StartServer();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        StartWebsites();
        while (!stoppingToken.IsCancellationRequested)
        {
            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            }

            await Task.Delay(1000, stoppingToken);
        }
    }
}