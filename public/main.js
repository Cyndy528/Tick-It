$(function(){
	
	// compile handlebars template 
	var source = $ ('#tickets-template').html(); 
	var template = Handlebars.compile(source); 

//validations
  $('.login-form').validate({
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





 	// AJAX call to GET all tickets  
	$.get('/api/tickets', function (data) {
		allTickets = data.tickets; 

		var ticketsHtml = template ({ tickets: allTickets});
		$('#tickets-list').append(ticketsHtml); 
	}); 
}); 








