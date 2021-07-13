
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


//When button clicked get input value
function handleSubmit (event){
  event.preventDefault();

  var ingredient = $("#autocomplete-input").val().trim()
  console.log(ingredient);

  //If there is an input the function gets executed
  if (ingredient) {
    setLocalStorage(ingredient);
    $("#autocomplete-input").val("");
  } else {
    //modal ingredient not found
  }
};

//Set local storage
function setLocalStorage (ingredient) {
  
  var input = JSON.stringify(ingredient);
  console.log(input);
  localStorage.setItem("ingredient", input);
  console.log(localStorage.getItem("ingredient"));
  window.location.replace("./result.html");
};


//On click button
searchButton.on("click", handleSubmit);
