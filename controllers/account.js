const express = require('express');
const accountModel = require('../models/account');
const router = express.Router();


// routes
router.get("/register", (req, res) => {
    res.render("account/registration");
});

router.get("/login", (req, res) => {
    res.render("account/login");
});

router.get("/welcome", (req, res) => {
    res.render("account/welcome");
});

// post routes
router.post("/register", (req, res) => {
    const { firstName, lastName, email, password} = req.body;

    let valid = true;
    let errorMessages = {};
    let passwordError = [];
    // regex taken from https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript "+.[a-zA-Z]" at the end I added.
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+.[a-zA-Z]*$/;
    // regex taken from https://stackoverflow.com/questions/18812317/javascript-regex-for-special-characters
    let symbolRegex = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;

    if(typeof firstName !== 'string' || firstName.trim().length <= 2)
    {
        valid= false;
        errorMessages.firstName = "You must enter a first name longer then 2 characters.";
    }

    if(typeof lastName !== 'string' || lastName.trim().length <= 2)
    {
        valid = false;
        errorMessages.lastName = "You must enter a last name longer then 2 characters.";
    }

    if(typeof email !== 'string' || email.match(emailRegex) === null)
    {
        valid = false;
        errorMessages.email = "Invalid email address.";
    }

    if(typeof password !== 'string' || password.trim().length < 8 || password.trim().length > 12)
    {

        valid = false;
        passwordError.push("You must enter a password between 8-12 characters.");
    }

    if(typeof password !== 'string' || password.search(/[a-z]/) == -1)
    {
        valid = false;
        passwordError.push("You must enter at least one lower case letter.");
    }

    if(typeof password !== 'string' || password.search(/[A-Z]/) == -1)
    {
        valid = false;
        passwordError.push("You must enter at least one upper case letter.");
    }

    if(typeof password !== 'string' || password.search(/[0-9]/) == -1)
    {
        valid = false;
        passwordError.push("You must enter at least one number.");
    }

    if(typeof password !== 'string' || password.search(symbolRegex) == -1)
    {
        valid = false;
        passwordError.push("You must enter at least one symbol letter.");
    }

    if(valid)
    {
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

        const account = new accountModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });

        const msg = {
            to: `${email}`,
            from: "lyakubov@myseneca.ca",
            subject: "Welcome to CookZilla",
            html: 
                `Welcome ${firstName} ${lastName}.<br><br>
                Thanks for signing up to our website "CookZilla".<br>
                If there is any problems you could reach us at "lyakubov@myseneca.ca". <br><br>
                Best regards,<br>
                Lion Yakubov`
        };

        account.save()
        .then((accountSaved) => {
            console.log(`Account ${accountSaved.firstName} has been added to the database.`);
            sgMail.send(msg)
            .then(() => {
                res.render("account/welcome", {
                details: req.body
                }); 
            })
            .catch(err => {
                res.render("account/registration", {
                    details: req.body,
                    errorMessages,
                    passwordError,
                    err
                });
            })
        })
        .catch((err) => {
            console.log(`Couldn't add account to the database: ${err}`);
            res.render("account/registration", {
                details: req.body,
                errorMessages,
                passwordError
            });
        });

        
    }
    else
    {
        res.render("account/registration", {
            details: req.body,
            errorMessages,
            passwordError
        });
    }

});

router.post("/login", (req, res) => {
    console.log(req.body);
    
    const {email, password} = req.body;
    let errorMessages = {};
    let valid = true;

    if(typeof email !== 'string' || email.trim().length === 0)
    {
        valid = false;
        errorMessages.email = "You must enter your email address.";
    }

    if(typeof password !== 'string' || password.trim().length === 0)
    {
        valid = false;
        errorMessages.password = "You must enter your password.";
    }

    if(valid)
    {
        res.send("User dash") // need to implement user dash
    }
    else
    {
        res.render("account/login", {
            errorMessages
        });
    }
});

module.exports = router;