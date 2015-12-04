// require express and other modules 
var express = require ('express'), 
	app = express(), 
	bodyParser = require('body-parser'), 
	mongoose = require('mongoose'),
	hbs = require('hbs'), 
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');
    LocalStrategy = require('passport-local').Strategy;

// configure body-parser (for form data)
app.use(bodyParser.urlencoded({ extended: true})); 

// use public folder for static files
app.use(express.static(__dirname +'/public')); 

// set hbs as server view engine 
app.set('view engine', 'hbs'); 
hbs.registerPartials(__dirname + '/views/partial');

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/ticket'
);

// require Ticket model
var Ticket = require('./models/ticket');

// HOMEPAGE ROUTE
app.get('/', function (req, res){
	res.render('index'); 
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
 
    // create new ticket with form data (`req.body`)
    var newTicket = new Ticket(req.body);

    // save new ticket in db
    newTicket.save(function (err, savedTicket) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(savedTicket);
      }
    });
});


// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});
