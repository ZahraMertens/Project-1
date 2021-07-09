
function getWeather () {

    var apiUrl = ""
  
  
    //Get data for main card 
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
           
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('City does not exist!');
    });
}

getWeather();