const mealkitDb = require("../models/mealkit-db.js");
const express = require('express');
const router = express.Router();

// routes
router.get("/", (req, res) => {
    res.render("general/index", {
        meals: mealkitDb.getTopMeals()
    });
});

router.get("/on-the-menu", (req, res) => {
    res.render("general/onTheMenu", {
        meals: mealkitDb.getMealsByCategory()
    });
});

module.exports = router;