$('document').ready(function(){
	let giphies = ["Puppies", "Food Porn", "Leslie Knope", "Fail", "GOT", "Winter", "Rihanna", "Socks", "Trending", "Joy"];
	let searchTag = giphies[0];
	let queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchTag}&api_key=dc6zaTOxFJmzC&limit=9`;
	
	$(document).on('click', "button.giphyButton", function() {
      	searchTag = $(this).html();
      	queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchTag}&api_key=dc6zaTOxFJmzC&limit=9`
      	console.log(searchTag);
      	callGiphy();
    });

    function callGiphy(){
		$.ajax({
        	url: queryURL,
        	method: "GET"
      	}).done(function(response) {
      		console.log(response);
      		// console.log(response.data[0].url);

      		for(let i = 0; i < response.data.length; i++){
      			let imgURL = response.data[i].images.original.url;
      			let linkURL = response.data[i].url;
      			let gifTitle = response.data[i].title;
      			console.log(imgURL);
      			$('#randomImg-'+[i]).attr("src",imgURL);
      			$('#randomTitle-'+[i]).html(gifTitle);
      			$('#giphyLink-'+[i]).attr("href",linkURL);
      		}
		});
	}

    // Function for displaying giphy data
    function renderButtons() {
        $("#button-container").empty();
        for(let index = 0; index < giphies.length; index++){
          	let button = $("<button>");
          	button.html(giphies[index]);
          	button.addClass("giphyButton btn btn-primary");
          	$("#button-container").append(button);
        }

    }

      // This function handles events where one button is clicked
    $("#add-giphy").on("click", function(event) {
        event.preventDefault();
        let giphyTextField = $("#giphy-input").val();
        if(giphyTextField){
          	giphies.push(giphyTextField);
          	renderButtons();
          	$('#giphy-input').val("");
        }
   	});

    renderButtons();
    callGiphy();
});