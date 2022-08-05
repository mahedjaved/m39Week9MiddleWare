// basically from week 7 we make a user login detail based DB model
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	login_status: {
		type: String,
		required: false,
		default: false,
	},
});

// STRETCH CALL
const logginTimerSchema = new mongoose.Schema({
	login_time: {
		type: String,
		required: false,
		default: false,
	},
	logout_time: {
		type: String,
		required: false,
		default: false,
	},
});

const User = mongoose.model("User", userSchema);
const Logger = mongoose.model("Logger", logginTimerSchema);

module.exports = { User, Logger };
