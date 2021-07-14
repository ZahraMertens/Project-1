
var goBack = $(".back-button");
var resultContainer = $(".result-container");

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
			//Display data function
			displayNames(data, ingredient);
			
		  });
		} else {
		  alert('Error: ' + response.statusText);
		}
	  })
	  .catch(function (error) {
		alert('City does not exist!')
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
			alert('Error: ' + response.statusText);
			}
		})
		.catch(function (error) {
			alert('Cocktail')
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
	$(".modal-div").append("<ul class='modal-ul'></ul>")

	for (var i = 0;i <realMeasurement.length; i++){

		$(".modal-ul").append("<li class='modal-li'><span class='span-ing'>" + realIngredients[i] + "</span> " + realMeasurement[i] + "</li>")
	}

	$(".glass").text("Glass used: " + glass)
	$(".instructions-header").text("Method:")
	$(".instructions").text(instructions)


	//Remove content on click
	$("#modal1").on("click", ".modal-close", removeModal)
	
}

//Not working
function removeModal (event) {
	event.preventDefault();

	$(".modal-li").remove();
}

resultContainer.on("click", ".material-icons", getID);

//get local storage function
getLocalStorage();

//Go back button
goBack.on("click", goBackFunction);

//searchButton.on("click", handleSubmit);






/*if (ingredient1 !== null || measurement1 !== null){
		$(".modal-ul").append("<li class='modal-li'>" + ingredient1 + ": " + measurement1 + "</li>")

	} 
	
	if (ingredient2 !== null || measurement2 !== null){
		$(".modal-ul").append("<li class='modal-li'>" + ingredient2 + ": " + measurement2 + "</li>")

	}
	
	if (ingredient3 !== null || measurement3 !== null){
		$(".modal-ul").append("<li class='modal-li'>" + ingredient3 + ": " + measurement3 + "</li>")

	} 
	
	if (ingredient4 !== null || measurement4 !== null){
		$(".modal-ul").append("<li class='modal-li'>" + ingredient4 + ": " + measurement4 + "</li>")

	}
	
	if (ingredient5 !== null || measurement5 !== null){
		$(".modal-ul").append("<li class='modal-li'>" + ingredient5 + ": " + measurement5 + "</li>")

	} 
	
	if (ingredient6 !== null || measurement6 !== null){
		$(".modal-ul").append("<li class='modal-li'>" + ingredient6 + ": " + measurement6 + "</li>")

	} 
	
	if (ingredient7 !== null || measurement7 !== null){
		$(".modal-ul").append("<li class='modal-li'>" + ingredient7 + ": " + measurement7 + "</li>")

	} 
	
	if (ingredient8 !== null || measurement8 !== null){
		$(".modal-ul").append("<li class='modal-li'>" + ingredient8 + ": " + measurement8 + "</li>")

	} 
	
	if (ingredient9 !== null || measurement9 !== null){
		$(".modal-ul").append("<li class='modal-li'>" + ingredient9 + ": " + measurement9 + "</li>")
		
	}
	
	if (ingredient10 !== null || measurement10 !== null){
		$(".modal-ul").append("<li class='modal-li'>" + ingredient10 + ": " + measurement10 + "</li>")
	};*/