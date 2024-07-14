using System.Net.Sockets;
using System.Text;
using WebServer_guys.models;

namespace WebServer_guys.services;

public interface IDefaultHttpParser
{
    HttpRequestModel ParseHttpRequest(StringBuilder requestedData);
}