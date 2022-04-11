const mealkitDb = require("../models/mealkit-db.js");
const express = require('express');
const mealKitModel = require("../models/mealkit-db.js");
const router = express.Router();

router.get("/load-data/meal-kits", (req,res) => {
    if(req.session.isClerk)
    {
        mealKitModel.find().count({}, (err, count) =>
        {
            let isClerk = true;
            if(err)
            {
                res.render("data/dataStatus",  {
                    isClerk,
                    error: err
                });
            }
            else if(count === 0)
            {
                const allMealKits = mealkitDb.getAllMealKits();
                mealKitModel.collection.insertMany(allMealKits, (err, docs) => {
                    if(err)
                    {
                        res.render("data/dataStatus",  {
                            isClerk,
                            error: err
                        });
                    }
                    else
                    {
                        res.render("data/dataStatus", {
                            isClerk,
                            success: true
                        })
                    }
                })
            }
            else
            {
                res.render("data/dataStatus", {
                    isClerk,
                    loaded: true
                })
            }
        })
    }
    else
    {
        res.render("data/dataStatus");
    }
})

module.exports = router;