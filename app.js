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
      var restaurant = document.createElement('div')              
      var t = document.createTextNode(results[i].name);     
      h.appendChild(eachRestaurant);
      eachRestaurant.appendChild(restaurant); 
      restaurant.appendChild(t);

      var img = document.createElement('img')
      img.setAttribute("src", results[i].icon )
      restaurant.appendChild(img);

      var button = document.createElement('button')
      var buttonText = document.createTextNode('Ver más');
      button.appendChild(buttonText);
      restaurant.appendChild(button);

      eachRestaurant.setAttribute("class", "row")
      restaurant.setAttribute("class", "estilo")

      button.setAttribute("class", "buttonStyle")
      button.setAttribute("data-nombre",results[i].name)
      button.setAttribute("data-vici",results[i].vicinity)
      button.setAttribute("data-rating",results[i].rating)
      button.setAttribute("data-toggle", "modal")
      button.setAttribute("data-target", "#exampleModal")

      button.addEventListener('click', function() {
          var nombre = this.dataset.nombre;
          console.log(nombre)
          var vicin = this.dataset.vici;
          console.log(vicin)

          var title = document.getElementById('exampleModalLabel')
          title.textContent = nombre;

          var body = document.getElementById('modalBody')
          body.textContent = vicin;

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

