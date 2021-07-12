
var searchButton = $(".search-button");
var inputIngredients = $("#autocomplete-input");
var nameInput = $("#name");

//Autocomplete dropdown for ingredients

$(document).ready(function(){
  $('#autocomplete-input').autocomplete({
    data: {
      //Ingredient lists--TO DO
    }, 
  })
});

// Saving cocktail list in search

var listCocktails = [];

function storeCocktails() {
  localStorage.setItem("cocktails", JSON.stringify(listCocktails));
}

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cocktailName = inputIngredients.value.trim();

  if (cocktailName) {
    
    getCocktailList(cocktailName);

    
  } else {
    alert('Please enter an Ingredient'); // NEED TO USE MODALS HERE
  }
};

// api call for the cocktails by ingredients
Var cocktailName = function (ingredient) {
  

   fetch("https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + ingredient, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "1a928d218emshf7ad00a62d285c5p1294e1jsn511010a300bf",
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
	 }
  })
     .then(function (response) {
      if (response.ok) {
        window.location.replace("./result.html");
        
};
 
