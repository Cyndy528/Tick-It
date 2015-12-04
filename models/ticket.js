var mongoose = require('mongoose'), 
	Schema = mongoose.Schema; 

var TicketSchema = new Schema({
    department: String,  
    description: String, 
    Date: Date, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}] 
});
 

var Ticket = mongoose.model('Ticket', TicketSchema); 
module.exports = Ticket; 

