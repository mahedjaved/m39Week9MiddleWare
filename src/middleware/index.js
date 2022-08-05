const bcrypt = require("bcryptjs");
const { User, _ } = require("../user/model");

exports.hashPass = async (req, res, next) => {
	try {
		// take the passwd out of body, hash that password with bCrypt and then put it back in the body --> 3 STEPS
		// step 1) grab the passwd
		const pass = req.body.password;
		// step 2) hash it with bcrypt and pass a SALT, a fuel for the algorithm
		const hashedPass = await bcrypt.hash((s = pass), (salt = 5));
		// step 3) update the password
		req.body.password = hashedPass;

		// tell express that the middleware function has ended, res.end or middleware recieves next function
		next();
	} catch (error) {
		console.log(error);
		res.send({ hash_middleware_error: error });
	}
};

exports.comparePassword = async (req, res, next) => {
	try {
		// compare both user stored password and  once user gives the username
		req.user = await User.findOne({ username: req.body.username });
		// console.log(`Comparing ${req.user.password} and ${req.body.password}`);
		if (
			req.user &&
			(await bcrypt.compare(req.body.password, req.user.password))
		) {
			next();
		} else {
			throw new Error("Incorrect credentials");
		}
	} catch (error) {
		console.log(error);
		res.send({ compare_middleware_error: error.message });
	}
};
