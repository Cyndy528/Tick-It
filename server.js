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


//route for creating a user
app.post('/api/users', function(req, res) {
	var user = req.body;
	db.User.createSecure(user, function(err, user) {
		if (err) {
			console.log(err);
			res.status(404).send("<p>Error</p>");
		} else {
			console.log("user is: " + user);
			res.json(user);
	}
	});
});

//route for check if current user
app.get('/api/current-user', function (req, res) {
	console.log("found current user");
	res.json(user);
});

//route for logging in
app.post('/api/login', function (req, res) {
	var user = req.body;
	User.authenticate(user.email, user.password, function (err, authUser) {
		console.log("error, authUser", err, authUser);
		if (!authUser) {
			res.status(404).send("<p>Error</p>");
		} else {	
			res.json(authUser);
		}
	});
});

//route for logging out
app.get('/api/logout', function (req, res) {
	res.json({ msg: "User logged out successfully" });
});

//route for creating a ticket
app.post('/api/users/:id/tickets', function (req, res) {
	db.User.findById( req.params.id, function (err, user) {
			if (err) console.log(err);
			user.tickets.push(req.body);
			var tickets = user.tickets[user.tickets.length -1];
			console.log("ticket is: ", ticket);
			user.save(function (err) {
				if (err) console.log(err);
				console.log("user is: ", user);
				res.json(ticket);

			});
					
		
	});	
});

//route for modifying the ticket
app.put('/api/users/:userid/tickets/:id', function (req, res) {
	db.User.findById( req.params.userid, function (err, user) {
		if (err) console.log(err);
		console.log("user is", user);
		console.log("req.body is: " + req.body.comment);
		user.tickets.id(req.params.id).completed = true;
		user.tickets.id(req.params.id).comment = req.body.comment;
		user.save(function (err) {
			if (err) console.log(err);
			console.log("now user is: ", user);
			res.json(user);
		});
	});
});


//route for deleting a ticket
app.delete('/api/users/:userid/tickets/:id', function (req, res) {
	db.User.findById( req.params.userid, function (err, user) {
		console.log("user is: ", user);
		user.tickets.id(req.params.id).remove();
		user.save(function (err) {
			if (err) console.log(err);
			console.log("ticket has been deleted, now user is: ", user);
			res.json(user);
		});
	});
});


app.get('/api/tickets', function (req, res) {
	Ticket.find(function(err, allTickets){
		res.json({ tickets: allTickets});

	});
	 
}); 



// start server on localhost:3000 
app.listen(process.env.PORT || 3000); 