namespace WebServer_guys;

public class Request
{
    public String Type { get; set; }
    public String URL { get; set; }
    public String HOST { get; set; }
    public String POSTMANTOKEN { get; set; }
    
    private Request(String type, String url, String host, String postmanToken)
    {
        Type = type;
        URL = url;
        HOST = host;
        POSTMANTOKEN = postmanToken;
    }

    public static Request GetRequest(String request)
    {
        if (String.IsNullOrEmpty(request))
        {
            return null;
        }

        String[] tokens = request.Split(' ');
        
        String type = tokens[0];
        String url = tokens[2];
        String host = tokens[4];
        //String time = tokens[0];
        String postmanToken = tokens[8];
        
        return new Request(type, url, host, postmanToken);
        //return new Request("", "", "", "");
    }
}