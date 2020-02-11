# Basic Privilege Escalation on Linux

[![Linux Privilege Escalation](https://img.youtube.com/vi/oYHAi0cgur4/0.jpg)](https://www.youtube.com/watch?v=oYHAi0cgur4 "Linux Privilege Escalation")

## First Step: Enumeration

<b>Scenario: </b>
<span style="color: green;"> You have a shell as a non-root user</span>  
<small>
Enumeration is key.
</small>

1. Info gathering about the System and the current User

|        command         |                        purpose                        |
| ---------------------- | ----------------------------------------------------- |
|        `uname -a`      |   get the kernel version                              | 
|        `whoami`        |   get your current username                           |
|        `history`       |   check the user's commands history                   | 
|        `pwd`           |   get the current directory you are in                |
|        `env`           |   get environment variables (may contain credentials) | 

2. Who else has logged in?

|       command        |       purpose        |
| -------------------- | -------------------- |
|        `last`        |  information about previous logins          |
|        `w`           |  who currently are logged into the system   |
|        `who`         |  who currently are logged into the system   |

3. are you in the sudoers file?

|         command        |       purpose        |
| ---------------------- | -------------------- | 
|     `cat /etc/sudoers` | list sudoer users   |
|     `sudo -l`          | list some of the commands you can run as a sudoer (if you are a sudoer) |

4. are there other super users?  
<small>
always keep in mind that root is not the only administrator of every system. Sometimes you have other super users 
who have the ability to run commands as root as well.
</small>

|                 command                 |       purpose        |
| --------------------------------------- | -------------------- |
|   `grep -v -E "^#" /etc/passwd \| awk`   |     super users      |

5. gathering network info  
<small> 
what interfaces are on the system
</small>

|         command        |       purpose        |
| ---------------------- | -------------------- |
|     `lsof -i`          | information on a system                                                        |
|     `netstat -antup`   | what ports are currently open and what processes are attached to those ports   |
|     `ifconfig -a`      | get information about the interfaces that are listening on the current system  |

6. vulnerable services?  
<small>
Look for services running as privileged users, check for their versions and search for known exploits
</small>

|         command        |       purpose        |
| ---------------------- | -------------------- |
|   `ps -ef`             |  super users   |
|   `ps aux \| grep root` |  same as 'ps aux' but as root |
|   `dpkg -l`, `rpm -qa`, `httpd -v`, `mysql --version`, etc...  |  list versions of installed software   |
|   `ps aux`             |  enumerate services that are currently running |

7. Look for interesting Files

|                  command                      |          purpose          |
| --------------------------------------------- | ------------------------- |
|   `find / -perm -u=s -type f 2>/dev/null`     |  SUID files?              |
|   `cat /etc/shadow`                           |  output password hashes   |
|   `ls -la /etc/cron*`                         |  check jobs/tasks         |
|   `ls -la ~/.ssh/`                            |  check on all user's dirs |
|   `find . -type f -maxdepth 4 \| xargs grep -i "password"` | Look for cleartext creds in files for various scripts,DB's, config files, etc... |

## Second Step: Search Exploits

- [rapid7](https://www.rapid7.com/db/)
- [exploit-db](https://www.exploit-db.com)
- [cve details](https://www.cvedetails.com)
- google

### Good reads

- [GTFOBins](https://gtfobins.github.io)
- [Basic Linux Privilege Escalation](https://blog.g0tmi1k.com/2011/08/basic-linux-privilege-escalation/)
- [Quick guide to Linux privilege escalation](https://insidetrust.blogspot.com/2011/04/quick-guide-to-linux-privilege.html)

### Labs

- [Hack the Box](www.hackthebox.eu)
- [Vulnhub](www.vulnhub.com)

