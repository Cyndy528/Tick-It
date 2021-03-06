var mongoose = require('mongoose'), 
	Schema = mongoose.Schema; 
	passportLocalMongoose = require('passport-local-mongoose'); 

var UserSchema = new Schema({
	oauthID: Number, 
	username: String, 
	password: String, 
	tickets: [{
    	type: Schema.Types.ObjectId,
    	ref: 'Ticket'
	}]

});


UserSchema.plugin(passportLocalMongoose, {
	populateFields: 'tickets', 
	
}); 

var User = mongoose.model('User', UserSchema); 
module.exports = User; 


