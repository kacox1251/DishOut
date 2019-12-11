var apiKey = "9973533";

    //initial cocktail name search
$("#searchRecipes").on("click", function() {
    $("#drinkDisplay").empty();

        //creating search term
    var searchValues = $("#ingredientInput").val().trim()
    var ingredientArray = _.split(searchValues, ", ")
    var searchTerm = _.replace(ingredientArray, " ", "_");

        //ingredient search call
    var ingredientQueryURL = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/filter.php?i=${searchTerm}`;
    $.ajax({
        url: ingredientQueryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response);

            //randomizing search results and adding a limit
        var resultsRandom = _.shuffle(response.drinks);
        var resultsLimit = _.slice(resultsRandom, [start=0], [end=10]);
        // console.log(resultsLimit);
        // console.log(response);

            //an if statement to show there is no results
        if (response.drinks === "None Found") {
            $("#modal1").css("display", "block");
            $(".modal-close").on("click", function() {
                $("#modal1").css("display", "none");
            });
        }

            //when there is results, display them
        else {
            for (var i = 0; i < resultsLimit.length; i++) {
                    //creates container to hold all recipe info
                var drinkCard = $("<div>");
                drinkCard.addClass("card card-resize");
                drinkCard.addClass("card-panel hoverable");
                drinkCard.attr("data-drink-id", resultsLimit[i].idDrink);
                
                    //creates an image container and an image for the drink thumbnails
                var drinkThumbDiv = $("<div>");
                drinkThumbDiv.addClass("card-image waves-effect waves-block waves-light")
                var drinkThumb = $("<img>");
                drinkThumb.addClass("activator");
                drinkThumb.attr("src", resultsLimit[i].strDrinkThumb);
                drinkThumbDiv.append(drinkThumb);
                
                    //creates title element for recipe element and sets title to drink name
                var drinkNameDiv = $("<div>");
                drinkNameDiv.addClass("card-content");
                var drinkName = $("<span>");
                drinkName.addClass("card-title activator grey-text text-darken-4");
                drinkName.text(resultsLimit[i].strDrink);                
                var recipeButton = $("<i>");
                recipeButton.addClass("material-icons right");
                recipeButton.text("more_vert");
                drinkName.append(recipeButton);
                drinkNameDiv.append(drinkName);
                
                    //creates the reveal element for the recipe info
                var recipeReveal = $("<div>");
                recipeReveal.addClass("card-reveal");
                var recipeInfo = $("<span>");
                recipeInfo.addClass("card-title activator grey-text text-darken-4");
                recipeInfo.text(resultsLimit[i].strDrink)
                var closeRecipe = $("<i>");
                closeRecipe.addClass("material-icons right");
                closeRecipe.text("close");
                var recipeDetails = $("<div>");
                recipeDetails.addClass("recipe-details");
                recipeDetails.attr("id", resultsLimit[i].idDrink);
                recipeInfo.append(closeRecipe);
                recipeReveal.append(recipeInfo);
                recipeReveal.append(recipeDetails);

                    //adds 3 main elements to the whole recipe container
                drinkCard.append(drinkThumbDiv);
                drinkCard.append(drinkNameDiv);
                drinkCard.append(recipeReveal);
                $("#drinkDisplay").append(drinkCard);
            }

                //a second call is made for the recipe info when the thumbnail or more info icon are clicked
            $(".card").on("click", function() {
                $(".recipe-details").empty();

                    //creates url for the recipe info uding the drink ID attached to each individual element
                var drinkId = $(this).attr("data-drink-id");
                var nameQueryURL = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/lookup.php?i=${drinkId}`;
                // console.log(nameQueryURL);
                
                    //make the call for recipe info
                $.ajax({
                    url: nameQueryURL,
                    method: "GET"
                }).then(function(response){
                    console.log(response);

                    var ingredientCount = 0;
                    var measureCount = 0;
                    
                        //creates element for all the recipe info
                    var recipeDetailsContainer = $("#" + drinkId)
                    
                        //creates an element that says whether or not drink is alcoholic
                    var abv = $("<p>");
                    abv.text(response.drinks[0].strAlcoholic);
                    recipeDetailsContainer.append(abv);
                    abv.addClass("abv");
                    console.log(response.drinks[0].strAlcoholic);

                        //creates the measurements element
                    var measurementDiv = $("<div>");
                    measurementDiv.addClass("recipe-measurements")
                    recipeDetailsContainer.append(measurementDiv);

                        //creates the ingredients element
                    var ingredientDiv = $("<div>");
                    ingredientDiv.addClass("recipe-ingredients")
                    recipeDetailsContainer.append(ingredientDiv);
                    
                        //creates and calls the list of measurements
                    for (var i = 1; i < 16; i++) {
                        var objKeyMeasure = `strMeasure${i}`;
                        
                        if (response.drinks[0][objKeyMeasure]) {
                            measureCount++;
                            console.log(response.drinks[0][objKeyMeasure]);
                            var recipeMeasureDisplay = $("<p>");
                            recipeMeasureDisplay.text(response.drinks[0][objKeyMeasure]);
                            measurementDiv.append(recipeMeasureDisplay);
                        }
                    }

                        //creates and calls the list of ingredients
                    for (var i = 1; i < 16; i++) {
                        var objKeyIngredient = `strIngredient${i}`;
                        
                        if (response.drinks[0][objKeyIngredient]) {
                            ingredientCount++;
                            console.log(response.drinks[0][objKeyIngredient]);
                            var recipeIngredientDisplay = $("<p>");
                            recipeIngredientDisplay.text(response.drinks[0][objKeyIngredient]);
                            ingredientDiv.append(recipeIngredientDisplay);
                        }
                    }

                        //creates element for the instructions, adds instructions inside
                    var recipeInstructions = $("<p>");
                    recipeInstructions.addClass("drinkRecipeInstructions");
                    recipeInstructions.text(response.drinks[0].strInstructions);
                    recipeDetailsContainer.append(recipeInstructions);
                    console.log(ingredientCount);
                    console.log(measureCount);
                });
            });
        }
    });
});