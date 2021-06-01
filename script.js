var lat;
var lng;
var searchInputVal;
var searchBar = document.querySelector('#searchBtn');
var matchButton = document.querySelector('#matchBtn');
var nopeButton = document.querySelector('#nopeBtn');
var imgInput = document.querySelector('#imgInput');
var resName = document.querySelector('#resName');
var distance = document.querySelector('#distance');
var address = document.querySelector('#address');
var contact = document.querySelector('#contact');
// to store list of images for the main image
var imgList = [];
// counter to increment the different images 
// when user clicks nope
var counter = 0
// store array of 20 restraunt data 
var restraunts = []


// Search bar submit function
function handleSearchFormSubmit(event){
  event.preventDefault();
  searchInputVal = document.querySelector('#formInput').value;
  console.log(searchInputVal)

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }  

  getFood();
}

//Search button event listener
searchBar.addEventListener('click', handleSearchFormSubmit);


// get location where the user is, the pop-up window will ask if the user allow to track the location
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
 
}
getLocation();




 // 1. user enters food topic hits search, get API from Yelp
function getFood() {
  let queryYelp = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + searchInputVal + '&latitude='  + lat + '&longitude=' + lng;
  console.log(queryYelp)
  $.ajax({
    'url': queryYelp,
    'method': 'GET',
    'timeout': 0,
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer CvM2gOH36ZGu00rvjEGg51Nqgc01vaU8dCcxJFwq1GdUOIi9oQCwiokgJHEM_QVF6X26RbOSnpiEZCMSJnfQmVf6q0POwjjQQRoa8Xai26aWHn-xlgcMa5XDRvKvYHYx'
    },
  }).then(function (data) {
    console.log(data)
    var firstImg = data.businesses[0].image_url;
    console.log(firstImg);

    restuarants = data.businesses;
  

    //set the img
    imgInput.setAttribute('src', firstImg);

    //create loop for businesses list, use i=1 because want it to show from first img
    for(var i = 1; i < data.businesses.length; i++) {
      var buz = data.businesses[i]
        console.log(buz);

        imgList.push(buz.image_url);
  }
 }) .catch(function (err) {
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





// Match and Nope button functions

// function foodMatch(){
//   if (matchButton === true)
//   getElementById('#matchCard')
//   else{ (nopeButton === true)
//     console.log('Keep swiping')
//   }
// }

//event listener Match
matchButton.addEventListener('click', e => {
  console.log(e, "It's a match!");

  console.log(restuarants);

  var imgSource = $('#imgInput').attr('src');
  //var imgSource = imgInput.setAttribute('src',imgList);
  console.log(imgSource)

  for (var i = 0; i <restuarants.length; i++){
    if(imgSource === restuarants[i].image_url){
      console.log('I got that res data');

      var chosenRest = restuarants[i];
      console.log(chosenRest);

      //set the info to display
      $('#resName').text(chosenRest.name);
      //$('#distance').text(chosenRest.distance);
      $('#address').text('Address: ' + chosenRest.location.display_address.join(''));
      $('#contact').text('Phone Number: ' + chosenRest.phone);
    }
  }
})

nopeButton.addEventListener('click', e =>{
  console.log(e, "Keep swiping!");

  var nextImg = imgList[counter++];
  console.log(nextImg);
  $('#imgInput').attr('src', nextImg)
})




