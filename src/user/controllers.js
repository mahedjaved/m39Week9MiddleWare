// here are the CRUD equivalent that is GPPD
const { User, Logger } = require("./model");
const jwt = require("jsonwebtoken");

// ==================================================================================================== //
//  CREATE
// ==================================================================================================== //
// 'C' in CRUD, req and res are short for requestObj, responseObj
exports.createUser = async (req, res) => {
	try {
		// wrap it in model.create function
		const newUser = await User.create(req.body);

		// deal with request, where it came from, what sent it, it has many key/val pai
		console.log(newUser);

		// send an object info in response
		res.send({ msg: "This came from createUser" });
	} catch (error) {
		console.log(error);
		res.send({ err: error });
	}
};

// ==================================================================================================== //
//  READ
// ==================================================================================================== //
// 'R' in CRUD or 'G' GET in GPPD
exports.readUser = async (req, res) => {
	try {
		if (req.body.username) {
			const readUserResult = await User.findOne({
				username: req.body.username,
			});
			console.log(`Are you looking for the result`);
			console.log(readUserResult);
		} else if (req.body.email) {
			const readUserResult = await User.findOne({
				email: req.body.email,
			});
			console.log(`Are you looking for the result`);
			console.log(readUserResult);
		} else if (req.body.password) {
			const readUserResult = await User.findOne({
				password: req.body.password,
			});
			console.log(`Are you looking for the result`);
			console.log(readUserResult);
		} else {
			console.log(`[info] Incorrect JSON argument for reading records`);
		}
		// send an object info in response
		res.send({ msg: "This came from readUser" });
	} catch (error) {
		console.log(error);
		res.send({ err: error });
	}
};

// ==================================================================================================== //
//  UPDATE
// ==================================================================================================== //
// 'U' in CRUD or 'P' patch in GPPD, or put
exports.updateUser = async (req, res) => {
	try {
		if (req.body.username) {
			const updatedUserRes = await User.updateOne(
				{ username: req.body.username },
				{ $set: { username: req.body.new_username } }
			);
			console.log(`The username has been updated to`);
			console.log(
				await User.findOne({
					username: req.body.new_username,
				})
			);
		}
		if (req.body.email) {
			const updatedUserRes = await User.updateOne(
				{ email: req.body.email },
				{ $set: { email: req.body.new_email } }
			);
			console.log(`The email has been updated in the record`);
			console.log(
				await User.findOne({
					email: req.body.new_email,
				})
			);
		}
		if (req.body.password) {
			const updatedUserRes = await User.updateOne(
				{ password: req.body.password },
				{ $set: { password: req.body.new_password } }
			);
			console.log(`The password has been updated in the record`);
			console.log(
				await User.findOne({
					password: req.body.new_password,
				})
			);
		} else {
			console.log(`[info] Incorrect JSON argument for updating records`);
		}
		// send an object info in response
		res.send({ msg: "This came from updateUser" });
	} catch (error) {
		console.log(error);
		res.send({ err: error });
	}
};

updateLogger = async (updateLogin) => {
	try {
		let [login_time, logout_time] = (await Logger.find({})).map((item) => {
			return item;
		});

		const currentdate = new Date();
		const current_time =
			"Last Sync: " +
			currentdate.getDate() +
			"/" +
			(currentdate.getMonth() + 1) +
			"/" +
			currentdate.getFullYear() +
			" @ " +
			currentdate.getHours() +
			":" +
			currentdate.getMinutes() +
			":" +
			currentdate.getSeconds();

		// condition to decide to update either the login_time or logout_time to current time
		let new_login_time;
		let new_logout_time;

		if (updateLogin) {
			new_login_time = current_time;
			new_logout_time = "n.a";
			console.log(`[info] LogIn time: ${new_login_time}`);
		} else {
			new_login_time = "n.a";
			new_logout_time = current_time;
			console.log(`[info] LogOut time: ${new_logout_time}`);
		}

		// update logger records
		await Logger.updateOne(
			{ login_time: login_time },
			{ $set: { login_time: new_login_time } }
		);

		await Logger.updateOne(
			{ logout_time: logout_time },
			{ $set: { logout_time: new_logout_time } }
		);
	} catch (error) {
		console.log(error);
	}
};

// ==================================================================================================== //
//  DELETE
// ==================================================================================================== //
// 'D' in CRUD or 'D' patch in GPPD
exports.deleteAccount = async (req, res) => {
	try {
		const result = await User.findOne({ username: req.body.username });
		if (result) {
			console.log(
				`The following user will be deleted : ${result.username}`
			);
			await User.deleteOne({ username: result.username });
			res.send({ msg: "[info] Account deleted successfully" });
		} else {
			res.send({ msg: "[info] Incorrect user entry not found" });
		}
	} catch (error) {
		console.log(error);
		res.send({ msg: `The username ${result.username} was deleted` });
	}
};

// ==================================================================================================== //
//  DELETE SINGLE ELEMENT [OPTIONAL]
// ==================================================================================================== //
exports.deleteOneField = async (req, res) => {
	try {
		if (req.body.username) {
			console.log(
				`The following username has been deleted from the record`
			);
			console.log(
				await User.findOne({
					username: req.body.username,
				})
			);
			const deleteUserRes = await User.updateOne(
				{ username: req.body.username },
				{ $unset: { username: "" } }
			);
		} else if (req.body.email) {
			console.log(`The following email has been deleted from the record`);
			console.log(
				await User.findOne({
					email: req.body.email,
				})
			);
			const deleteUserRes = await User.updateOne(
				{ email: req.body.email },
				{ $unset: { email: "" } }
			);
		} else if (req.body.password) {
			console.log(
				`The following password has been deleted from the record`
			);
			console.log(
				await User.findOne({
					password: req.body.password,
				})
			);
			const deleteUserRes = await User.updateOne(
				{ password: req.body.password },
				{ $unset: { password: "" } }
			);
		} else {
			console.log(`[info] Incorrect JSON argument for deleting records`);
		}
		// send an object info in response
		res.send({ msg: "This came from deleteUser" });
	} catch (error) {
		console.log(error);
		res.send({ err: error });
	}
};

// ==================================================================================================== //
//  GET ALL OF THE USERS
// ==================================================================================================== //

exports.getAllUsers = async (req, res) => {
	try {
		const result = (await User.find({})).map((item) => {
			return item.username;
		});
		res.send({ username_collection: result });
	} catch (error) {
		console.log(error);
		res.send({ error_msg: error });
	}
};

// ==================================================================================================== //
//  LOGIN RESPONSE
// ==================================================================================================== //
exports.login = async (req, res) => {
	try {
		if (req.user) {
			console.log("[info] Login Successfull, check response for token");
			const token = await jwt.sign(
				{ _id: req.user._id },
				process.env.SECRET_KEY
			);
			// note time and set flag to true
			req.user.login_status = true;
			console.log(`[info] Your login stats: ${req.user.login_status}`);

			// update logger
			updateLogger((updateLogin = true));

			// send the token
			res.send({
				msg: `Login Successful, your login token is : ${token}`,
			});
		} else {
			console.log("[info] Login credentials incorrect");
		}
	} catch (error) {
		res.send({ error: `login not successful, printing error ${error}` });
	}
};

// ==================================================================================================== //
//  LOGOUT RESPONSE
// ==================================================================================================== //

exports.logout = async (req, res) => {
	try {
		// console.log(`Your token is ${req.user._id}`);
		// now compare input token to
		// stretch pass it as header
		req.user = await User.findOne({ username: req.body.username });

		// check if user exists
		if (req.user) {
			// update login status
			req.user.login_status = false;
			console.log(`[info] Your login stats: ${req.user.login_status}`);

			// update logger times
			updateLogger((updateLogin = false));

			// send the respons
			res.send({ msg: "Log Out Successfull !" });
		} else {
			console.log(`[info] Invalid user logout operation`);
			res.send({ log_out_error_msg: error });
		}
	} catch (error) {
		res.send({ log_out_error_msg: error });
	}
};
