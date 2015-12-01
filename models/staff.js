var mongoose = require('mongoose'), 
	Schema = mongoose.Schema; 
	passportLocalMongoose = require('passport-local-mongoose'); 

var StaffSchema = new Schema({
	username: String, 
	password: String, 
	department_tickets: [{
		type: Schema.Types.ObjectId, 
		ref: 'Post'
	}]
}); 

StaffSchema.plugin(passportLocalMongoose, {
	populateFields: 'posts'
}); 

var Staff = mongoose.model('Staff', StaffSchema); 

module.exports = Staff; 
