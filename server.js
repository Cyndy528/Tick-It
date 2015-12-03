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
hbs.registerPartials(__dirname + '/views/partial');

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/ticket-app'
);

// require Ticket model
var Ticket = require('./models/ticket');

// require User model
var User = require ('./models/user'); 

// HOMEPAGE ROUTE

app.get('/', function (req, res){
	res.render('index'); 
}); 

// USER PAGE 
app.get('/user', function (req, res){
	res.render('user'); 
});


// API ROUTES 

// get all tickets 
app.get('/api/tickets', function (req, res) {
	// find all tickets in db
	Ticket.find(function(err, allTickets){
		if (err) {
			res.status(500).json({ error: err.message }); 
		} else {
			res.json({ tickets: allTickets}); 
		}
	});
});

// create a new ticket 
app.post('/api/tickets', function (req, res) {
	// create new ticket form data ('req.body')
	var newTicket = new Ticket(req.body); 

	// save new ticket in db
	newTicket.save(function (err, savedTicket) {
		if (err){
		} else {
			res.json(savedTicket); 
		}	
	});	
});

// get one ticket 
app.get('/api/tickets/:id', function (req, res) {
	// get ticket id 
	var TicketId = req.params.id;
	// find ticket in db by id 
	Ticket.findOne({ _id: ticketId }, function (err, foundTicket) {
		if (err) {
			if (err.name === "CastError") {
				res.status(404).json({ error: "Nothing found by this ID." }); 
			} else {
				res.status(500).json({ erro: err.message }); 
			}
			} else {
				res.json(foundTicket); 
			}
		}); 
});


// update a ticket 
app.put('/api/users/:id', function (req, res) {
	// get ticket id 
	var ticketId = req.params.id; 

	// find ticket in db by id
	Ticket.findOne ({ _id: ticketId }, function (err, foundTicket){
		if (err){
			res.status(500).json({ error: err.message }); 
		} else {
			//update the ticket's attributes
			foundTicket.completed = req.body.completed; 

			// update the ticket's department
			foundTicket.department = req.body.department; 

			// update the ticket's description
			foundTicket.description = req.body.description; 

			// update the ticket's date 
			foundTicket.createdAt = req.body.createdAt; 

			// save updated Ticket in db
			foundTicket.save(function (err, savedTicket){
				if (err){
					res.status(500).json ({ error: err.message }); 
				} else {
					res.json(savedTicket); 
		       }
		     });
		    }
		 });
	});

// delete a ticket 
app.delete('/api/tickets/:id', function (req, res) {
	// get ticket id
	var ticketId = req.params.id; 

	// find ticket in db by id and remove 
	Ticket.findOneAndRemove ({ _id: TicketId }, function (err, deletedTicket) {
		if (err) {
			res.status(500).json({ error: err.message }); 
		} else {
			res.json(deletedTicket); 
		}
		}); 
	}); 






// create a user
app.post('/api/users', function(req, res) {
	var user = req.body;
	// creating a secured account 
	db.User.createSecure(user, function(err, user) {
		if (err) {
			res.status(404).send("<p>Error</p>");
		} else {
			console.log("user is: " + user);
			res.json(newUser);
	}
	});
});



// login 
app.post('/login', function (req, res) {
	var user = req.body;
	User.authenticate(user.email, user.password, function (err, authUser) {
		console.log("error, authUser", err, authUser);
		// verification of user 
		if (!authUser) {
			res.status(404).send("<p>Error</p>");
		} else {	
			res.json(authUser);
		}
	});
});



//route for user's page
app.get('/users/:id', function(req, res) {
	if (req.params.id == "demo") {
		res.render("user-show", {demoUser: demoUser});
	} else {
		db.User.findById(req.params.id, function (err, user) {
			if (err) console.log(err);
			console.log("user on page is: ", user);
			res.render("user-show", {user: user});

		});		
	}
  
});

//route for creating a user
app.post('/api/users', function(req, res) {
	var user = req.body;
	db.User.createSecure(user, function(err, user) {
		if (err) {
			console.log(err);
			res.status(404).send("<p>Error</p>");
		} else {
			req.session.user = user;
			res.cookie('userId', user._id);
			console.log("user is: " + user);
			res.json(user);
	}
	});
});

//route for check if current user
app.get('/api/current-user', function (req, res) {
	console.log("found current user");
	res.json({ user: req.session.user, userId: req.cookies.userId });
});

//route for logging in
app.post('/api/login', function (req, res) {
	var user = req.body;
	User.authenticate(user.email, user.password, function (err, authUser) {
		console.log("error, authUser", err, authUser);
		if (!authUser) {
			res.status(404).send("<p>Error</p>");
		} else {
			console.log("no if statement");	
			req.session.user = authUser;
			res.cookie('authUserId', authUser._id);	
			res.json(authUser);
		}
	});
});




// start server on localhost:3000 
app.listen(process.env.PORT || 3000);
