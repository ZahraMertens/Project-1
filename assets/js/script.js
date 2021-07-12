
var searchButton = $(".search-button");
var inputNetwork = $("input.autocomplete");
var nameInput = $("#name");

//Autocomplete dropdown for social media networks
$(document).ready(function(){
  $('input.autocomplete').autocomplete({
    data: {
      "Instagram": null,
      "Twitter": null,//Maybe Icon
    }, 
  })
});

function goResult (event) {
  event.preventDefault();

  var name = $("#name").text().trim();
  console.log(name)
  window.location.replace("./result.html")
}

searchButton.on("click", goResult);

// api call for the cocktails by ingredients
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=Gin",//Type.. by ingredient
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "1a928d218emshf7ad00a62d285c5p1294e1jsn511010a300bf",
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});