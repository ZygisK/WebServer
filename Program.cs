// using WebServer_guys;
//
// var builder = Host.CreateApplicationBuilder(args);
// builder.Services.AddHostedService<Worker>();
//
// var host = builder.Build();
// host.Run();

using System;
using System.Collections.Generic;
using System.Text;

namespace WebServer_guys
{
    class Program
    {
        static void Main(String[] args)
        {
            TCPServer server = new TCPServer(8080);
            server.StartServer();
            Console.WriteLine("Server running");
        }
    }
}

