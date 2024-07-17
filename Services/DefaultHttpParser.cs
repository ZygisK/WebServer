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

        var lines = requestData.ToString().Split("\r\n"); 
        
        var requestLine = lines[0].Split(" ");
        var path = requestLine[1];
        var method = requestLine[0];
        //var host = requestLine[4];

        //var headers = new List<string>();
        var headers = new List<KeyValuePair<string, string>>();
        
        for (int i = 1; i < lines.Length; i++)
        {
            string line = lines[i];
            if (string.IsNullOrEmpty(lines[i]))
            {
                break;
            }

            int colonIndex = line.IndexOf(':'); //indexOf gets the first occurrence of : in a sting
            
            string key = line.Substring(0,colonIndex); //gets what's before the :
            string value = line.Substring(colonIndex + 1); //gets what's after the :
            headers.Add(new KeyValuePair<string, string>(key, value));
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