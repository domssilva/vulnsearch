# API testing 101

[Intro](#intro) : *I explain here how to use an API, if you are familiar with this just skip this section*  
[Recon](#recon) : *the most critical part*  
[Checklist](#checklist)

##### Sources

[youtube playlist](https://www.youtube.com/playlist?list=PLee3sU0037ys6EjinZMIZzJPYGl3vUYRV)

___

# intro

## what is an API

API = Application Programming Interface (just a fancy name)

You will see many definitions on the web about what an API is but I don't like them, they make it sound like it's rocket science when in reality it is not.  
An **API is just a program that lets you interact with data or functions**. That's it.

You make a request -->  
API responds with data/function <--

The majority of APIs require authentication as a way of securing, tracking and limiting *who* is accessing their data.

You make a request (+credentials) -->   
If credentials are valid:
API responds with data <--  
Else: API responds with error <--

![rest API diagram](https://github.com/nessun00x/vulnsearch/raw/master/static/images/REST_API.png?raw=true)

an API is made for software-to-software interaction, that's why it generally doesn't have a graphical interface.

![simplified example of API call](https://github.com/nessun00x/vulnsearch/raw/master/static/images/apidiagram.png?raw=true)

but API provide more than just data, they can also provide functionalities!
That's why there are many types of APIs

![](https://github.com/nessun00x/vulnsearch/raw/master/static/images/api_classes.png?raw=true)

## What's the point of using an API  
Could you imagine having to write down manually all the data that is displayed in sites like this: [imdb](https://www.imdb.com/showtimes/?ref_=nv_tp_sh_3) ?  

How annoying and worse, time consuming, would it be to write down each movie title, year of production, cast, rating, etc etc etc ?!  
This would take foreeever, and we are not even talking about mainting and editing the stuff...
that's why developers rely on APIs to fetch (get) their data.

## Using APIs
If you are new to bug bounties and want to test for APIs but you're not familiar with web development this part is critical, you need to get your hands on an API and play with it to understand what
this is all about. you can read all day long about what an API is and still be confused about it. 

I will guide you on how to use a very simple API called OpenAQ, it is very simple to use since it doesn't require an account in order to be used.

### First step

The very first step to use an API is to **read the documentation**.

API Docs = [Open Air Quality](https://docs.openaq.org) 

this is a critical part because without the docs you don't know the **parameters** and **endpoints** to be used.  
Basically if it is easy or not to use a certain API depends if it is well documented or not.

ok, let's start!

##### Reading the Docs

generally you don't read an API documentation in a linear way, you don't need to read line by line and get bored to death.   
What you want to look for is **where to request (endpoints)** and **how to request (parameters)** . You will get used to it with practice

Let's start!

##### where to request, finding the endpoints

Don't be intimidated by the huge amount of information in the docs, as I said you will not read everything. 
As I am scrolling through the docs I am searching for:
1. examples
2. parameters

reading the examples we see that one thing is in common with all requests: `https://api.openaq.org/v1/` so by this we can conclude that this is the base API url.

and the only part that changes between the requests is what comes after this API url, so those are the **endpoints**.

```

https://api.openaq.org/v1/cities
https://api.openaq.org/v1/countries
ttps://api.openaq.org/v1/fetches
.
.
.
```

### Making your first call

##### Must know:

- [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [building URL queries](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL
)  

Since I'm interested in using the `location` field I will focus on reading the explanation about it.

![documentation print](https://github.com/nessun00x/vulnsearch/blob/master/static/images/api_docs.png?raw=true)

`https://api.openaq.org/v1/locations`

I decided to look for information about Portugal, so I'll use the parameter `country` and by their example I presume the parameter format will look something like `country[]=PT`

##### forming the Request query

`https://api.openaq.org/v1/locations?country[]=PT`

Just visit the link to see the response or use curl:  
`curl https://api.openaq.org/v1/locations?country[]=PT | json_pp`

The response is in [JSON format](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON). why? because the developers of the API wanted to, JSON is very popular in APIs but this doesn't mean that every API will use only JSON, so keep that in mind.

Now I want to limit the amount of info, I see that they have a parameter `limit`

#### chaining parameters

`https://api.openaq.org/v1/locations?country[]=PT&limit=5`  
`https://api.openaq.org/v1/locations?country[]=PT&limit=5&has_geo=true`

##### Summary

API/Endpoint = https://api.openaq.org/v1  
Parameters = `country, limit, has_geo, ...`  
Endpoint = https://api.openaq.org/v1/locations or just `locations`
___

# recon

Our main goal is to be able to find documentation about the API, this may involve a lot of dorking, wayback machine, github investigation or just simply a lot of luck to find it hidden in some random directory.

testing APIs in bug bounty contexts require a lot of investigation because you don't know anything about the API (hence, [black-box](https://en.wikipedia.org/wiki/Black-box_testing)) 

in a perfect case testing-scenario, after recon we have gathered:
- documentation
- sample calls
- endpoints
- credentials

the more you know about the API the more chances of realising a sucessfull attack you have.
___

Let's say that we are testing the domain `www.example-corp.com` and we want to check if they have some hidden api going on 

I'll be using the tool `wfuzz` but you can use whatever you prefer (dirb, gobuster, dirbuster, etc)

#### finding APIs in the domain

``` 
#filename = hidden_api.txt
/api
/v1
/v1.0
/v1.1
/v2
/v2.0
/v3
/v3.0
/api/v1
/api/v1.0
/api/v1.1
/api/v2
/api/v2.0
/api/v3
/api/v3.0
```
`wfuzz -c -u http://www.example-corp.com/FUZZ -w hidden_api.txt -hc 404`

and we found an API on `www.example-corp.com/api/v2`, now we want to see if they have documentation as well.

#### finding documentation

```
#filename = docs_api.txt
/api-docs
/application.wadl
/doc
/docs
/swagger-ui.html
/swagger.json
```

`wfuzz -c -u http://www.example-corp.com/api/v2/FUZZ -w docs_api.txt -hc 404`

and we need to check if we can find more endpoints as well, what parameters are they using?!

We can use the [api SecList](https://github.com/danielmiessler/SecLists/tree/master/Discovery/Web-Content/api), but keep in mind that this is what everyone else is using so start creating your own list with all the endpoints that you find in the wild!

`wfuzz -c -u http://www.example-corp.com/api/v2/FUZZ -w common_api_paths.txt -hc 404`
___

## dorking for API info

google will be your most valuable font of info in a black-box testing scenario. You will need to get creative here, channel you inner Sherlock Holmes and go after every possible clue.

See if they have documentation on www.rapidapi.com, github, random pdf's, forums, chats

- gather employees github accounts (this will be useful for our github investigation)

`"example-corp" "resume"`

`"example-corp" "resume" ext:pdf`

`site:linkedin.com "example-corp"`  

- search for documentation

`"example-corp" "API"`

`"example-corp" "doc"`

`"example-corp" "man"`

- search for meetups, sometime you will find revealing slides/presentations about the company internal structure (trust me, this happens)

`"example-corp" "meetup"`

`"example-corp" "slide"`

`site:slideshare.com "example-corp"`

- search for random info on pastebin, trello, etc

`site:pastebin.com "example-corp" "API"`

`site:trello.com "example-corp" "API"`

- look for other applications that are using this API, you may find their own annotations about the docs on google drive, their forums, chats. take your time to investigate that

`site:google.com/drive "example-corp" "API"`

### Github investigation

I recommend to search this manually even if it's time consuming.

`user:username "API"`  

`user:username "example-corp"`

`org:example-corp "API"`

`"example-corp" "API"`

Don't rely on searching only in their official repository, some employees store juicy info in random accounts that are not directly associated with the official repo

however if there is an official repo for the API pay extra attention to the issues section

![github issues repository tab](https://github.com/nessun00x/vulnsearch/blob/master/static/images/github-issues.png?raw=true)

### if you can't find anything

manual browse the app while burp catches everything. click on everything, visit every single page.. after you believe you visited every path possible look in the burp history and search for api calls.

For example take a look at my burp map of a program that I am working on:

![](https://github.com/nessun00x/vulnsearch/blob/master/static/images/burp_map.png?raw=true)

As you can see sometimes APIs will be hidden inside directories, that's why it's so important to always manually check all the app's structure. 
So keep that in mind and don't always expect that APIs endpoints will be just `wwww.example-corp.com/api`

send them all to intruder, repeater but wait: don't FUZZ them yet!

### the pre-attack phase

first analyze what the requests are about, answer those questions

- is this a pre-built api? (if so, search the documentation)
- where is this data used in the app?
- what technology could this data be interacting with, databases? dynamic content?

### attack!

now that you have a vast understanding about the API 
FUZZ the hell out of every interesting endpoint you found out

just be mindful of what you are trying to achieve while fuzzing, for example don't try to delete or alter the application's original data

##### try all the HTTP VERBS

```
GET       # lists/gets data
PUT       # replace data
PATCH     # update data
POST      # create data
DELETE    # deletes data
```
___

# checklist

Summary of the process:

- Find docs (if possible)
- Find endpoints           
- Find sample calls
- Find keys
- Fuzz


