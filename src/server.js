// run the connection file as soon as the app starts
require("./db/connection");

const express = require("express");
const userRouter = require("./user/routes");

// create the web server
const app = express();

// ================================================================ //
// CRUDS and GPPDs must be performed before listening. inc. app.use
// ================================================================ //

// this command means the server will automatically parse JSON, both input and output
app.use(express.json());
app.use(userRouter);

// ================================================================ //
// Listening to the API
// ================================================================ //
// make the server listen to a port
app.listen(5001, () => {
	console.log("[Info] Listeninng on port 5001");
});
