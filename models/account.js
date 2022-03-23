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

const accountModel = mongoose.model("accounts", accountScheme);

module.exports = accountModel;