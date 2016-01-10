var i=1;
var map;
var fenway;
function initialize() {

	  fenway = new google.maps.LatLng(37.4282724,-121.9066238);
	  map = new google.maps.Map(document.getElementById('map'), {
	    center: fenway,
	    zoom: 14,
	    mapTypeId:google.maps.MapTypeId.ROADMAP
	  });
	  var panorama = new google.maps.StreetViewPanorama(
	      document.getElementById('pano'), {
	        position: fenway,
	        pov: {
	          heading: 34,
	          pitch: 10
	        }
	      });
	  map.setStreetView(panorama);
	  google.maps.event.addListener(map, 'click', function(event) {
	      addInformation(event.latLng);
	    });
	  var input = document.getElementById('pac-input');
	  var searchBox = new google.maps.places.SearchBox(input);
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	  // Bias the SearchBox results towards current map's viewport.
	  map.addListener('bounds_changed', function() {
	    searchBox.setBounds(map.getBounds());
	  });

	  var markers = [];
	  // [START region_getplaces]
	  // Listen for the event fired when the user selects a prediction and retrieve
	  // more details for that place.
	  searchBox.addListener('places_changed', function() {
	    var places = searchBox.getPlaces();

	    if (places.length == 0) {
	      return;
	    }

	    // Clear out the old markers.
	    markers.forEach(function(marker) {
	      marker.setMap(null);
	    });
	    markers = [];

	    // For each place, get the icon, name and location.
	    var bounds = new google.maps.LatLngBounds();
	    places.forEach(function(place) {
	      var icon = {
	        url: place.icon,
	        size: new google.maps.Size(71, 71),
	        origin: new google.maps.Point(0, 0),
	        anchor: new google.maps.Point(17, 34),
	        scaledSize: new google.maps.Size(25, 25)
	      };

	      // Create a marker for each place.
	      markers.push(new google.maps.Marker({
	        map: map,
	        title: place.name,
	        position: place.geometry.location
	      }));

	      if (place.geometry.viewport) {
	        // Only geocodes have viewport.
	        bounds.union(place.geometry.viewport);
	      } else {
	        bounds.extend(place.geometry.location);
	      }
	    });
	    map.fitBounds(bounds);
	    map.setZoom(14);
	  });
}

function addInformation(location) {
    var para = document.createElement("button");
    var node = document.createTextNode(i+". Latitude is "+location.lat());   
    var node1 = document.createTextNode(" and Longitude is "+location.lng());
    para.appendChild(node);
    para.appendChild(node1);
    para.onclick=function(){
      map.setCenter(new google.maps.LatLng(location.lat(), location.lng()));
      var panorama1 = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: new google.maps.LatLng(location.lat(), location.lng()),
        pov: {
          heading: 34,
          pitch: 10
        }
      });
      map.setStreetView(panorama1);

    };
    var element = document.getElementById("data");
    element.appendChild(para);
    i++;
    
}
function placeMarker(){
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
        
    });
    google.maps.event.addListener(marker, 'click', function(event) {
        addInformation(event.latLng);
    });
}