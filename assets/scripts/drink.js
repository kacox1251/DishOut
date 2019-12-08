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
            //create for loop to run through array of drinks
            for (var i = 0; i <= limit.length; i++) {
            //create a div to hold both the img and the name
            var drinkDiv = $("<div>");
            var drinkThumb = $("<img>");
            var drinkName = $("<h5>");
            var recipeBtn = $("<button>");
            //give the div an attr called data-drink-id and give responose.id
            drinkDiv.attr("data-drink-id", limit[i].idDrink);
            //change img src to response.drink[i].strDrinkThumb
            drinkThumb.attr("src", limit[i].strDrinkThumb);
            //change name text to response.drink[i].strDrink
            drinkName.text(limit[i].strDrink);
            //there will be a button to search the drink id or cocktail name
            //give button class
            recipeBtn.text("recipe");
            //append all things to drinkDiv, then append to $("#drinkDisplay")
            drinkDiv.append(drinkThumb);
            drinkDiv.append(drinkName);
            drinkDiv.append(recipeBtn);
            $("#drinkDisplay").append(drinkDiv);
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