var map;
var infowindow;

function initMap() {
  var pyrmont = {lat: -12.1215692, lng: -77.0440787};

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    type: ['restaurant']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      console.log(results[i]);

      var h = document.getElementById('restaurantes') 
      var eachRestaurant = document.createElement('div')           
      var t = document.createTextNode(results[i].name);     
      h.appendChild(eachRestaurant);
      eachRestaurant.appendChild(t);

      var button = document.createElement('button')
      var buttonText = document.createTextNode('Ver más');
      button.appendChild(buttonText);
      h.appendChild(button);

      eachRestaurant.setAttribute("data-nombre",results[i].name)
      eachRestaurant.setAttribute("data-vici",results[i].vicinity)

      eachRestaurant.addEventListener('click', function() {
          console.log(this)
          var nombre = this.dataset.nombre;
          console.log(nombre)
          var vicin = this.dataset.vici;
          console.log(vicin)

          if(this == nombre) {
            for (var i = 0; i < results.length; i++) {
            console.log(results[i].vicinity)
            }
          }
      });

    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });

  /***************** input ***************** */
  var input = document.getElementById('pac-input');
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);
  autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      // window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  })
}

window.onload = initMap;