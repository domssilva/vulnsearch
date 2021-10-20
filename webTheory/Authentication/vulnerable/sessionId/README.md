# Server setup
```bash
npm install     # install dependencies
npm start       # http://localhost:4000
```

# Steps to Attack

1. open 2 different browsers
2. keep the devtools storage tab open, to monitor the cookies
3. login with alice on browser1 {alice:password}
4. login with bob on browser2 {bob:hunter2}

See how the `sessionId` is a predictible value?  
With both accounts logged, in one browser change the sessionId with the
value of the other sessionId to gain access to their account.
