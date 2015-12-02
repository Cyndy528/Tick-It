var mongoose = require('mongoose'), 
	Schema = mongoose.Schema; 

var TicketSchema = new Schema({
	completed: {type: Boolean, required: true},
    department: { type: String, required: true}, 
    description: { type: String, default: 0},
    createdAt: { type: Date, default: Date.now }
    
});
 

var Ticket = mongoose.model('Ticket', TicketSchema); 
module.exports = Ticket; 

