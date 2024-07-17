using System.Net;
using System.Net.Sockets;
using System.Text;
using WebServer_guys.models;
using WebServer_guys.services;

namespace WebServer_guys;

public class TCPServer
{
    private readonly IDefaultHttpParser _parser;
    private TcpListener _tcpListener; //new instance of tenderiser

    private WebsiteModel _website;

    //constructor
    public TCPServer(IDefaultHttpParser parser)
    {
        _parser = parser;
    }

    public async Task StartServerAsync(WebsiteModel website)
    {
        _website = website;
        _tcpListener = new TcpListener(IPAddress.Any, website.Port); // Initialize listener on any IP address at the specified port
        Console.WriteLine($"Waiting for connection on port {website.Port}");
        _tcpListener.Start(); // Listen for incoming requests

        while (true)
        {
            var client = await _tcpListener.AcceptTcpClientAsync(); // Accept incoming request
            Console.WriteLine("Client has connected");
            _ = HandleClient(client); // Handle client asynchronously, _ is called a discard variable, it's a way to call asynchronously method without waiting for it to complete and capture result
        }
    }

    private async Task HandleClient(TcpClient client)
    {
        try
        {
            using var reader = new StreamReader(client.GetStream()); // Read the client's stream

            var requestedText = new StringBuilder(); // Store the text
            string line;
            while ((line = await reader.ReadLineAsync()) != null && line != string.Empty)
            {
                requestedText.AppendLine(line); // Append each line
            }

            var requestModel = _parser.ParseHttpRequest(requestedText); // Handle client (read the data)

            

            await SendResponse(client, requestModel); // Send response
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error handling client: {ex.Message}");
        }
        finally
        {
            client.Close();
        }
    }

    public async Task SendResponse(TcpClient client, HttpRequestModel requestModel)
    {
        string basepath = "Websites";
        string websitePath = _website.Path;
        //string homepage = _website.DefaultPage;
        string requestPath = requestModel.Path;

        if (requestPath == "/")
        {
            requestPath = _website.DefaultPage;
        }
        
        else
        {
            requestPath = requestPath.TrimStart('/');
        }
        
        string filePath = Path.Combine(basepath, websitePath, requestPath);
        Console.WriteLine($"Checking file at path: {filePath}");
        
        if (File.Exists(filePath))
        {
            var fileContent = await File.ReadAllBytesAsync(filePath);
            var responseHeader =
                $"HTTP/1.1 200 OK\r\nContent-Type: {GetContentType(filePath)}; charset=utf-8\r\nContent-Length: {fileContent.Length}\r\n\r\n";
            //string responseHeader = "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Length: 13\r\n\r\n<h1>Hello</h1>";
        
            Console.WriteLine($"Sending {fileContent.Length} bytes with header: {responseHeader}");
        
            var responseBytes = Encoding.UTF8.GetBytes(responseHeader);
        
            await client.GetStream().WriteAsync(responseBytes, 0, responseBytes.Length);
            await client.GetStream().WriteAsync(fileContent, 0, fileContent.Length);
            await client.GetStream().FlushAsync();
        
            Console.WriteLine("Response sent successfully.");
        }

        else
        {
            string response = "HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n";
            var responseBytes = Encoding.UTF8.GetBytes(response);
            Console.WriteLine("File not found, sending 404.");
            await client.GetStream().WriteAsync(responseBytes, 0, responseBytes.Length);
            await client.GetStream().FlushAsync();
        }
    }
    private string GetContentType(string path)
    {
        var extension = Path.GetExtension(path).ToLower();
        switch (extension)
        {
            case ".html":
                return "text/html";
            case ".css":
                return "text/css";
            case ".js":
                return "application/javascript";
            case ".png":
                return "image/png";
            case ".jpg":
            case ".jpeg":
                return "image/jpeg";
            default:
                return "application/octet-stream";
        }
    }
}