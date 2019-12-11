var apiKey = "9973533";

var randomDrinkURL = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/random.php`;
var randomFoodURL = `https://www.themealdb.com/api/json/v2/${apiKey}/random.php`;


$("#randomizer").on("click", function() {
    $.ajax({
        url: randomDrinkURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#randomDrink").empty();

        var drinkCard = $("<div>");
        drinkCard.addClass("card card-resize");
        drinkCard.attr("data-drink-id", );
        
        var drinkThumbDiv = $("<div>");
        drinkThumbDiv.addClass("card-image waves-effect waves-block waves-light")
        var drinkThumb = $("<img>");
        drinkThumb.addClass("activator");
        drinkThumb.attr("src", response.drinks[0].strDrinkThumb);
        drinkThumbDiv.append(drinkThumb);
        
        var drinkNameDiv = $("<div>");
        drinkNameDiv.addClass("card-content");
        var drinkName = $("<span>");
        drinkName.addClass("card-title activator grey-text text-darken-4");
        drinkName.text(response.drinks[0].strDrink);                
        var recipeButton = $("<i>");
        recipeButton.addClass("material-icons right");
        recipeButton.text("more_vert");
        drinkName.append(recipeButton);
        drinkNameDiv.append(drinkName);
        
        var recipeReveal = $("<div>");
        recipeReveal.addClass("card-reveal");
        var recipeInfo = $("<span>");
        recipeInfo.addClass("card-title activator grey-text text-darken-4");
        recipeInfo.text(response.drinks[0].strDrink)
        var closeRecipe = $("<i>");
        closeRecipe.addClass("material-icons right");
        closeRecipe.text("close");
        var recipeDetails = $("<div>");
        recipeDetails.addClass("recipe-details");
        recipeDetails.attr("id", response.drinks[0].idDrink);
        recipeInfo.append(closeRecipe);
        recipeReveal.append(recipeInfo);
        recipeReveal.append(recipeDetails);

        drinkCard.append(drinkThumbDiv);
        drinkCard.append(drinkNameDiv);
        drinkCard.append(recipeReveal);
        $("#randomDrink").append(drinkCard);
                    
        var abv = $("<p>");
        abv.text(response.drinks[0].strAlcoholic);
        recipeReveal.append(abv);
        abv.addClass("abv");

        var measurementDiv = $("<div>");
        measurementDiv.addClass("recipe-measurements")
        recipeReveal.append(measurementDiv);

        var ingredientDiv = $("<div>");
        ingredientDiv.addClass("recipe-ingredients")
        recipeReveal.append(ingredientDiv);
        
        for (var i = 1; i < 16; i++) {
            var objKeyMeasure = `strMeasure${i}`;
            
            if (response.drinks[0][objKeyMeasure]) {
                // console.log(response.drinks[0][objKeyMeasure]);
                var recipeMeasureDisplay = $("<p>");
                recipeMeasureDisplay.text(response.drinks[0][objKeyMeasure]);
                measurementDiv.append(recipeMeasureDisplay);
            }
        }

        for (var i = 1; i < 16; i++) {
            var objKeyIngredient = `strIngredient${i}`;
            
            if (response.drinks[0][objKeyIngredient]) {
                // console.log(response.drinks[0][objKeyIngredient]);
                var recipeIngredientDisplay = $("<p>");
                recipeIngredientDisplay.text(response.drinks[0][objKeyIngredient]);
                ingredientDiv.append(recipeIngredientDisplay);
            }
        }

        var recipeInstructions = $("<p>");
        recipeInstructions.text(response.drinks[0].strInstructions);
        recipeReveal.append(recipeInstructions);
    });


    $.ajax({
        url: randomFoodURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#randomFood").empty();

        var foodCard = $("<div>");
        foodCard.addClass("card card-resize");
        foodCard.attr("data-drink-id", );
        
        var foodThumbDiv = $("<div>");
        foodThumbDiv.addClass("card-image waves-effect waves-block waves-light")
        var foodThumb = $("<img>");
        foodThumb.addClass("activator");
        foodThumb.attr("src", response.meals[0].strMealThumb);
        foodThumbDiv.append(foodThumb);
        
        var foodNameDiv = $("<div>");
        foodNameDiv.addClass("card-content");
        var foodName = $("<span>");
        foodName.addClass("card-title activator grey-text text-darken-4");
        foodName.text(response.meals[0].strMeal);                
        var foodRecipeButton = $("<i>");
        foodRecipeButton.addClass("material-icons right");
        foodRecipeButton.text("more_vert");
        foodName.append(foodRecipeButton);
        foodNameDiv.append(foodName);
        
        var foodRecipeReveal = $("<div>");
        foodRecipeReveal.addClass("card-reveal");
        var foodRecipeInfo = $("<span>");
        foodRecipeInfo.addClass("card-title activator grey-text text-darken-4");
        foodRecipeInfo.text(response.meals[0].strMeal)
        var closeFoodRecipe = $("<i>");
        closeFoodRecipe.addClass("material-icons right");
        closeFoodRecipe.text("close");
        var foodRecipeDetails = $("<div>");
        foodRecipeDetails.addClass("recipe-details");
        foodRecipeDetails.attr("id", response.meals[0].idMeal);
        foodRecipeInfo.append(closeFoodRecipe);
        foodRecipeReveal.append(foodRecipeInfo);
        foodRecipeReveal.append(foodRecipeDetails);

        foodCard.append(foodThumbDiv);
        foodCard.append(foodNameDiv);
        foodCard.append(foodRecipeReveal);
        $("#randomFood").append(foodCard);

        var foodMeasurementDiv = $("<div>");
        foodMeasurementDiv.addClass("recipe-measurements")
        foodRecipeReveal.append(foodMeasurementDiv);

        var foodIngredientReveal = $("<div>");
        foodIngredientReveal.addClass("recipe-ingredients")
        foodRecipeReveal.append(foodIngredientReveal);
        
        for (var i = 1; i < 21; i++) {
            var objKeyMeasure = `strMeasure${i}`;
            
            if (response.meals[0][objKeyMeasure]) {
                // console.log(response.meals[0][objKeyMeasure]);
                var recipeMeasureDisplay = $("<p>");
                recipeMeasureDisplay.text(response.meals[0][objKeyMeasure]);
                foodMeasurementDiv.append(recipeMeasureDisplay);
            }
        }

        for (var i = 1; i < 21; i++) {
            var objKeyIngredient = `strIngredient${i}`;
            
            if (response.meals[0][objKeyIngredient]) {
                // console.log(response.meals[0][objKeyIngredient]);
                var recipeIngredientDisplay = $("<p>");
                recipeIngredientDisplay.text(response.meals[0][objKeyIngredient]);
                foodIngredientReveal.append(recipeIngredientDisplay);
            }
        }

        var recipeInstructions = $("<p>");
        recipeInstructions.text(response.meals[0].strInstructions);
        foodRecipeReveal.append(recipeInstructions);
    });
});