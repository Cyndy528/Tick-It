var mongoose = require('mongoose'), 
	Schema = mongoose.Schema; 

var TicketSchema = new Schema({
	
    department: String,  
    description: String, 
    Date: Number
});
 

var Ticket = mongoose.model('Ticket', TicketSchema); 
module.exports = Ticket; 

