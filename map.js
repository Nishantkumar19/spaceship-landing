$(function() {
  var map, spaceship, message, infowindow, geocoder;
  var smartkarma = new google.maps.LatLng(1.335056, 103.964932);

  initialize(); 

  function initialize() {
    var mapOptions = {
      zoom: 8,
      center: smartkarma
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }
  $('#map-form').submit(function(e) {
    e.preventDefault();
    locateAddress();
  }); 

  function locateAddress() {
    var location =  $('#map-input').val();

    
    if(location == "") {
      alert("Please specify a location");
      return;
      
    }

  
    geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var address = results[0].geometry.location;

        // lauch your spaceship here with valid address
        launchSpaceship(address);
      } else {
        alert('Sorry, Commander! We cannot find the address you provided!');
      }
    });
  }

  // TODO: fade out your spaceship image and show it on the map
  function launchSpaceship(address) {
    map.setZoom(8);
    map.panTo(address);
    
    var icon = {
      url: 'spaceship.png',
      scaledSize: new google.maps.Size(32,32)
    };
    
    spaceship = new google.maps.Marker({
        position: address,
        map: map,
        icon: icon
        
      
    });
    setTimeout(landSpaceship, 500);
  }
  
  function landSpaceship() {
    infowindow = new google.maps.InfoWindow({
    content: "Landing..."  
    });
    
    infowindow.open(map, spaceship);
    
    setTimeout(landSuccess, 500);
  }
  function landSuccess() {
  map.setZoom(16);
    infowindow.setContent("Landed Succesfully!");
    setTimeout(landed, 2000);
  }
  
  function landed() {
    infowindow.close();
  }

  
});
 

/*
  Bonus: 
  1. clear the input box content when necessary
  2. let input box get focus when necessary
  3. other details that you think necessary
*/
