var map = null;

var latitudeInput = document.getElementById("latitudeInput");
var longitudeInput = document.getElementById("longitudeInput");

var buttonSet = document.getElementById("buttonSet");


var markers = [];

function initAutocomplete() {
    //var icon1 = {
    //    path: google.maps.SymbolPath.CIRCLE,
    //    scale: 10
    //};

    //var icon2 = {
    //    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    //    scale: 10
    //};

    var latlng = new google.maps.LatLng(latitudeInput.value, longitudeInput.value);
    var myOptions = {
        zoom: 13,
        center: latlng,
        labels: true,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    map = new google.maps.Map(document.getElementById("map"), myOptions);

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });
    var bounds = new google.maps.LatLngBounds();
  
    var marker;
    buttonSet.onclick= function() {
        // MARKER
        var myLatlng = new google.maps.LatLng(latitudeInput.value, longitudeInput.value);
        if (marker == null) {
            marker = new google.maps.Marker({
                map: map,
                //       icon: icon2,
                title: "eee",
                draggable: true,
                animation: google.maps.Animation.DROP, //ako hoces animaciju da skakuce onaj marker
           
            });

            google.maps.event.addListener(marker,
                'dragend',
                function() {

                    latitudeInput.value = marker.getPosition().lat();
                    longitudeInput.value = marker.getPosition().lng();
                });
            markers.forEach(function (m) {
                if (m != markers)
                    m.setMap(null);
            });
        }
        markers.push(marker);
        marker.setPosition(myLatlng);
        
        map.setZoom(17);
        map.setCenter(marker.getPosition());
       
    };
   

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        markers.forEach(function (m) {
            m.setMap(null);
        });

        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
       
            // MARKER
            var marker = new google.maps.Marker({
                map: map,
                // icon: icon1,
                title: place.name,
                draggable: true,
                //animation: google.maps.Animation.DROP, //ako hoces animaciju da skakuce onaj marker
                position: place.geometry.location
            });

            latitudeInput.value = marker.getPosition().lat();
            longitudeInput.value = marker.getPosition().lng();

            markers.push(marker);
          
            google.maps.event.addListener(marker, 'click', function() {
                latitudeInput.value = marker.getPosition().lat();
                longitudeInput.value = marker.getPosition().lng();
                markers.forEach(function (m) {
                    if (m != marker)
                        m.setMap(null);
                });
            });


            google.maps.event.addListener(marker, 'dragend', function() {
                latitudeInput.value = marker.getPosition().lat();
                longitudeInput.value = marker.getPosition().lng();

                markers.forEach(function (m) {
                    if (m != marker)
                        m.setMap(null);
                });
            });

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}