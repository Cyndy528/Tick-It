$(function(){
	
	// compile handlebars template 
	var source = $ ('#tickets-template').html(); 
	var template = Handlebars.compile(source); 


	// array of test data
	var allTickets = [
		{ ticket: 'Need help', message: 'Computer equipment is broken'}, 
		{ ticket: 'Visitors Coming', message: 'Offices needed for guests'}
	]; 

	var ticketsHtml = template ({
		tickets: allTickets
	});
	$('#tickets-list').append(ticketsHtml); 
}); 
