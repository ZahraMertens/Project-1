
var searchButton = $(".search-button");
var nameInput = $("#name");


//Autocomplete dropdown for possible spirits
$(document).ready(function(){
  $('#autocomplete-input').autocomplete({
    data: {
      Whiskey: null,
      Vodka: null,
      Scotch: null,
      Bourbon:null,
      Amaretto: null,
      Gin: null,
      Rum: null,
      Cognac: null,
      Tequila: null,
      Mezcal: null,
      Brandy: null,
      Absinthe: null,
    }, 
  })
});


//When button clicked get input value
function handleSubmit (event){
  event.preventDefault();

  var ingredient = $("#autocomplete-input").val().trim()
  console.log(ingredient);

  //If there is an input it will be stored in the local storae in the next function
  if (ingredient) {
    setLocalStorage(ingredient);
    $("#autocomplete-input").val(""); //Remove input
  }
};

//Set local storage to store input
function setLocalStorage (ingredient) {
  
  var input = JSON.stringify(ingredient);
  console.log(input);
  localStorage.setItem("ingredient", input);
  console.log(localStorage.getItem("ingredient"));
  window.location.replace("./result.html");
};


//On click button
searchButton.on("click", handleSubmit);
