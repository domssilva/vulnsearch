const express = require('express');
const {createReadStream} = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// random generated string used for the cookie signature
const COOKIE_SECRET = 'AJM39JF9WR0Adsfjo9';

// server config
app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.urlencoded({extended: false}));

// "database" data
const db = {
  USERS : {
    alice: 'password',
    bob: 'hunter2',
  },
  BALANCES : {
    alice: 350.50,
    bob: -1400,
  },
  // mapping sessionId -> username
  SESSIONS: {
  },
};

// routes
app.get('/', (req, res) => {
  const sessionId = req.cookies.sessionId;
  const username = db.SESSIONS[sessionId];
  if (username) {
    const balance = db.BALANCES[username];
    const html = `
      <html>
        <body>
          <h3>${username}'s account:</h3>
          <p>
            Balance =
            $<span style="color:${balance > 0? 'green': 'red'}">${balance}</span>
          </p>
          <button>
            <a href="/logout">logout</a>
          </button>
        </body>
      </html>
    `;
    res.send(html);
  } else {
    createReadStream('index.html').pipe(res);
  }
});

let nextSessionId = 0;

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (password === db.USERS[username]) {
    // res.cookie('username', reqUsername, {signed: true});
    res.cookie('sessionId', nextSessionId);
    db.SESSIONS[nextSessionId] = username;
    nextSessionId += 1;
    res.redirect('/');
  } else {
    res.send('authentication failed.');
  }
});

app.get('/logout', (req, res) => {
  /*
    deleting the cookie
    username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT

    There is no standard way of deleting cookies, so basically when we destroy the cookie,
    the browser just reassigns it to an empty string and sets and expiration date to any arbitrary
    in the past date so that the cookie cease to exist.

    VULNERABILITY: if you store the user session, you can still log in as user after they logged out
  */
  const sessionId = req.cookies.sessionId;
  delete db.SESSIONS[sessionId];
  res.clearCookie('sessionId');
  res.redirect('/');
});

app.listen(4000, () => console.log('listening on http://localhost:4000'));

