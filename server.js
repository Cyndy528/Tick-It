// require express and other modules 
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  hbs = require('hbs'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user');
// require Ticket model
var Ticket = require('./models/ticket');

// configure body-parser (for form data)
app.use(bodyParser.urlencoded({
  extended: true
}));

// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use public folder for static files
app.use(express.static(__dirname + '/public'));

// set hbs as server view engine 
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partial');

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/ticket'
);

// sign up ROUTE
app.get('/signup', function(req, res) {
  res.render('signup');
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/profile');
        
      });
    }
  );
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        // res.send('signed up!!!');
        res.redirect('/profile')
      });
    }
  );
});

app.get('/profile', function (req, res) {
  res.render('profile', { user: req.user });
});
// log out user
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


app.post('/login', passport.authenticate('local'), function (req, res) {
  res.send('logged in!!!');
});


// login ROUTE
app.get('/login', function(req, res) {
  res.render('login');
});

// HOMEPAGE ROUTE
app.get('/', function(req, res) {
  res.render('index');
});


// API ROUTES

// get all tickets
app.get('/api/tickets', function(req, res) {
  // find all tickets in db
  Ticket.find(function(err, allTickets) {
    if (err) {
      res.status(500).json({
        error: err.message
      });
    } else {
      res.json({
        tickets: allTickets
      });
    }
  });
});

// create new ticket
app.post('/api/tickets', function(req, res) {

  // create new ticket with form data (`req.body`)
  var newTicket = new Ticket(req.body);

  // save new ticket in db
  newTicket.save(function(err, savedTicket) {
    if (err) {
      res.status(500).json({
        error: err.message
      });
    } else {
      res.json(savedTicket);
    }
  });
});


// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});