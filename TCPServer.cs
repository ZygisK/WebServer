using System.Net;
using System.Net.Sockets;
using System.Text;
using WebServer_guys.models;
using WebServer_guys.services;

namespace WebServer_guys;

public class TCPServer
{
    private readonly IDefaultHttpParser _parser;
    private TcpListener _tcpListener; //new instance of tcplistender
    private bool running = false; //control the running state

    //constructor
    public TCPServer(IDefaultHttpParser parser)
    {
        _parser = parser;
        _tcpListener = new TcpListener(IPAddress.Any, 5001); //initialises tcplistener on any ipadress at specified port
    }

    public async Task StartServerAsync()
    {
        Console.WriteLine("waiting for connnection");
        _tcpListener.Start(); //listen for incoming requests

        while (true)
        {
            var client = await _tcpListener.AcceptTcpClientAsync(); //tcpClient accepts the request
            Console.WriteLine("client has connected");
            await HandleClient(client); //task.run takes in the parameter of what you want to run asynchronsly
        }
    }
    
    private async Task HandleClient(TcpClient client)
    {
        using var reader = new StreamReader(client.GetStream()); //read the clients stream

        var requestedText = new StringBuilder(); //store the text
        string line;
        while ((line = await reader.ReadLineAsync()) != null && line != string.Empty)
        {
            requestedText.AppendLine(line); //append each line
        }

        var requestModel = _parser.ParseHttpRequest(requestedText); //handle client (read the data)

        SendResponse(client, requestModel);
        client.Close();
    }

    public async Task SendResponse(TcpClient client, HttpRequestModel requestModel)
    {
        // var responseContent = $"Received request \nMethod: {requestModel.Method} \nPath: {requestModel.Path}";
        // foreach (var header in requestModel.Headers)
        // {
        //     responseContent += $"{header}\n";
        // }
        
       // var response =
        //    $"HTTP/1.1 200 OK\r\nContent-Length: {Encoding.UTF8.GetByteCount(responseContent)}\r\nContent-Type: text/plain\r\n\r\n{responseContent}";
        

        //var responseBytes = Encoding.UTF8.GetBytes(response);
        
        
        
       // client.GetStream().Write(responseBytes, 0, responseBytes.Length);
       //client.GetStream().Flush();


       string filePath = "Websites/index.html";
       //string filePath = Path.Combine(basePath, requestModel.Path.TrimStart('/'));
        
       Console.WriteLine($"Checking file at path: {filePath}");
       if (File.Exists(filePath))
       {
           var fileContent = await File.ReadAllBytesAsync(filePath);
           var responseHeader = $"HTTP/1.1 200 OK\r\nContent-Type: {GetContentType(filePath)}; charset=utf-8\r\nContent-Length: {fileContent.Length + fileContent.Length}\r\n\r\n";
           //string responseHeader = "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Length: 13\r\n\r\n<h1>Hello</h1>";
           
           Console.WriteLine($"Sending {fileContent.Length} bytes with header: {responseHeader}");
           
           var responseBytes = Encoding.UTF8.GetBytes(responseHeader);

           await client.GetStream().WriteAsync(responseBytes, 0 , responseBytes.Length);
           await client.GetStream().WriteAsync(fileContent, 0 , fileContent.Length);
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