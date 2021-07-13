
var goBack = $(".back-button");
var resultContainer = $(".result");
var fullContainer = $(".result-container");

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

	fullContainer.addClass("show-container")
    fullContainer.append("<h1 class='result-header'>Find the Cocktails made with " + ingredient + " below:</h1>")
	fullContainer.append(divEl)

	//random selection

	//Trying to access data still struggeling................................
	for (var i = 0; i < data.drinks.length; i++){
		
		var cocktailName = data.drinks[i].strDrink;
		var cocktailImage = data.drinks[i].strDrinkThumb;
		console.log(cocktailName);
		//console.log(cocktailImage)

		var imgEl = $("<img class='image-size'>");
		imgEl.attr("src", cocktailImage);

		var cardEl = $("<div class='card-cocktail col l3'>")
		cardEl.text(cocktailName);
		cardEl.append(imgEl)

		divEl.append(cardEl);
	}

}

//get local storage function
getLocalStorage();

//Go back button
goBack.on("click", goBackFunction);
//searchButton.on("click", handleSubmit);

