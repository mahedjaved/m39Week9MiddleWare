// bring everything together in routes file, deconstructor to bring out SPECIFIC methods from library
const { Router } = require("express");
const { hashPass } = require("../middleware/");
// create a new router
const userRouter = Router();

// pull in the create user controller
const {
    createUser,
    readUser,
    updateUser,
    deleteUser,
} = require("./controllers");

// now we set our HTTP verbs, we are using 'C' equivalent which is 'P'
// you dont need to use createUser() because userRouter.post is running it, the /user is the ENDPOINT

// add hash to 'C'
userRouter.post("/user", hashPass, createUser);
userRouter.get("/user", readUser);
userRouter.patch("/user", updateUser);
userRouter.delete("/user", deleteUser);

module.exports = userRouter;
