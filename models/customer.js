var mongoose = require('mongoose'), 
	Schema = mongoose.Schema; 
	passportLocalMongoose = require('passport-local-mongoose'); 

var CustomerSchema = new Schema({
	username: String, 
	password: String, 
	tickets: [{
		type: Schema.Types.ObjectId, 
		ref: 'Post'
	}]
}); 

CustomerSchema.plugin(passportLocalMongoose, {
	populateFields: 'posts'
}); 

var Customer = mongoose.model('Customer', CustomerSchema); 
module.exports = Customer; 