const bcrypt = require("bcryptjs");

exports.hashPass = async (req, res, next) => {
    try {
        // take the passwd out of body, hash that password with bCrypt and then put it back in the body --> 3 STEPS
        // step 1) grab the passwd
        const pass = req.body.password;
        // step 2) hash it with bcrypt and pass a SALT, a fuel for the algorithm
        const hashedPass = await bcrypt.hash((s = pass), (salt = 5));
        // step 3) update the req
        req.body.password = hashedPass;

        // tell in express that the function has ended, res.end or middleware recieves next function
        next();
    } catch (error) {
        console.log(error);
        res.send({ err: error });
    }
};
