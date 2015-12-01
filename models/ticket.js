var mongoose = require('mongoose'), 
	Schema = mongoose.Schema; 

var TicketSchema = new Schema({
	ticket: String, 
	message: String 
}); 

var Ticket = mongoose.model('Ticket', TicketSchema); 
module.exports = Ticket; 

