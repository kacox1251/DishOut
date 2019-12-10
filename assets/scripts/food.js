// pull in api
function foodSearch () {
   
    // grabs the user input 
    var ingredientInput = $("#foodInput").val();
    $("#foodDisplay").empty();
    console.log(ingredientInput);
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + ingredientInput + "&ingr=3" + "&app_id=c6c1bf7d" + "&app_key=12b02ed3e74a3ae5b6c1a858ca061803"
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        // creates a div to hold the recipes being searched
        // and appends to html
        var recipeDiv = $("<div>");
        $("#foodDisplay").append(recipeDiv);
        console.log(response);
        var recipe = response.hits;
        // grabs recipes randomly from array
        var shuffle = _.shuffle(recipe);
        console.log(shuffle);
        // limits the arrays to only display 5 results
        var slice = _.slice(shuffle, [start=0], [end=5]);
        console.log(slice);
        // loop through the array of results & display search results
        for (var i = 0; i < slice.length; i++) {
    
            // food name
            var foodNameDiv = $("<div>");
            foodNameDiv.text(slice[i].recipe.label);
            recipeDiv.append(foodNameDiv);
            console.log(slice[i].recipe.label);
    
            // food image
            var imageURL = slice[i].recipe.image;
            var foodImageDiv = $("<img>").attr("src", imageURL);
            recipeDiv.append(foodImageDiv);
            console.log(slice[i].recipe.image);
            // food ingredients
            var ingredients = slice[i].recipe.ingredients;
            var noTextRepeat = _.uniqBy(ingredients, "text");
            for (var x = 0; x < noTextRepeat.length; x++) {
                var foodIngredDiv = $("<div>");
                foodIngredDiv.append(noTextRepeat[x].text);
                recipeDiv.append(foodIngredDiv);
            console.log(noTextRepeat[x]);
            // directions link
            var directionsLink = slice[i].recipe.shareAs;
            var directionsDiv = $("<a>").attr("href", directionsLink);
            recipeDiv.append(directionsDiv);
            console.log(directionsLink);
            
            
        }
        
    }
        
    });
    
};
$(document).on("click", "#searchBtnFood", foodSearch);