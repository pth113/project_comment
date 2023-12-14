const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.cookie('appCookie', 'cookieValue', {
    sameSite: 'Strict',
    domain: '.myapp.vn',
    httpOnly: true,
    secure: true // Set this to true if served over HTTPS
  });
  res.render('index', { title: 'Express with EJS' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});