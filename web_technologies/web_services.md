# Web Services

I strongly suggest you to read this book if you are new to Web Services: [RESTful Web Services PDF](http://restfulwebapis.org/RESTful_Web_Services.pdf)

## Intro

The web is made out of data and it's full of services: search engines, online stores, blogs, and miscellaneous junk. Rather than installing all this stuff on our pcs we can have 1 single program to access all of these services! a web browser.

`Users -> browsers -> ghraphically renders html for humans`  

The [programamble web](https://en.wikipedia.org/wiki/ProgrammableWeb) is the same. But instead of arranging data in a graphical/attractive way, it serves content in an structured way for programs to fetch it (xml,json,...).  

`programs -> XML/JSON documents` 

Once a web browser has submited its HTTP request it needs to render the response in a way a human being can understand. A web service client doesn't have this luxury. it's programmed in advance, so it has to be both the web browser that fetches the data and the "human" who decides what the data means.

Imagine the programmable web as an ecosystem, containing many kinds of strange creatures and **HTTP** is the thing that all "animals" on the programmable web have in common.  

There are 2 ways of classifying the services that inhabit the programmable web:
- by the technologies they use (SOAP, XML-RPC, URIs)  
- by the underlying architectures and design  

## What is a Web Service (WS)

The technology that allows the communication between applications, independent of the operational system or programming language. A web service is designed to support interoperable machine-to-machine interaction over a network.

![web services](https://www.studytonight.com/rest-web-service/images/what-is-web-services.png)

There are a number of protocols and standards designed for building Web Services.  
These standards are collectively called **the WS-\* stack**.

![Web Services Stack](http://www.ibiblio.org/hhalpin/homepage/presentations/www2006/webservicesstack4.gif)

## Types of Web Services 

- SOAP
- REST
- XML-RPC

...On Progress...

## Web Service Protocols

The protocol stack is used to define, locate, implement and make web services interact with each other.  
A Web Service protocol stack typically stacks 4 protocols for:

1. Transport (HTTP)
2. Messaging (SOAP)
3. Description (WSDL)
4. Discovery (UDDI)
5. Data Exchange format (XML, JSON, ...)

check the list of [Web Service protocols](https://en.wikipedia.org/wiki/List_of_web_service_protocols)

## Web Service Frameworks

| Name           | Platform    | Messaging Model            | Protocols              |
|----------------|-------------|----------------------------|------------------------|
| CodeIgniter    | PHP         | Client/Server              | XML-RPC                |
| Apache Axis    | Java, C++   | Client/Server              | SOAP, WSDL             |  
| .NET           | C#, VB.NET  | Client/Server              | SOAP, WSDL, MTOM       |
| Apache Axis2   | Java        | Client/Server/Asyn/Support | SOAP, WSDL, MTOM, REST |
| Apache  CXF    | Java        | Client/Server/Asyn/Support | SOAP, MTOM, WSDL, REST |

more on [list of web service protocols](https://en.wikipedia.org/wiki/List_of_web_service_frameworks)

## SOAP vs. REST
![](https://3.bp.blogspot.com/-U1UFgnDpn9g/WZJ6JRwlXqI/AAAAAAAAFX0/uXnbkL7cv2c5yqHsYPBOE3H_r6RoW8qgwCK4BGAYYCw/s1600/A1.PNG)
...On Progress...

## WS-Security
...On Progress...


## Good Reads

- [rest web services](https://www.studytonight.com/rest-web-service/introduction)
