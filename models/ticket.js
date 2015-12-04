var mongoose = require('mongoose'), 
	Schema = mongoose.Schema; 

var TicketSchema = new Schema({
    fullName: String,
    department: String,   
    description: String, 
    dateNeeded: String 
  
});
 

var Ticket = mongoose.model('Ticket', TicketSchema); 
module.exports = Ticket; 

