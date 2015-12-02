$(function(){
	
	// compile handlebars template 
	var source = $ ('#tickets-template').html(); 
	var template = Handlebars.compile(source); 

//validations
  $('#signUpForm').validate({
    rules: {
      username: {
            required: true,
            email: true
          },
      password: {
            required: true,
            minlength: 6
          },
      password2: {
            required: true,
            minlength: 6,
            equalTo: '#inputPassword'

          }

      }

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

 

 //When a ticket is submitted
  $('#new-ticket').on('submit', function(event) {
  	e.preventDefault();
    console.log('form submitted');
    var userId = $('#new-ticket-input').attr('data-id');
    console.log("userID is: " + userId);
  	var formData = $('#new-ticket-input').serialize();
    console.log("formData is: " + formData);
    var newTicket = $( '#new-ticket-input').val();
  	console.log("ticket is: " + newTicket);
    $('#new-ticket')[0].reset();
  	$.ajax({
      url: '/api/users/' + userId + '/tickets',
      type: "POST",
      data: formData
    })
    .done(function(ticket) {
      console.log("made a new ticket");
        location.reload();
      });

    });


  // //When delete button is clicked remove ticket
  $('.deleteForm').on('submit', function(event) {
    e.preventDefault();
    var ticketId = $(this).data('id');
    var deleteTicket = $('li[data-id="' + ticketId + '"]');
  	console.log("Delete Button was clicked");
    var userId = $('#new-ticket-input').attr('data-id');
    console.log("userId is: " + userId);
    console.log("ticketId is: " + ticketId);
    $.ajax({
      url: '/api/users/' + userId + '/tickets/' + ticketId,
      type: "DELETE"
    })
    .done(function (data) {
      $('#delete-modal').trigger('click');
      console.log("delete ticket is: ", deleteTicket);
      $(deleteTicket).remove();
      
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
        //update the tickets everytime page refreshes
       
      
    });
  
  });
});








