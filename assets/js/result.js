
//Global variables
var searchButton = $(".search-button");
var goBack = $(".back-button");
var resultContainer = $(".result-container");


//If search pressed again clear local storage and set local storage for new search again
function handleSubmit (event){
	event.preventDefault();
  
	var ingredient = $("#autocomplete-input").val().trim()
	console.log(ingredient);
  
	//If there is an input the function gets executed
	if (ingredient) {
		localStorage.clear();
	    setLocalStorage(ingredient);
	  $("#autocomplete-input").val("");
	} 
};

//Set local stoarge again for search 
function setLocalStorage (ingredient) {
  
	var input = JSON.stringify(ingredient);
	console.log(input);
	localStorage.setItem("ingredient", input);
	console.log(localStorage.getItem("ingredient"));
	window.location.replace("./result.html");
};


//Get local storage to be able to fetch the data
function getLocalStorage (){

	var ingredient = localStorage.getItem("ingredient");
	ingredient = JSON.parse(ingredient);
    console.log(ingredient);
	cocktailName(ingredient);
}

//Go back function
function goBackFunction (event){
  event.preventDefault();

  window.location.replace("./index.html");
}

//Api call to get data 
function cocktailName(ingredient) {
  
	var urlName = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + ingredient;


	fetch(urlName, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "2520be2d2bmsh009ad33a5cae34ap1ead71jsna2a367676036",
			"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
		}
	})

	.then(function (response) {
		if (response.ok) {
		  console.log(response);
		  response.json().then(function (data) {
			console.log(data);

            var resData = data.drinks[0];
			console.log(resData)

			if (resData === "N"){
			  $(".search-container").append("<h1 class='show-error'>Spirit does not exist</h1>") 

			} else {	
			//Display data function
			displayNames(data, ingredient);
			}
		    
		  });
		} else {
			window.location.replace("./error.html");
		}
	  })
	  .catch(function (error) {
		window.location.replace("./error.html");
	})

};


//Display data function
function displayNames (data) {
	
	if (data.length === 0) {
		ulEl.text("No Cocktails found!")
		return;
	}
 
	var divEl = $("<div class='result row'>");

	var rowDiv = $("<div class='row'>");
	resultContainer.append(rowDiv);

	//Trying to access data still struggeling................................
	for (var i = 0; i < data.drinks.length; i++){
		
		var cocktailName = data.drinks[i].strDrink;
		var cocktailImage = data.drinks[i].strDrinkThumb;
		var cocktailID = data.drinks[i].idDrink;

		rowDiv.append(
			`<div class="col s12 m6 l3">
			   <div class="card">
			     <div class="card-image">
				   <img src="${cocktailImage}">
				   <a class="btn-floating halfway-fab waves-effect waves-light red btn modal-trigger" href="#modal1"><i data-value="${cocktailID}" class="material-icons">add</i></a>
			     </div>
			   <div class="card-content">
				<span class="card-title cocktail-title">${cocktailName}</span>
			  </div>
			</div>
		  </div>`
		);
	}
}
	
function getID (event){
	event.preventDefault();

	var id = $(event.target).data("value");
	console.log(id);

    $('.modal').modal(); 

	if (id){
		getInstructions(id);
	}
};


function getInstructions(id){

	var urlID = "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + id;

	fetch(urlID, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2520be2d2bmsh009ad33a5cae34ap1ead71jsna2a367676036",
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
			}
		})

		.then(function (response) {
			if (response.ok) {
			console.log(response);
			response.json().then(function (data) {
				console.log(data);
				displayRecipe(data);

			});
			} else {
				window.location.replace("./error.html");
			}
		})
		.catch(function (error) {
			window.location.replace("./error.html");
		})

}



function displayRecipe(data){

	var drinkName = data.drinks[0].strDrink;
	var glass = data.drinks[0].strGlass;
	var instructions = data.drinks[0].strInstructions;
	var imgModal = data.drinks[0].strDrinkThumb;
    var ingredients = [];
	var measurements = [];

	var ingredient1 = data.drinks[0].strIngredient1;
	var ingredient2 = data.drinks[0].strIngredient2;
	var ingredient3 = data.drinks[0].strIngredient3;
	var ingredient4 = data.drinks[0].strIngredient4;
	var ingredient5 = data.drinks[0].strIngredient5;
	var ingredient6 = data.drinks[0].strIngredient6;
	var ingredient7 = data.drinks[0].strIngredient7;
	var ingredient8 = data.drinks[0].strIngredient8;
	var ingredient9 = data.drinks[0].strIngredient9;
	var ingredient10 = data.drinks[0].strIngredient10;

	ingredients.push(ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, ingredient7, ingredient8, ingredient9, ingredient10)

    // Getting rid of null.
	var realIngredients = ingredients.filter(function (e) {return e != null;});
	console.log(realIngredients);

	// Same function for the mesurements
	var measurement1 = data.drinks[0].strMeasure1;
	var measurement2 = data.drinks[0].strMeasure2;
	var measurement3 = data.drinks[0].strMeasure3;
	var measurement4 = data.drinks[0].strMeasure4;
	var measurement5 = data.drinks[0].strMeasure5;
	var measurement6 = data.drinks[0].strMeasure6;
	var measurement7 = data.drinks[0].strMeasure7;
	var measurement8 = data.drinks[0].strMeasure8;
	var measurement9 = data.drinks[0].strMeasure9;
	var measurement10 = data.drinks[0].strMeasure10;

	measurements.push(measurement1, measurement2, measurement3, measurement4, measurement5, measurement6, measurement7, measurement8, measurement9, measurement10);

    // Getting rid of null.
	var realMeasurement = measurements.filter(function (e) {return e != null;});
	console.log(realMeasurement);


	//Append content to modal
	$(".modal-header").text(drinkName + " Recipe");
	$(".img-modal").attr("src", imgModal);
	$(".ingredients-header").text("List of ingredients:")

	$(".modal-ul").remove();
	$(".modal-div").append("<ul class='modal-ul'></ul>")

	for (var i = 0;i <realMeasurement.length; i++){

		$(".modal-ul").append("<li class='modal-li'><span class='span-ing'>" + realIngredients[i] + "</span> " + realMeasurement[i] + "</li>")
	}

	$(".glass").text("Glass used: " + glass)
	$(".instructions-header").text("Method:")
	$(".instructions").text(instructions)
}


//get local storage function
getLocalStorage();

//Get Modal content on click of red button of card
resultContainer.on("click", ".material-icons", getID);

//Go back button
goBack.on("click", goBackFunction);

//Search Button... Set local storage again
searchButton.on("click", handleSubmit);