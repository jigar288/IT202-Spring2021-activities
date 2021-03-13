function isGeolocationAvailable(){
    if('geolocation' in navigator) {
        return true;
    }else {
        alert('Geolocation is not supported by your browser')
        return false;
    }
}

function outputLocationData(data){
    const ulElement = document.querySelector('#location-data')
    let listElement = document.createElement("LI");
    var locationTextNode = document.createTextNode(data);
    listElement.appendChild(locationTextNode);
    // ulElement.appendChild(listElement);    
    ulElement.prepend(listElement)
}

function redrawCircle(centerCoordinates){
    const cityCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 5,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: centerCoordinates,
        radius: 10,
    });    
}

function watchLocation(){
    if(isGeolocationAvailable){
        navigator.geolocation.watchPosition((position) => {
            const newLocation = { lat: position.coords.latitude, lng: position.coords.longitude }
            const locationData = `Latitude: ${newLocation.lat}  -   Longitude: ${newLocation.lng} - Timestamp: ${Date()}`
            outputLocationData(locationData)
            redrawCircle(newLocation)
        });
    }
}



