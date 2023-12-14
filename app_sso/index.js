const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const session = require('express-session');
const MemcachedStore = require('connect-memcached')(session);

const app = express();
const port = 3000;
// Middleware to parse JSON in request bodies
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cookieParser());
/*
app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "script-src 'self' http://myapp.vn");
  return next();
});
*/
app.use(cors({
  //origin: 'https://myapp.vn', for one domain
  origin: ['https://myapp.vn', 'https://test.vn'], //for multi domain
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(
  session({
    secret: 'quangtv',
    resave: false,
    saveUninitialized: true,
    store: new MemcachedStore({
      hosts: ['memcached:11211'], // Use the same host as defined in Docker Compose
      secret: 'quangtv',
    }),
    cookie: {
      sameSite: 'Lax',  // Set SameSite to "Strict"
    },
  })
);
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];
//Test app.use(bodyParser.urlencoded({ extended: true }));
app.get('/test', (req, res) => {
  const responseData = { message: 'Hello, JSONP!' };
  // Check if a callback parameter is provided in the query string
  const callback = req.query.callback;
  if (callback) {
    res.jsonp(responseData, );
  } else {
    // Respond with JSON if no callback is provided
    res.json(responseData);
  }
});
app.get('/view', (req, res) => {
  // Access the session and store some data
  console.log(req.cookies);
  req.session.views = (req.session.views || 0) + 1;
  res.cookie('myCookie', 'cookieValue', {
    sameSite: 'Strict',
    domain: 'other.myapp.vn',
    httpOnly: true,
    priority: 'High',
    secure: true // Set this to true if served over HTTPS
  });
  res.send(`Hello! You have visited this page ${req.session.views} times.`);
});

// Login endpoint
app.post('/login', (req, res) => {
  console.log(req.cookies);
  console.log(req.body);
  const { username, password } = req.body;

  // Simulate user authentication (replace with actual authentication logic)
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Successful login
    res.json({ success: true, message: 'Login successful' });
  } else {
    // Failed login
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
