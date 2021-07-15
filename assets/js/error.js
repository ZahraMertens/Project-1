
//Move back to index html after 3 seocnds of error page
$(document).ready(function(){
   
    window.setTimeout(function(){

        window.location.replace("./index.html")

    }, 2000);
  });