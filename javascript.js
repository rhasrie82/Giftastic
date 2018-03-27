$(document).ready(function() {



  var topics = ["Ford", "Dodge", "Chevy", "Pontiac", "Mazda", "Toyota", "Honda"];
  
  
  
  function displayGifs() {
  
  
  
    $("#car-gifs").empty();	
  
  
  
    var car = $(this).attr("data-name");
  
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=1WRgBF3knbDmR5ffF5gglm9Nl3Lah5sp&limit=10";
  
  
  
    $.ajax({
  
      url: queryURL,
  
      method: "GET"
  
    }).done(function(response) {
  
      
  
      var results = response.data;
  
  
  
      console.log(results);
  
  
  
      for (var i = 0 ; i < results.length ; i++) {
  
  
  
        var rating = results[i].rating;
  
  
  
        if (results[i].rating !== "r") {
  
          var carDiv = $("<div>");
  
          var p = $("<p>").text("Rating: " + rating);
  
  
  
          var carImg = $("<img>");
  
  
  
          carImg.attr("src", results[i].images.fixed_height_still.url);
  
          carImg.attr("data-state", "still");
  
          carImg.attr("data-still", results[i].images.fixed_height_still.url);
  
          carImg.attr("data-animate", results[i].images.fixed_height.url);
  
          carImg.attr("align", "left");
  
          carImg.attr("class", "show");
  
  
          carDiv.append(p);
          carDiv.append(carImg);
         
          
          $("#car-gifs").prepend(carDiv);
  
        };
  
      }
  
    });
  
  
  
  };
  
  
  
  // Render buttons from array.
  
  
  
  function renderButtons() {
  
  
  
    $("#car-buttons").empty();
  
  
  
    for (var i = 0 ; i < topics.length ; i++) {
  
      var b = $("<button>");
  
      b.attr("data-name", topics[i]);
  
      b.addClass("carButton")
  
      b.text(topics[i]);
  
      $("#car-buttons").append(b);
  
    };
  
  };
  
  
  
  // When new TV Show is submitted, add to list of buttons.
  
  
  
  $("#addCar").on("click", function(event) {
  
  
  
    event.preventDefault();
  
  
  
    var car = $("#car-input").val().trim();
  
  
  
    topics.push(car);
  
  
  
    renderButtons();
  
  
  
  });
  
  
  
  //Click to animate GIF.
  
  $(document).on("click", "img", animateGif);
  
  
  
  
  
  function animateGif() {
  
  
  
    var state = $(this).attr("data-state");
  
    
  
      if (state === "still") {
  
  
  
        $(this).attr("src", $(this).attr("data-animate"));
  
        $(this).attr("data-state", "animate");
  
        console.log(this);
  
      }
  
  
  
      else {
  
        $(this).attr("src", $(this).attr("data-still"));
  
        $(this).attr("data-state", "still");
  
  
  
      }
  
  };
  
  
  
  
  
  
  
  $(document).on("click", ".carButton", displayGifs);
  
  
  
  renderButtons();
  
  
  
  });









