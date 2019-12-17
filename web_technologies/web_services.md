## Contents
- <a href="#intro">Intro</a>
- <a href="#types">Types of Web Services</a>
- <a href="#vs">SOAP vs. REST</a>
- <a href="#sec">WS-* Security</a>
- <a href="#greads">Good Reads</a>

<h1 id="intro">Intro</h1>

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

## Web Service Protocols

The protocol stack is used to define, locate, implement and make web services interact with each other.  
A Web Service protocol stack typically stacks 4 protocols, i.e :

1. Transport (HTTP)
2. Messaging (SOAP)
3. Description (WSDL)
4. Discovery (UDDI)
5. Data Exchange format (XML, JSON, ...)

check the list of [Web Service protocols](https://en.wikipedia.org/wiki/List_of_web_service_protocols)

___
<h1 id="types">Types of Web Services</h1>

#### RESTful
REST defines a set of architectural principles by which you can design Web services that focus on a system’s resources, including how resource states are addressed and transferred over HTTP by a wide range of clients written in different languages.

- HTTP
- stateless
- expose directory structure-like URIs
- transfer XML, JSON or both

#### SOAP-based
A SOAP-based web service involves the sending of an XML message. These messages move from one system to another, usually via HTTP. The receiving system interprets the message, does what it's supposed to do, and sends back a response in the form of another SOAP message.

- SOAP  
- WDSL
- UDDI

#### XML-RPC
RPCs (Remote Procedure Calls) have traditionally been procedures called in a program on one machine that go over the network to some RPC server that actually implements the called procedure. The RPC server bundles up the results of the procedure and sends those results back to the caller. The calling program then continues executing. While this system requires a lot of overhead and latency, it also allows less powerful machines to access high powered resources. 

XML-RPC works by encoding the RPC requests into XML and sending them over a standard HTTP connection to a server or listener piece. The listener decodes the XML, executes the requested procedure, and then packages up the results in XML and sends them back over the wire to the client. The client decodes the XML, converts the results into standard language datatypes, and continues executing.

## Web Service Frameworks

| Name           | Platform    | Messaging Model            | Protocols              |
|----------------|-------------|----------------------------|------------------------|
| CodeIgniter    | PHP         | Client/Server              | XML-RPC                |
| Apache Axis    | Java, C++   | Client/Server              | SOAP, WSDL             |  
| .NET           | C#, VB.NET  | Client/Server              | SOAP, WSDL, MTOM       |
| Apache Axis2   | Java        | Client/Server/Asyn/Support | SOAP, WSDL, MTOM, REST |
| Apache  CXF    | Java        | Client/Server/Asyn/Support | SOAP, MTOM, WSDL, REST |

more on [list of web service protocols](https://en.wikipedia.org/wiki/List_of_web_service_frameworks)

___
<h1 id="vs">SOAP vs. REST</h1>

![](https://3.bp.blogspot.com/-U1UFgnDpn9g/WZJ6JRwlXqI/AAAAAAAAFX0/uXnbkL7cv2c5yqHsYPBOE3H_r6RoW8qgwCK4BGAYYCw/s1600/A1.PNG)

SOAP and REST are two API styles that approach the question of data transmission from a different point of view. SOAP is a standardized protocol that sends messages using other protocols such as HTTP and SMTP. The SOAP specifications are official web standards, maintained and developed by the World Wide Web Consortium (W3C). As opposed to SOAP, REST is not a protocol but an architectural style. The REST architecture lays down a set of guidelines you need to follow if you want to provide a RESTful web service, for example, stateless existence and the use of HTTP status codes.

The REST architecture allows API providers to deliver data in multiple formats such as plain text, HTML, XML, YAML, and JSON, which is one of its most loved features. Thanks to the increasing popularity of REST, the lightweight and human-readable JSON format has also quickly gained traction, as it’s super suitable for quick and painless data exchange.

JSON:
```json
{
   "username" : "my_username",
   "password" : "my_password",
   "validation-factors" : {
      "validationFactors" : [
         {
            "name" : "remote_address",
            "value" : "127.0.0.1"
         }
      ]
   }
}
```

XML:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<authentication-context>
   <username>my_username</username>
   <password>my_password</password>
   <validation-factors>
     <validation-factor>
       <name>remote_address</name>
       <value>127.0.0.1</value>
     </validation-factor>
   </validation-factors>
</authentication-context>
```

SOAP follows a formal and standardized approach that specifies how to encode XML files returned by the API. A SOAP message is, in fact, an ordinary XML file that consists of the following parts:

1. Envelope **(required)**
2. Header (optional)
3. Body **(required)**
4. Fault (optional)

Here is how an ordinary SOAP message looks like. The example is from the [W3C SOAP docs](https://www.w3.org/TR/soap12/) and it contains a SOAP envelope, a header block, and a body:

```xml
<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">
  <env:Header>
    <n:alertcontrol xmlns:n="http://example.org/alertcontrol">
      <n:priority>1</n:priority>
      <n:expires>2001-06-22T14:00:00-05:00</n:expires>
    </n:alertcontrol>
  </env:Header>
  <env:Body>
    <m:alert xmlns:m="http://example.org/alert">
      <m:msg>Pick up Mary at school at 2pm</m:msg>
    </m:alert>
  </env:Body>
</env:Envelope>
```

SOAP will likely continue to be used for enterprise-level web services that require high security and complex transactions. APIs for financial services, payment gateways, CRM software, identity management, and telecommunication services are commonly used examples of SOAP. 

___
<h1 id="sec">WS-* Security</h1>

Web services, like other distributed applications, require protection at multiple levels:

1. Transport-level Security
   - SOAP messages that are sent on the wire should be delivered confidentially and without tampering
   - The server needs to be confident who it is talking to and what the clients are entitled to
   - The clients need to know that they are talking to the right server, and not a phishing site
2. Application-level Security
   - message access control

...

___
<h2 id="greads">Good Reads</h2>
  
- [RESTful Web Services PDF](http://restfulwebapis.org/RESTful_Web_Services.pdf)
- [OWASP web services](https://www.owasp.org/index.php/Web_Services)
- [rest web services](https://www.studytonight.com/rest-web-service/introduction)
- [IBM SOAP and web services](https://www.ibm.com/developerworks/webservices/tutorials/ws-understand-web-services1/ws-understand-web-services1.html)
- [IBM XML-RPC in Perl](https://www.ibm.com/developerworks/library/ws-xpc1/index.html)
- [IBM RESTful Web services](https://developer.ibm.com/articles/ws-restful/)
- [REST vs SOAP](https://raygun.com/blog/soap-vs-rest-vs-json/)
- [ORACLE -Understanding Web Services Security Concepts](https://docs.oracle.com/cd/E17904_01/web.1111/b32511/intro_security.htm#WSSEC1112)
- [IBM SOAP web services security](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.2.0/com.ibm.cics.ts.webservices.doc/wsSecurity/dfhws_WSSecurity.html)

## Security Standards and specifications
[OASIS](https://www.oasis-open.org/standards)  
[W3C](https://www.w3.org/standards/)  
[Liberty Alliance Project](http://projectliberty.org/liberty/specifications__1/)