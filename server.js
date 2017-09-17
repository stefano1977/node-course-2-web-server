const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

// paertials sono le viste tipo il footer e l'header
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + req.method + req.url;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unabel to append to server.log')
    }
  });
  next();
});



hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

// questa è una pagina web
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    name: 'stefano',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
  //res.send({
  //  name: 'stefano',
  //  likes: [
  //    'biking',
  //    'cities'
  //  ]
  //});
});

// questa è una pagina web
app.get('/about', (req, res) => {
  //res.send('about page');
  //res.render('about.hbs');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  })
});

// questa è una pagina web
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port' + port);
});
