
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
function displayNames (data, ingredient) {
	
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
		console.log(cocktailID);

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
	console.log(drinkName)
	var glass = data.drinks[0].strGlass;
	console.log(glass);

    var ingredients = [];

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

	console.log(ingredients)

    var filteredIngredients = ingredients.filter(function(value){ 
        return value > "null";
    });

	console.log(filteredIngredients)

}



resultContainer.on("click", ".material-icons", getID);

//get local storage function
getLocalStorage();

//Go back button
goBack.on("click", goBackFunction);
//searchButton.on("click", handleSubmit);

