// wait for DOM to load before running JS 
$(function() {

      // base API route
      var baseUrl = '/api/tickets';

      // array to hold ticket data 
      var allTickets = [];

      // element to display list of tickets
      var $ticketsList = $('#tickets-list');

      // form to create new ticket
      var $myTicketForm = $('#myTicketForm');

      // compile handlebars template 
      var source = $('#tickets-template').html();
      var template = Handlebars.compile(source);


      // helper function to render all tickets to view
      var render = function() {
        // empty existing tickets from view
        $ticketsList.empty();

        // pass 'allTickets' into the template function
        var ticketsHtml = template({
          tickets: allTickets
        });

        // append html to the view
        $ticketsList.append(ticketsHtml);
      };

      // // GET all tickets on page load
      $.get(baseUrl, function(data) {
        console.log(data);

        // set 'allTickets' to ticket data from API
        allTickets = data.tickets;

        // render all tickets to view
        render();
      });

      // listen for submit on form 
      $myTicketForm.on('submit', function(event) {
        event.preventDefault();

        // serialize form data
        var newTicket = $(this).serialize();

        // POST request to create new ticket
        $.post(baseUrl, newTicket, function(data) {
          console.log(data);

          // add new ticket to 'allTickets'
          allTickets.push(data);

          // render all tickets to view
          render(); 
        });

        // reset the form 
        $myTicketForm[0].reset();
        $myTicketForm.find('input').first().focus();
        $('#newTicketModal').modal('toggle');
      });

      // add event-handlers to tickets for updating/deleting
      // for update: submit event '.update-ticket' form 
       // $ticketsList.on('submit', '.update-ticket', function(event) {
       //  event.preventDefault();

        // // find the ticket's id (stored in HTML as 'data-id')
        // var ticketId = $(this).closest('.ticket').attr('data-id');

        // find the ticket to update by its id 
        // var tickToUpdate = allTickets.filter(function(ticket) {
        //   return ticket._id === ticketId;
        // })[0];

        // serialize form data 
        // var updatedTicket = $(this).serialize();

        // PUT request to update ticket
      //   $.ajax({
      //     type: 'PUT',
      //     url: baseUrl + '/' + tickedId,
      //     data: updatedTicket,
      //     success: function(data) {
      //       // replace ticket to update with newly updated version (data)
      //       allTickets.splice(allTickets.indexOf(ticketToUpdate), 1, data);

      //       // render all tickets to view
      //       render();
      //     }
      //   });
      // });

      // for delete: click event on '.delete-ticket' button
      // $ticketsList.on('click', '.delete-ticket', function(event) {
      //   event.preventDefault();

      //   // find the ticket's id
      //   var ticketId = $(this).closest('.ticket').attr('data.id');

      //   // find the ticket to delete by its id
      //   var ticketToDelete = allTickets.filter(function(ticket) {
      //     return ticket._id === ticketId;
      //   })[0];


        // DELETE ticket
      //   $.ajax({
      //     type: 'DELETE',
      //     url: baseUrl + '/' + ticketId,
      //     success: function(data) {
      //       // remove deleted ticket from all tickets
      //       allTickets.splice(allTickets.indexOf(ticketToDelete), 1);

      //       // render all tickets to view
      //       render();
      //     }
      //   });
      // });

      //variable to identify if user is logged in
      //check if a user is logged in
      // function checkAuth() {
      //   $user.get('/api/current-user', function (data) {
      //     console.log("data is: " + data);
      //     if (data.user || data.userId) {
      //       console.log("logged in");
      //       $('.not-logged-in').hide();
      //       $('.visitor').hide();
      //       user = true;
      //     } else {
      //       console.log("not logged in");
      //       $('.logged-in').hide();
      //       $('.owner').hide();

      //       user = false;
      //     }
      //   });
      // }

    // Route to Profile Page 
//    $(function () {
//     $("#account").change(function () {
//         location.href = $(this).val();
//     });
// });


      //When sign up form submitted
      // $('#signUpForm').on('submit', function(e) {
      //   e.preventDefault();
      //   if ($('#signUpForm').valid()) {
      //     console.log("form submitted");
      //     var user = $(this).serialize();
      //     console.log(user);
      //     $.ajax({
      //         url: '/api/user',
      //         type: "POST",
      //         data: user
      //     })
      //     .done(function(data) {
      //       if (data.status == 404) {
      //         console.log("err message should activate");
      //         var msg = "Email already in use";
      //         errorHandler(msg, 'alert-danger');
      //       } else {
      //       window.location.href = "/users/" + data._id;
      //       console.log("made a new user");
      //     }
      //     })
      //     .fail(function(err) {
      //       console.log("could not create user");
      //       var msg = "Email already in use";
      //         errorHandler(msg, 'alert-danger');
      //     });
      //  }
      // });

      //when log out button is clicked
      // $('#log-out').on('click', function(e) {
      //   e.preventDefault();
      //   $.ajax({
      //     url: '/api/logout',
      //     type: "GET"

      //   })
      //   .done(function(data) {
      //     console.log(data.msg);
      //     window.location.reload();

      //   });

      // });


      // When user logs in
//       $('#log-in').on('submit', function(event) {
//         e.preventDefault();
//         console.log("login form submitted");
//         var user = $(this).serialize();
//         console.log("user is: " + user);
//         $.ajax({
//           url: '/api/login',
//           type: "POST",
//           data: user
//         })
//         .done(function(data) {
//           if (data.status == 404) {
//             var msg = "Email or password not correct";
//             errorHandler(msg, 'alert-danger');
//           } else {
//           console.log("user logged in");
//             window.location.href = "/users/" + data._id;
//           }
//         })
//         .fail(function() {
//           var msg = "Email or password not correct";
//           errorHandler(msg, 'alert-danger');
//         });

//       });
}); 


