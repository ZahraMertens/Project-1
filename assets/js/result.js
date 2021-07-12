// api call for the cocktails by ingredients
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=Gin",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "1a928d218emshf7ad00a62d285c5p1294e1jsn511010a300bf",
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});