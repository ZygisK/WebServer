namespace WebServer_guys.models;

public class HttpRequestModel
{
    public string Host { get; set; }
    public string Path { get; set; }

    public IList<string> Headers = new List<string>();
}