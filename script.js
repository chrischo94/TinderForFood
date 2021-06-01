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
var website = document.querySelector('#website');
var price = document.querySelector('#price');
var rating = document.querySelector('#rating');
var matchModal = document.querySelector ('.modal-2');
var matchClose = document.getElementById ('matchClose');


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

    //create loop for businesses list, use i=1 because want it to show from first img list
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



//event listener Match
matchButton.addEventListener('click', e => {
  console.log(e, "It's a match!");
  matchModal.style.display = "block";

  console.log(matchModal);
  console.log(restuarants);

  var imgSource = $('#imgInput').attr('src');
  //var imgSource = imgInput.setAttribute('src',imgList);
  console.log(imgSource)
  //create loop for restuarants list 
  for (var i = 0; i <restuarants.length; i++){
    if(imgSource === restuarants[i].image_url){
      console.log('I got that res data');

      var chosenRest = restuarants[i];
      console.log(chosenRest);

      //set the info to display
      $('#resName').text(chosenRest.name);
      //$('#distance').text(chosenRest.distance);
      $('#address').text('Address: ' + chosenRest.location.display_address.join(''));
      $('#contact').html('Phone Number: <a href="tel:' + chosenRest.phone + '">' + chosenRest.phone + '</a>');
      $('#rating').text('Rating: ' + chosenRest.rating);
      $('#website').html('Website: <a href="' + chosenRest.url + '">Click me! </a>');
      $('#price').text('Price: ' + chosenRest.price);
    }
  }
})

nopeButton.addEventListener('click', e =>{
  console.log(e, "Keep swiping!");

  var nextImg = imgList[counter++];
  console.log(nextImg);
  $('#imgInput').attr('src', nextImg)
})



//user input to list
document.getElementById("add").onclick = function() {
  var text = document.getElementById("input").value; 
  var li = document.createElement("li");
  li.textContent = text;
  document.getElementById("list").appendChild(li);
  document.getElementById("input").value = ""; // clear the value
}

document.getElementById("add2").onclick = function() {
  var text = document.getElementById("input2").value; 
  var li = document.createElement("li");
  li.textContent = text;
  document.getElementById("list2").appendChild(li);
  document.getElementById("input2").value = ""; // clear the value
}

$( function() {
  var handle = $( "#custom-handle" );
  $( "#slider" ).slider({
    create: function() {
      handle.text( $( this ).slider( "value" ) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
    }
  });
} );


// Match modal functions 

matchClose.onclick = function () {
  matchModal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == matchModal) {
    matchModal.style.display = "none";
  }
}

//user input to list
var faveFood = [];
var advFood = [];
document.getElementById("add").onclick = function() {
  var text = document.getElementById("favoriteFood").value; 
  var li = document.createElement("li");
  li.textContent = text;
  faveFood.push(text)
  document.getElementById("list").appendChild(li);
  document.getElementById("favoriteFood").value = ""; // clear the value
}
document.getElementById("add2").onclick = function() {
  var text = document.getElementById("adventureFood").value; 
  var li = document.createElement("li");
  li.textContent = text;
  advFood.push(text)
  document.getElementById("list2").appendChild(li);
  document.getElementById("adventureFood").value = ""; // clear the value
}
$( function() {
  var handle = $( "#custom-handle" );
  $( "#slider" ).slider({
    create: function() {
      handle.text( $( this ).slider( "value" ) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
    }
  });
} );
var profileNameEl = document.querySelector(".profileName")
var rangeInputEl = document.querySelector(".slider")
var AgeEl = document.querySelector(".Age")
var profileSave =[ 
  {name: profileNameEl.value, slider: rangeInputEl.value,  years: AgeEl.value, favFood: faveFood, newFood: advFood}
];
var saveBtnEl = document.querySelector(".saveBtn");
console.log(saveBtnEl)
function setLS() {
  localStorage.setItem("profileSave", JSON.stringify(profileSave));
}
saveBtnEl.addEventListener("click", function () {
  setLS()
  console.log("im here!")
})
// document.getElementById('rangeInput').addEventListener('change',function() {
//   this.setAttribute('value',this.value);
  // document.getElementById("amount").value=this.value
// });
