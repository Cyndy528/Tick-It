// require express and other modules 
var express = require ('express'), 
	app = express(), 
	bodyParser = require('body-parser'); 
	mongoose = require('mongoose'); 
	hbs = require('hbs'); 

// configure body-parser (for form data)
app.use(bodyParser.urlencoded({ extended: true})); 

// use public folder for static files
app.use(express.static(__dirname +'/public')); 

// set hbs as server view engine 
app.set('view engine', 'hbs'); 

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/ticket-app'
);

// require Ticket model
var Ticket = require('./models/ticket');

// HOMEPAGE ROUTE

app.get('/', function (req, res){
	res.render('index'); 
}); 

// API ROUTES

// test data 
// var allTickets = [
// 	{ ticket: 'Need help', message: 'Computer equipment is broken'}, 
// 	{ ticket: 'Visitors Coming', message: 'Offices needed for guests'}
// ];

app.get('/api/tickets', function (req, res) {
	Ticket.find(function(err, allTickets){
		res.json({ tickets: allTickets});

	});
	 
}); 


// start server on localhost:3000 
app.listen(process.env.PORT || 3000); 