/* Name: Lion Yakubov
     Student ID: lyakubov
     Student #129517207 */

const mongoose = require("mongoose");

const mealKitScheme = new mongoose.Scheme({
     title: {
          type: String,
          unique: true
     },
     includes: {
          type: String
     },
     description: {
          type: String
     },
     category: {
          type: String
     },
     price: {
          type: Number
     },
     cookingTime: {
          type: Number
     },
     servings: {
          type: Number
     },
     caloriesPerServing: {
          type: Number
     },
     imageUrl: {
          type: String
     },
     topMeal: {
          type: Boolean
     } 
});

const mealKitModel = mongoose.model("mealKits", mealKitScheme);
module.exports = mealKitModel;

const mealKitArr = [
     {
          title: "schnitzel with fries",
          includes: "1 chicken breast, 2 potatoes, bread crumbs and fresh vegetables.",
          description: "Crispy fried chicken with hot fries.",
          category: "Meat meals",
          price: 14.99,
          cookingTime: 30,
          servings: 1,
          caloriesPerServing: 300,
          imageUrl: "images/schnitzel.jpg",
          topMeal: true 
     },
     {
          title: "Steak & mashed potatoes",
          includes: "1 steak, 2 potatoes, pack of green beans and fresh herbs.",
          description: "Juicy steak with amazing mashed potatoes.",
          category: "Meat meals",
          price: 24.99,
          cookingTime: 30,
          servings: 1,
          caloriesPerServing: 350,
          imageUrl: "images/steak.jpg",
          topMeal: true 
     },
     {
          title: "Fish & chips",
          includes: "1 cod fish, 2 potatoes.",
          description: "Hot crispy fish with a side of fries.",
          category: "Fish meals",
          price: 10.99,
          cookingTime: 20,
          servings: 1,
          caloriesPerServing: 200,
          imageUrl: "images/fish.jpg",
          topMeal: true 
     },
     {
          title: "Shashlik",
          includes: "1 pack of lamb, onions, red pepper, sauce for marinating and a pack of skewers.",
          description: "Skewers with lamb roasted peppers and onions (grill needed).",
          category: "Meat meals",
          price: 19.99,
          cookingTime: 20,
          servings: 3,
          caloriesPerServing: 150,
          imageUrl: "images/fish.jpg", // need a photo for shashlik.
          topMeal: false 
     },
     {
          title: "Shepard pie",
          includes: "1 pack ground beef, 4 potatoes.",
          description: "A layered pie bottom layer beef top layer mashed potatoes. DELICIOUS.",
          category: "Meat meals",
          price: 14.99,
          cookingTime: 35,
          servings: 4,
          caloriesPerServing: 150,
          imageUrl: "images/fish.jpg", // need a photo pf a shepard pie.
          topMeal: false 
     },
     {
          title: "Beer buttered fish tacos",
          includes: "1 cod fish, cabbage mix, avocado, pickled onions and 3 tacos.",
          description: "Perfect bear buttered fish tacos.",
          category: "Fish meals",
          price: 13.99,
          cookingTime: 30,
          servings: 3,
          caloriesPerServing: 100,
          imageUrl: "images/fish.jpg", // need photo for taco.
          topMeal: false 
     }
];

module.exports.getTopMeals = function()
{
     let topMeals = [];
     mealKitArr.forEach(meal => {
          if(meal.topMeal === true)
          {
               topMeals.push(meal);
          }
     });
     return topMeals;
}

module.exports.getMealsByCategory = function()
{
     var mealsByCategory = [];
     var add = false;
     var added = false;
     var j = 0;

     for(var i = 0; i < mealKitArr.length; i++)
     {  
          for(j = 0; j < mealsByCategory.length && added === false && add === false|| mealsByCategory.length === 0; j++)
          {
               if(mealsByCategory[j] === undefined)
               {
                    mealsByCategory[mealsByCategory.length] = {};
                    add = true;
               }
               else if(mealsByCategory[j].categoryName === mealKitArr[i].category)
               {
                    added = true;
                    mealsByCategory[j].mealKits.push(mealKitArr[i]);
               }
               else if(mealsByCategory[j].categoryName !== mealKitArr[i].category && j === mealsByCategory.length - 1)
               {
                    mealsByCategory[mealsByCategory.length] = {};
                    add = true;
               }
          }
          if(add === true)
          {
               mealsByCategory[mealsByCategory.length-1].categoryName = mealKitArr[i].category;
               mealsByCategory[mealsByCategory.length-1].mealKits = [];
               mealsByCategory[mealsByCategory.length-1].mealKits.push(mealKitArr[i]);
               add = false;
          }
          added = false;
     }
     return mealsByCategory;
}