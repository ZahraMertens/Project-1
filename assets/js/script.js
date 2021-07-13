
var searchButton = $(".search-button");
var inputIngredients; //= document.getElementById("autocomplete-input").value;
var nameInput = $("#name");
var listCocktails = [];
let ingredient;

//Autocomplete dropdown for ingredients

$(document).ready(function(){
  $('#autocomplete-input').autocomplete({
    data: {
      //Ingredient lists--TO DO
    }, 
  })
});


function handleSubmit (event){
  event.preventDefault();

  var ingredient = $("#autocomplete-input").val().trim()
  console.log(ingredient);

  if (ingredient) {
    setLocalStorage(ingredient);
    $("#autocomplete-input").val("");
  } else {
    //modal ingredient not found
  }
};

function setLocalStorage (ingredient) {
  
  var input = JSON.stringify(ingredient);
  console.log(input);
  localStorage.setItem("ingredient", input);
  console.log(localStorage.getItem("ingredient"));
  window.location.replace("./result.html");
};



searchButton.on("click", handleSubmit);
