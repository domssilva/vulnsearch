# Enumeration
Enumeration is the process of making a list of something.
When it comes to hacking, the more knowledge you have about a target, the more options you have available to attack.

## Common tools
* nmap
* nikto
* dnsenum
* dirbuster
* enum4linux

And so many more ...
The goal of those tools is to list information about the target system/network.

## Why enumerating matters
Let's say we have a target system to perform a security audit on.
The very first step would be to learn what things are being shared from this system over the network.

1. Does it have a server running on? 
2. Is it sharing files over SMB? 
3. Is it sharing files over a NFS?

The point is, how can we secure or defend a system without understanding what we need to defend/attack in the first place?!

### Network services and ports
Whenever a system runs a network service, it opens a port. 
This port is specifically associated with the network service and it is used by other systems or applications to connect to it.  

### Network service
Software running at the application layer associated with a port number.
Different services use different packet transmission techniques.  

Services can provide functionalities such as:
1. data storage
2. data manipulation
3. data presentation
4. data communication

### Ports
A computer typically has hundreds of processes running at once, many of which try to access the internet. 
So, when a computer receives a message from another computer, it needs to have a way of knowing which process is expecting the response.
when a process accesses the internet for doing its job, it binds itself to a port number, so the other computer can understand which port to send back to.

in summary, we need ports to direct the traffic to the right application.  

Every computer has a total of 65535 available ports; however many of these are registered as standard ports.  
An example of a well known port is the port 80 which is used by web servers to accept incoming web requests.

* well known ports 0 - 1023
* registered ports 1024 - 49151
* private ports 49152 - 65535

### Port scanning
Port scanning is the process of "poking" at a computer's ports to check if they are open.
For this there are many tools, but the industry standard is nmap.  
In a nutshell, nmap will connect to each port of the target and analyze the response of this connection to determine if the port is open or not. 
Well, nmap can do much more than just this, it's an extremely powerful tool but let's not get into that rn, if you're curious about nmap capabilities take a look at the nmap man page.  

For port scanning there are many techniques involving many networking concepts so make sure you have a good grasp of networking or this will all sound alien.  
When port scanning, there are 3 "main" types:
1. TCP scans
  1. null
  2. FIN
  3. Xmas
3. SYN "half-open" scans
4. UDP scans
5. ping scans (ICMP)

Good practices:
1. saving the output of our scans - it means we'll only have to run this scan once, reducing network traffic plus the chance of being detected.

<!-- 
TODO:
## Demo: Enumerating a system
Let's say we have a target ip address 10.10.186.50 to perform a security audit on.  

I'll start the enumeration process by running a port scan with nmap, so I can gather the list of open ports.  
Once we enumerated the open ports, we can proceed to enumerate the services available.
-->





