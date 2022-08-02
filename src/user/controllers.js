// here are the CRUD equivalent that is GPPD
const User = require("./model");

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

// ==================================================================================================== //
//  DELETE
// ==================================================================================================== //
// 'D' in CRUD or 'D' patch in GPPD
exports.deleteUser = async (req, res) => {
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

// Week 9 day 2 -- Login request
// Refer to this later
// exports.login = async (req, res) => {
//     try {
//         const user = await User.findOne({
//             username: req.body.username,
//             password: req.body.password,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };
