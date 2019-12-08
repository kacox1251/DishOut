var apiKey = "9973533";

//initial cocktail name search
$("#searchRecipes").on("click", function() {
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
        console.log(response);
        var resultsRandom = _.shuffle(response.drinks);
        var resultsLimit = _.slice(resultsRandom, [start=0], [end=9]);
        console.log(resultsLimit);
        if (response.drinks === "None Found") {
            alert("try again");
        }
        else {
            for (var i = 0; i <= resultsLimit.length; i++) {
                var drinkCard = $("<div>");
                drinkCard.addClass("card card-resize");
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
                var closeRecipe = $("<i>");
                closeRecipe.addClass("material-icons right");
                closeRecipe.text("close");
                var recipeDetails = $("<p>");
                recipeDetails.text("recipe");
                recipeInfo.append(closeRecipe);
                recipeReveal.append(recipeInfo);
                recipeReveal.append(recipeDetails);
                
                //append all things to drinkDiv, then append to $("#drinkDisplay")
                drinkCard.append(drinkThumbDiv);
                drinkCard.append(drinkNameDiv);
                drinkCard.append(recipeReveal);
                $("#drinkDisplay").append(drinkCard);
                
                var drinkId = drinkCard.attr("data-drink-id");
                var nameQueryURL = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/lookup.php?i=${drinkId}`;
                console.log(nameQueryURL);
                // $.ajax({
                //     url: nameQueryURL,
                //     method: "GET"
                // }).then(function(response){
                //     console.log(response);
                //     // $.each(response.drinks[0], function(key){
                //     //     if (key.indexOf["strIngredient"] !== -1) {
                //     //         console.log(key);
                //     //     }
                //     // });
                //     var ingredientCount = 0;

                //     for (var i = 1; i < 16; i++) {
                //         var objKey = `strIngredient${i}`;
                //         // console.log(response.drinks[0][objKey]);

                //         if (response.drinks[0][objKey]) {
                //             ingredientCount++;
                //         }
                //     }
                //     console.log(ingredientCount);
                // });
            }
        }
    });
});

//user inputs ingredient into search bar
//click search calls results from the api
    //var for the value of the input to attach to the query url
//