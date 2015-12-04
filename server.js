// require express and other modules 
var express = require ('express'), 
	app = express(), 
	bodyParser = require('body-parser'); 
	mongoose = require('mongoose'); 
	hbs = require('hbs'); 
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// configure body-parser (for form data)
app.use(bodyParser.urlencoded({ extended: true})); 

// use public folder for static files
app.use(express.static(__dirname +'/public')); 

// set hbs as server view engine 
app.set('view engine', 'hbs'); 
hbs.registerPartials(__dirname + '/views/partial');

// connect to mongodb
mongoose.connect('mongodb://localhost/ticket');

// require Ticket model
var Ticket = require('./models/ticket');

// require User model
var User = require ('./models/user'); 

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
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// HOMEPAGE ROUTE
app.get('/', function (req, res){
	res.render('index', { user: req.user}); 
}); 

// USER PAGE - STAFF
app.get('/user', function (req, res){
	res.render('user', { user: req.user }); 
});

// PROFILE PAGE  - CUSTOMER
app.get('/profile', function (req, res){
	res.render('profile', { user: req.user}); 
});


// AUTH ROUTES

// show signup view
// app.get('index', function (req, res) {
//   // if user is logged in, don't let them see signup view
//   if (req.user) {
//     res.redirect('/profile');
//   } else {
//     res.render('profile', { user: req.user });
//   }
// });

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/', function (req, res) {
  // if user is logged in, don't let them sign up again
  if (req.user) {
    res.redirect('/profile');
  } else {
    User.register(new User({ username: req.body.username }), req.body.password,
      function (err, newUser) {
        passport.authenticate('local')(req, res, function () {
          res.redirect('/profile');
        });
      }
    );
  }
});

// show profile view
app.get('/profile', function (req, res) {
  if (req.user) {
    res.redirect('/profile');
  } else {
    res.render('profile', { user: req.user });
  }
});

// log in user
app.post('/profile', passport.authenticate('local'), function (req, res) {
  res.redirect('/profile');
});

// log out user
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// show user profile page
app.get('/profile', function (req, res) {
  // only show profile if user is logged in
  if (req.user) {
    res.render('profile', { user: req.user });
  } else {
    res.redirect('/index');
  }
});


// API ROUTES

// get all tickets
app.get('/api/tickets', function (req, res) {
  // find all tickets in db
  Ticket.find(function (err, allTickets) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ tickets: allTickets });
    }
  });
});

// create new ticket
app.post('/api/tickets', function (req, res) {
  if (req.user) {
    // create new ticket with form data (`req.body`)
    var newTicket = new Ticket(req.body);

    // save new ticket in db
    newTicket.save(function (err, savedTicket) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        req.user.tickets.push(savedTicket);
        req.user.save();
        res.json(savedTicket);
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized.' });
  }
});

// get one ticket
app.get('/api/tickets/:id', function (req, res) {
  // get ticket id from url params (`req.params`)
  var ticketId = req.params.id;

  // find ticket in db by id
  Ticket.findOne({ _id: ticketId }, function (err, foundTicket) {
    if (err) {
      if (err.name === "CastError") {
        res.status(404).json({ error: "Nothing found by this ID." });
      } else {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.json(foundTicket);
    }
  });
});

// update ticket
app.put('/api/tickets/:id', function (req, res) {
  // get ticket id from url params (`req.params`)
  var ticketId = req.params.id;

  // find ticket in db by id
  Ticket.findOne({ _id: ticketId }, function (err, foundTicket) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      // update the ticket's attributes
      foundTicket.completed = req.body.completed;
      foundTicket.department = req.body.department;
      foundTicket.description = req.body.description;
      foundTicket.createdAt = req.body.createdAt; 

      // save updated ticket in db
      foundTicket.save(function (err, savedTicket) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(savedTicket);
        }
      });
    }
  });
});

// delete ticket
app.delete('/api/tickets/:id', function (req, res) {
  // get ticket id from url params (`req.params`)
  var ticketId = req.params.id;

  // find ticket in db by id and remove
  Ticket.findOneAndRemove({ _id: ticketId }, function (err, deletedDeleted) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(deletedTicket);
    }
  });
});


// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});
