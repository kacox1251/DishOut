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
        var resultsRandom = _.shuffle(response.drinks);
        var resultsLimit = _.slice(resultsRandom, [start=0], [end=10]);
        // console.log(resultsLimit);
        if (response.drinks === "None Found") {
            alert("try again");
        }
        else {
            for (var i = 0; i < resultsLimit.length; i++) {
                var drinkCard = $("<div>");
                drinkCard.addClass("card card-resize");
                drinkCard.addClass("card-panel hoverable");
                drinkCard.attr("data-drink-id", resultsLimit[i].idDrink);
                
                var drinkThumbDiv = $("<div>");
                drinkThumbDiv.addClass("card-image waves-effect waves-block waves-light")
                var drinkThumb = $("<img>");
                drinkThumb.addClass("activator");
                drinkThumb.attr("src", resultsLimit[i].strDrinkThumb);
                drinkThumbDiv.append(drinkThumb);
                
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
                
                drinkCard.append(drinkThumbDiv);
                drinkCard.append(drinkNameDiv);
                drinkCard.append(recipeReveal);
                $("#drinkDisplay").append(drinkCard);
            }

            $(".card").on("click", function() {
                $(".recipe-details").empty();
                var drinkId = $(this).attr("data-drink-id");
                var nameQueryURL = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/lookup.php?i=${drinkId}`;
                // console.log(nameQueryURL);
                

                $.ajax({
                    url: nameQueryURL,
                    method: "GET"
                }).then(function(response){
                    console.log(response);

                    var ingredientCount = 0;
                    var measureCount = 0;
                    
                    var recipeDetailsContainer = $("#" + drinkId)
                    
                    var abv = $("<p>");
                    abv.text(response.drinks[0].strAlcoholic);
                    recipeDetailsContainer.append(abv);
                    abv.addClass("abv");
                    console.log(response.drinks[0].strAlcoholic);

                    var measurementDiv = $("<div>");
                    measurementDiv.addClass("recipe-measurements")
                    recipeDetailsContainer.append(measurementDiv);

                    var ingredientDiv = $("<div>");
                    ingredientDiv.addClass("recipe-ingredients")
                    recipeDetailsContainer.append(ingredientDiv);
                    
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

                    var recipeInstructions = $("<p>");
                    recipeInstructions.text(response.drinks[0].strInstructions);
                    recipeDetailsContainer.append(recipeInstructions);
                    console.log(ingredientCount);
                    console.log(measureCount);
                });
            });
        }
    });
});

//user inputs ingredient into search bar
//click search calls results from the api
    //var for the value of the input to attach to the query url
//why