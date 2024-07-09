using System.Net.Sockets;
using System.Text;
using WebServer_guys.models;

namespace WebServer_guys.services;

public class DefaultHttpParser : IDefaultHttpParser
{
    
    
    //Figure out a way to map headers and return a httprequestmodel
    public HttpRequestModel ParseHttpRequest(StringBuilder requestData)
    {
        throw new NotImplementedException();
    }
}