using System.Net;
using System.Net.Http.Json;
using System.Net.Sockets;
using System.Text;
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

    public void StartServer()
    {
        Console.WriteLine("waiting for connnection");
        _tcpListener.Start(); //listen for incoming requests

        var client = _tcpListener.AcceptTcpClient(); //tcpClient accepts the request
            
        Console.WriteLine("client has connected");
        
        
        //todo listen for full data (fix this)
        using var reader = new StreamReader(client.GetStream()); //read the clients stream
        
        var requestedText = new StringBuilder(); //store the text
        string line;
        while ((line = reader.ReadLine()) != null && line != string.Empty)
        {
            requestedText.AppendLine(line); //append each line
        }
        
        //todo parse the request
        var requestModel = _parser.ParseHttpRequest(requestedText); //handle client (read the data)
        
        //todo figure out response method
        // SendResponse(requestModel)
        client.Close(); 
    }

    //where server listens for incoming connections
    // private void Run()
    // {
    //     running = true;
    //     _tcpListener.Start(); //listen for incoming requests
    //
    //     while (running)
    //     {
    //         Console.WriteLine("waiting for connnection");
    //         
    //         TcpClient client = _tcpListener.AcceptTcpClient(); //tcpClient accepts the request
    //         
    //         Console.WriteLine("client has connected");
    //         
    //         HandleClient(client); //handle client (read the data)
    //         client.Close(); 
    //     }
    //     
    //     _tcpListener.Stop();
    //     running = false;
    // }

    // private void HandleClient(TcpClient client)
    // {
    //     //"using" means it auto desposes data when its no longer needed
    //     using var reader = new StreamReader(client.GetStream()); //read the clients stream
    //     
    //     StringBuilder requestedText = new StringBuilder(); //store the text
    //     String line;
    //     while ((line = reader.ReadLine()) != null && line != String.Empty)
    //     {
    //         requestedText.AppendLine(line); //append each line
    //     }
    //
    //     var request = Request.GetRequest(requestedText.ToString()); //parse the request
    //     Console.WriteLine("Type: " + request?.Type);
    //     Console.WriteLine("URL: " + request?.URL);
    //     Console.WriteLine("Host: " + request?.HOST);
    //     Console.WriteLine("Time ");
    //     //Console.WriteLine("Postman Token: " + request?.POSTMANTOKEN);
    //     //Console.WriteLine(requestedText);
    // // }
}