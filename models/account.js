const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

// account scheme
const accountScheme = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

accountScheme.pre("save", function(next) {
    let account = this;

    bcrypt.genSalt(10)
    .then(salt => {
        bcrypt.hash(account.password, salt)
        .then(hashedPass => {
            account.password = hashedPass;
            next();
        })
        .catch(err => {
            console.log(`There is a problem hashing the password: ${err}`);
        });
    })
    .catch(err => {
        console.log(`There is a problem hashing the password: ${err}`);
    });
})

const accountModel = mongoose.model("accounts", accountScheme);

module.exports = accountModel;