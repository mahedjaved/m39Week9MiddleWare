// bring everything together in routes file, deconstructor to bring out SPECIFIC methods from library
const { Router } = require("express");
const { hashPass, comparePassword } = require("../middleware/");
// create a new router
const userRouter = Router();

// pull in the create user controller
const {
	createUser,
	readUser,
	updateUser,
	deleteOneField,
	login,
	getAllUsers,
	deleteAccount,
	logout,
} = require("./controllers");

// now we set our HTTP verbs, we are using 'C' equivalent which is 'P'
// you dont need to use createUser() because userRouter.post is running it, the /user is the ENDPOINT

// get all the users with this response
userRouter.get("/allusers", getAllUsers);

// CRUD equivalent operations for http request and response
userRouter.post("/user", hashPass, createUser);
userRouter.get("/user", readUser);
userRouter.patch("/user", updateUser);
userRouter.delete("/user", deleteAccount);

// login and logout operations
userRouter.get("/login", comparePassword, login);
userRouter.get("/logout", logout);

// optional method for deleting individual fields
userRouter.delete("/deleteSingle", deleteOneField);

module.exports = userRouter;
