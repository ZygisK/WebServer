# C# Webserver

This C# web server project is designed to host multiple websites and serve static files. It is implemented using .NET and leverages key features such as dependency injection, TCP socket programming, and asynchronous processing to efficiently handle HTTP requests.

## Configuration

The server supports hosting multiple websites by reading configuration details from a websites.json file. Each website is defined with its own port and path, allowing the server to run each site on a separate port.

## Project Structure

The project consists of several main components:

* DefaultHttpParser: Parses incoming HTTP requests.
* TCPServer: Manages TCP connections and handles HTTP requests and responses.
* Worker Class: Responsible for starting the web server and managing hosted websites.

### Dependency Injection

This project employs dependency injection to provide instances of essential services, like logging and HTTP parsing, to the necessary classes.

### TCP Socket

The TCPServer class listens for incoming connections on specified ports, reads incoming data, and responds appropriately based on the requested resources. It also accepts and processes connections without waiting for previous ones to complete, allowing for efficient handling of concurrent requests

### HTTP Request Handling
The DefaultHttpParser parses raw HTTP request data into a structured format (HttpRequestModel). It extracts key components, including the request method, path, and headers, enabling the server to handle requests efficiently.
