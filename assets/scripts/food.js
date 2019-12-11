// pull in api
function foodSearch () {
   
    // grabs the user input 
    var ingredientInput = $("#foodInput").val();
    $("#foodDisplay").empty();
    console.log(ingredientInput);
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + ingredientInput + "&ingr=3" + "&app_id=c6c1bf7d" + "&app_key=12b02ed3e74a3ae5b6c1a858ca061803"
    // console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        // creates a div to hold the recipes being searched
        // and appends to html
        console.log(response);
        var recipe = response.hits;
        // grabs recipes randomly from array
        var shuffle = _.shuffle(recipe);
        console.log(shuffle);
        // limits the arrays to only display 5 results
        var slice = _.slice(shuffle, [start=0], [end=5]);
        // console.log(slice);
        // loop through the array of results & display search results
     
        for (var i = 0; i < slice.length; i++) {
            
            var recipeDiv = $("<div>");
            recipeDiv.addClass("card card-resize");
            recipeDiv.addClass("card-panel hoverable");
            $("#foodDisplay").append(recipeDiv);

            // food image
            var imageURL = slice[i].recipe.image;
            var imageDiv = $("<div>");
            imageDiv.addClass("card-image waves-effect waves-block waves-light");
            var foodImageDiv = $("<img>").attr("src", imageURL).addClass("activator");
            imageDiv.append(foodImageDiv);
            recipeDiv.append(imageDiv);
            console.log(slice[i].recipe.image);

            // food name
            var foodNameDiv = $("<div>");
            foodNameDiv.addClass("card-content");
            var foodNameSpan = $("<span>");
            foodNameSpan.addClass("card-title activator grey-text text-darken-4");
            foodNameSpan.text(slice[i].recipe.label);
            var foodRecipeReveal = $("<i>");
            foodRecipeReveal.addClass("material-icons right");
            foodRecipeReveal.text("more_vert");
            foodNameSpan.append(foodRecipeReveal);
            foodNameDiv.append(foodNameSpan);
            recipeDiv.append(foodNameDiv);
            // console.log(slice[i].recipe.label);

            // food ingredients
            var ingredients = slice[i].recipe.ingredients;
            var noTextRepeat = _.uniqBy(ingredients, "text");
            console.log("ARR", noTextRepeat)  
            
            var foodIngredDiv = $("<div>").addClass("card-reveal");
            var foodCloseRecipe = $("<i>");
            foodCloseRecipe.addClass("material-icons right");
            foodCloseRecipe.text("close");
            var recipeSpan = $("<span>");
            recipeSpan.addClass("card-title activator grey-text text-darken-4");
            recipeSpan.append(foodCloseRecipe);
            foodIngredDiv.append(recipeSpan);
            recipeDiv.append(foodIngredDiv);
            


            for (var x = 0; x < noTextRepeat.length; x++) {
                var foodRecipe = $("<p>");
                foodRecipe.append(noTextRepeat[x].text);
                foodIngredDiv.append(foodRecipe);
                
            }
            
            // directions link
            var directionsLink = slice[i].recipe.shareAs;
            var directionsDiv = $("<a>").attr("href", directionsLink).text("Link to Directions");
            directionsDiv.attr('target', '_blank');
            foodIngredDiv.append(directionsDiv);
            recipeDiv.append(foodIngredDiv);
            console.log(directionsLink);
        
    }
        
    });
    
};
$(document).on("click", "#searchBtnFood", foodSearch);
