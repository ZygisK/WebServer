using System.Net.Sockets;
using System.Text;
using WebServer_guys.models;

namespace WebServer_guys.services;

public class DefaultHttpParser : IDefaultHttpParser
{
    //Figure out a way to map headers and return a httprequestmodel
    public HttpRequestModel ParseHttpRequest(StringBuilder requestData)
    {
        //actually parsing the logic.
        
        //TODO why does it come in as random binary data? did you use debugger? 
        //TODO what if the headers arnt in that order?? cant hardcode that. 
        var lines = requestData.ToString().Split("\r\n");
        
        var requestLine = lines[0].Split(" ");
        var path = requestLine[1];
        var method = requestLine[0];
        //var host = requestLine[4];

        var headers = new List<string>();
        
        for (int i = 1; i < lines.Length; i++)
        {
            if (string.IsNullOrEmpty(lines[i]))
            {
                break;
            }
            headers.Add(lines[i]);
        }

        return new HttpRequestModel
        {
            //Host = host,
            Path = path,
            Method = method,
            Headers = headers
        };
    }
}