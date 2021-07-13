
var goBack = $(".back-button")
var ulEl = $(".ul-container");
var resultContainer = $(".result")
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

	fullContainer.addClass("show-container")
    resultContainer.append("<h1 class='result-header'>Find the Cocktails made with " + ingredient + " below:</h1>")

	//random selection

	var names = data.drinks;
	console.log(names)

	//Trying to access data still struggeling................................
	//for (var i = 0; i < Names.length; i++){
		
		var cocktailName = data.drinks[0].strDrink;
		console.log(cocktailName);
	//}

}

//get local storage function
getLocalStorage();

//Go back button
goBack.on("click", goBackFunction);
//searchButton.on("click", handleSubmit);

