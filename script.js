var lat;
var lng;


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("cant get coordinates")
  }
}
function showPosition(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  console.log(lat, lng)

    // lat = 34.0522 (hard coded coordinates for chris to test)
    // lng = 118.24
  console.log(lat, lng) 

  getFood();
}
getLocation();



function getFood() {
  let queryYelp = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=' + lat + '&longitude=' + lng;
  console.log(queryYelp)
  $.ajax({
    'url': queryYelp,
    'method': 'GET',
    'timeout': 0,
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer CvM2gOH36ZGu00rvjEGg51Nqgc01vaU8dCcxJFwq1GdUOIi9oQCwiokgJHEM_QVF6X26RbOSnpiEZCMSJnfQmVf6q0POwjjQQRoa8Xai26aWHn-xlgcMa5XDRvKvYHYx'
    },
  }).then(function (response) {
    console.log(response)
  })
    .catch(function (err) {
      console.error(err);
    });
}



function getFood(){
        let queryYelp = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&latitude='+ lat + '&longitude=' + lng;
            console.log(queryYelp)
            $.ajax({
              'url': queryYelp,
              'method': 'GET',
              'timeout': 0,
              'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer CvM2gOH36ZGu00rvjEGg51Nqgc01vaU8dCcxJFwq1GdUOIi9oQCwiokgJHEM_QVF6X26RbOSnpiEZCMSJnfQmVf6q0POwjjQQRoa8Xai26aWHn-xlgcMa5XDRvKvYHYx'
              },
            }).then(function (response) {
              console.log(response)
            })
            .catch(function(err) {
                console.error(err);
            });
        }


// Search bar autocomplete properties

$(function () {
  var availableTags = [
    "Tacos",
    "Burritos",
    "Breakfast",
    "Healthy",
    "Fried chicken",
    "Beer",
    "Cocktails",
    "Mexican",
    "Sushi",
    "Thai",
    "Italian",
    "Dessert",
    "Chocolate",
    "Vanilla",
    "Ice cream",
    "Steak",
    "Fast food",
    "Indian",
    "Vegan",
    "Cuban",
    "Falafel",
    "Seafood"
  ];
  $(".form-control").autocomplete({
    source: availableTags
  });
});


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//have to display = none to card
//make the button "Match" and "nahh" work, after click btn "Match", it will show card with map and restuarant img
//when we click "Nahh", it shows next img on carousel

// create variable to button on carousel 
var BtnMatch = document.querySelector(".BtnMatch");
var BtnNotMatch = document.querySelector(".BtnNotMatch");


