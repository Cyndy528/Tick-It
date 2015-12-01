$(function(){
	
	// compile handlebars template 
	var source = $ ('#tickets-template').html(); 
	var template = Handlebars.compile(source); 


 	// AJAX call to GET all tickets  
	$.get('/api/tickets', function (data) {
		allTickets = data.tickets; 

		var ticketsHtml = template ({ tickets: allTickets});
		$('#tickets-list').append(ticketsHtml); 
	}); 
}); 
