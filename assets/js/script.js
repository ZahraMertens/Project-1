
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
  //window.location.replace("./result.html")
}

searchButton.on("click", goResult);

