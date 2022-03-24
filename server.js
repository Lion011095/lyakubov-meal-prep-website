/************************************************************************************
* WEB322 â€“ Project (Winter 2022)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Lion Yakubov
* Student ID: 129517207
* Course/Section: WEB322/NDD
*
************************************************************************************/

const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const session = require("express-session");

// Dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env"});

// Express
const app = express();

// Handlebars
app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs',
    defaultLayout: "main"
}));
app.set('view engine', '.hbs');

// express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.account = req.session.account;
    req.session.isCustomer;
    req.session.isClerk;
    next();
})

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Mongoose Connection
mongoose.connect(process.env.MONGODB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB database successfully.");
})
.catch((err) =>{
    console.log(`There was a problem connecting to the database ${err}`);
});

// Setup a static resource folder.
app.use(express.static("public"));

// Controllers
const generalController = require("./controllers/general");
app.use("/", generalController);

const accountController = require("./controllers/account");
app.use("/", accountController);

// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);