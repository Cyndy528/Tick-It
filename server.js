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

app.get('/user', function (req, res){
	res.render('user'); 
});
// API ROUTES 

// get all tickets 
app.get('/api/tickets', function (req, res) {
		res.json({ tickets: tickets});
});

// create a ticket 
app.post('/api/tickets', function (req, res) {
	db.User.findById( req.params.id, function (err, user) {
			if (err); 
			// add ticket to array 
			user.tickets.push(req.body);
			// set sequential id 
			var tickets = user.tickets[user.tickets.length -1];
			user.save(function (err) {
				if (err); 
				// send ticket at JSON response
				res.json(ticket);

			});		
		
	});	
});

// get one ticket 
app.get('/api/tickets/:id', function (req, res) {
	// get ticket id 
	var TicketId = parseInt(req.params.id);
	// find ticket by id 
	var foundTicket = tickets.filter(function (ticket) {
	return ticket._id === ticketId;
	})[0];
	// send foundTicket as JSON response 
	res.json(foundTicket);
});


// update a ticket 
app.put('/api/users/:userid/tickets/:id', function (req, res) {
	// get ticket id 
	db.User.findById( req.params.userid, function (err, user) {
	// find ticket to update by id
	var ticketToUpdate = ticket.filter(function (todo){
		return ticket._id === ticketId; 
	}) [0]; 

	// update the ticket's status
	ticketToUpdate.task = req.body.completed; 

	// update the ticket's department
	ticketToUpdate.department = req.body.department; 

	// update the ticket's description
	ticketToUpdate.description = req.body.description; 

	// update the ticket's date 
	ticketToUpdate.createdAt = req.body.createdAt; 

	// send back updated ticket 
	res.json(ticketToUpdate); 
	}); 

}); 

// delete a ticket 
app.delete('/api/users/:userid/tickets/:id', function (req, res) {
	// get ticket id 
	db.User.findById( req.params.userid, function (err, user) {
	// find ticket to delete by its id
	var ticketToDelete = tickets.filter(function(ticket){
		return ticket._id ===ticketId; 
	})[0]; 

	// remove ticket form 'tickets' array
	tickets.splice(tickets.indexOf(ticketToDelete), 1); 

	// send back deleted ticket
	res.json(ticketToDelete); 
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


//validations
// $('#signUpForm').validate({
// rules: {
//   username: {
//         required: true,
//         email: true
//       },
//   password: {
//         required: true,
//         minlength: 6
//       },
//   password2: {
//         required: true,
//         minlength: 6,
//         equalTo: '#inputPassword'

//       }

//       }

//   });

// log out 
// app.get('/logout', function (req, res) {
	// send back message 
	// res.json({ msg: "You have logged out!" });
// });


// start server on localhost:3000 
app.listen(process.env.PORT || 3000);
