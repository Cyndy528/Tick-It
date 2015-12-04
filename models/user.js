var mongoose = require('mongoose'), 
	Schema = mongoose.Schema; 
	passportLocalMongoose = require('passport-local-mongoose'); 

var TicketSchema = new Schema ({
	completed: {type: Boolean, required: true},
    department: { type: String, required: true},	
	description: { type: String, default: 0},
	createdAt: { type: Date, default: Date.now },
	comment: { type: String, default: "" } 
});


var UserSchema = new Schema({
	username: { type: String, required: true}, 
	password: { type: String, required: true}, 
    department: { type: String, required: true}, 
    description: { type: String, default: 0},
	tickets: [TicketSchema]

});


UserSchema.plugin(passportLocalMongoose, {
	populateFields: 'tickets', 
	
}); 

var User = mongoose.model('User', UserSchema); 
module.exports = User; 


