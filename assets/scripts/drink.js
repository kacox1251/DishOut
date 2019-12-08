var apiKey = "9973533";
var nameQueryURL = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/search.php?s=margarita`;

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
        //use lodash .shuffle to randomize results array
        var mixed = _.shuffle(response.drinks);
        var limit = _.slice(mixed, [start=0], [end=9]);
        console.log(limit);
        //limit response to 10 drinks
        if (response.drinks === "None Found") {
            alert("try again");
        }
        else {
                            //   <div class="card">
                            //     <div class="card-image waves-effect waves-block waves-light">
                            //       <img class="activator" src="images/office.jpg">
                            //     </div>
                            //     <div class="card-content">
                            //       <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
                            //       <p><a href="#">This is a link</a></p>
                            //     </div>
                            //     <div class="card-reveal">
                            //       <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                            //       <p>Here is some more information about this product that is only revealed once clicked on.</p>
                            //     </div>
                            //   </div>
            //create for loop to run through array of drinks
            for (var i = 0; i <= limit.length; i++) {
                //create a div to hold both the img and the name
                var drinkCard = $("<div>");
                drinkCard.addClass("card");
                drinkCard.attr("data-drink-id", limit[i].idDrink);
                
                var drinkThumbDiv = $("<div>");
                drinkThumbDiv.addClass("card-image waves-effect waves-block waves-light")
                var drinkThumb = $("<img>");
                drinkThumb.addClass("activator");
                drinkThumb.attr("src", limit[i].strDrinkThumb);
                drinkThumbDiv.append(drinkThumb);
                
                var drinkNameDiv = $("<div>");
                drinkNameDiv.addClass("card-content");
                var drinkName = $("<span>");
                drinkName.addClass("card-title activator grey-text text-darken-4");
                drinkName.text(limit[i].strDrink);                
                var recipeButton = $("<i>");
                recipeButton.addClass("material-icons right");
                recipeButton.text("more_vert");
                drinkName.append(recipeButton);
                drinkNameDiv.append(drinkName);
                
                var recipeReveal = $("<div>");
                recipeReveal.addClass("card-reveal");
                var recipeInfo = $("<span>");
                recipeInfo.addClass("card-title activator grey-text text-darken-4");
                var recipeButton = $("<i>");
                recipeButton.addClass("material-icons right");
                recipeButton.text("close");
                var recipeDetails = $("<p>");
                recipeDetails.text("recipe");
                recipeInfo.append(recipeButton);
                recipeReveal.append(recipeInfo);
                recipeReveal.append(recipeDetails);
                
                //append all things to drinkDiv, then append to $("#drinkDisplay")
                drinkCard.append(drinkThumbDiv);
                drinkCard.append(drinkNameDiv);
                drinkCard.append(recipeReveal);
                $("#drinkDisplay").append(drinkCard);
                console.log("it's working")
            }
        }
    });
});
    
//cocktail details call
//
$("#cocktail-name")
$.ajax({
    url: nameQueryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    // $.each(response.drinks[0], function(key){
    //     if (key.indexOf["strIngredient"] !== -1) {
    //         console.log(key);
    //     }
    // });
    var ingredientCount = 0;

    for (var i = 1; i < 16; i++) {
        var objKey = `strIngredient${i}`;
        // console.log(response.drinks[0][objKey]);

        if (response.drinks[0][objKey]) {
            ingredientCount++;
        }
    }
    console.log(ingredientCount);
});

//user inputs ingredient into search bar
//click search calls results from the api
    //var for the value of the input to attach to the query url
//