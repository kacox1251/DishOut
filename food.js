// pull in api
function foodSearch () {
   
    var ingredientInput = $("#foodInput").val();
    console.log(ingredientInput);

    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + ingredientInput + "&ingr=5" + "&app_id=c6c1bf7d" + "&app_key=12b02ed3e74a3ae5b6c1a858ca061803"
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        var recipeDiv = $("<div>");
        $("#foodDisplay").append(recipeDiv);
        console.log(response);
        var recipe = response.hits;
        for (var i = 0; i < recipe.length; i++) {
    
            // food name
            var foodNameDiv = $("<div>");
            foodNameDiv.text(response.hits[i].recipe.label);
            foodNameDiv.append(recipeDiv);
            console.log(response.hits[i].recipe.label);
    
            // food image
            var foodImageDiv = $("<div>");
            foodImageDiv.text(response.hits[i].recipe.image);
            foodImageDiv.append(recipeDiv);
            console.log(response.hits[i].recipe.image);
            // food ingredients
            var ingredients = response.hits[i].recipe.ingredients;
            for (var x = 0; x < ingredients.length; x++) {
                var foodIngredDiv = $("<div>");
                foodIngredDiv.append(ingredients[x].text);
                foodIngredDiv.append(recipeDiv);
            console.log(ingredients[x]);
            
        }

        
    }
        // food instructions
        

    });

    
    
};

$(document).on("click", "#searchBtnFood", foodSearch);

console.log("food");