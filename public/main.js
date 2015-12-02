// wait for DOM to load before running JS 
$(function(){
	
	// base API route
	var baseUrl = '/api/tickets'; 

	// array to hold ticket data 
	var allTickets = []; 

	// element to display list of tickets
	var $ticketsList = $('#tickets-list'); 

	// form to create new ticket
	var $createTicket = $('#create-ticket'); 

	// compile handlebars template 
	var source = $ ('#tickets-template').html(); 
	var template = Handlebars.compile(source); 


// helper function to render all tickets to view
var render = function() {
	// empty existing tickets from view
	$ticketList.empty(); 

	// pass 'allTickets' into the template function
	var ticketsHtml = template({ tickets: allTickets}); 

	// append html to the view
	$ticketsList.append(ticketsHtml); 
}; 

// GET all tickets on page load
$.get(baseUrl, function (data){
	console.log(data); 

	// set 'allTickets' to ticket data from API
	allTickets = data.tickets; 

	// render all tickets to view
	render(); 
}); 

// listen for submit on form 
$createTicket.on('submit', function (event){
	event.preventDefault(); 

	// serialize form data
	var newTicket = $(this).serialize(); 

	// POST request to create new ticket
	$.post(baseUrl, newTicket, function (data){
		console.log(data); 

		// add new ticket to 'allTickets'
		allTickets.push(data); 

		// render all tickets to view
		render(); 
	}); 

		// reset the form 
		$createTicket[0].reset(); 
		$createTicket.find('input').first().focus(); 
	}); 


	
	// add event-handlers to tickets for updating/deleting
	$ticketsList 

	// for update: submit event '.update-ticket' form 
	.on('submit', '.update-ticket', function (event){
		event.preventDefault(); 

		// find the ticket's id (stored in HTML as 'data-id')
		var ticketId = $(this).closest('.ticket').attr('data-id');

		// find the ticket to update by its id 
		var tickToUpdate = allTickets.filter(function (ticket){
			return ticket._id === ticketId; 
		})[0]; 

		// serialize form data 
		var updatedTicket = $(this).serialize(); 

		// PUT request to update ticket
		$.ajax({
			type: 'PUT', 
			url: baseUrl + '/' + tickedId, 
			data: updatedTicket, 
			success: function(data) {
				// replace ticket to update with newly updated version (data)
				allTickets.splice(allTickets.indexOf(ticketToUpdate), 1, data); 

				// render all tickets to view
				render(); 
			}
		});
	});

	// for delete: click event on '.delete-ticket' button
	('onclick', '.delete-ticket', function (event) {
		event.preventDefault(); 

		// find the ticket's id
		var ticketId = $(this).closest('.ticket').attr('data.id'); 

		// find the ticket to delete by its id
		var ticketToDelete = allTickets.filter(function(ticket){
			return ticket._id === ticketId; 
			}) [0]; 

	// DELETE ticket 
	$.ajax ({
		type: 'DELETE', 
		url: baseUrl + '/' + ticketId, 
		success: function(data) {
			// remove deleted ticket from all tickets
			allTickets.splice(allTickets.indexOf(ticketToDelete), 1); 
			// render all tickets to view
			render(); 
			}
		}); 
 
	}); 
});  


//variable to identify if user is logged in
var user;

//check if a user is logged in
function checkAuth() {
  $.get('/api/current-user', function (data) {
    console.log("data is: " + data);
    if (data.user || data.userId) {
      console.log("logged in");
      $('.not-logged-in').hide();
      $('.visitor').hide();
      user = true;
    } else {
      console.log("not logged in");
      $('.logged-in').hide();
      $('.owner').hide();

      user = false;
    }
  });
}

//When sign up form submitted
$('#signUpForm').on('submit', function(e) {
  e.preventDefault();
  if ($('#signUpForm').valid()) {
    console.log("form submitted");
    var user = $(this).serialize();
    console.log(user);
    $.ajax({
        url: '/api/users',
        type: "POST",
        data: user
    })
    .done(function(data) {
      if (data.status == 404) {
        console.log("err message should activate");
        var msg = "Email already in use";
        errorHandler(msg, 'alert-danger');
      } else {
      window.location.href = "/users/" + data._id;
      console.log("made a new user");
    }
    })
    .fail(function(err) {
      console.log("could not create user");
      var msg = "Email already in use";
        errorHandler(msg, 'alert-danger');
    });
 }
});

//when log out button is clicked
$('#log-out').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: '/api/logout',
    type: "GET"
    
  })
  .done(function(data) {
    console.log(data.msg);
    window.location.reload();

  });

});


// When user logs in
  $('#log-in').on('submit', function(event) {
    e.preventDefault();
    console.log("login form submitted");
    var user = $(this).serialize();
    console.log("user is: " + user);
    $.ajax({
      url: '/api/login',
      type: "POST",
      data: user
    })
    .done(function(data) {
      if (data.status == 404) {
        var msg = "Email or password not correct";
        errorHandler(msg, 'alert-danger');
      } else {
      console.log("user logged in");
        window.location.href = "/users/" + data._id;
      }
    })
    .fail(function() {
      var msg = "Email or password not correct";
      errorHandler(msg, 'alert-danger');
    });
     
  });

 

  //When the ticket has been completed
  $('.ticketForm').on('submit', function(e) {
    e.preventDefault();
    var ticketId = $(this).attr('data-id');
    console.log("ticket form has been submitted");

    var userId = $('#new-ticket-input').attr('data-id');
    var formData = $('#inputCompleted').serialize();
    var update = $('#inputCompleted').val();
    console.log("comment is: " + formData);
    console.log("ticketId is: " + ticketId);
    $.ajax({
      url: '/api/users/' + userId + '/tickets/' + ticketId,
      type: "PUT",
      data: formData
    })
    .done(function(data) {
      console.log("Ticket has been completed");
  
    });
  });   

  //Button for completed tickets
  $('.tickets').on('click', '.count', function() {
    console.log("count button clicked");
    var ticketRequest = $(this).closest('li');
    var userId = $('#new-ticket-input').attr('data-id');
    console.log("user id is: " + userId);
    var ticketId = ticketRequest.attr('data-id');
    console.log("ticketId is: " + ticketId);
      var num = ticketRequest.find('span.ticket-count').text();
      console.log('num value is: ', num);
      var numInt = parseInt(num, 10);
      numInt++;
      numString = numInt.toString();
      num = ticketRequest.find('span.ticket-count').text(numString);
      
      $.ajax({
        url: '/api/users/' + userId + '/tickets/count/' + ticketId,
        type: "PUT"
      })
      .done(function(data) {   
    });
  
});




