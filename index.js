mapboxgl.accessToken = 'pk.eyJ1IjoicmNvc3NpIiwiYSI6ImNramVvMWFsNzNlNnMyc25xZnhrdnE4NnYifQ.z0AZz2kc5jEXGPUO_f19tA';
navigator.geolocation.getCurrentPosition(
    successCallback, 
    errorCallback, 
    {enableHighAccuracy: true}
)

function successCallback(position) {
    console.log(position);
    setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorCallback() {
    let defaultLocation = [-0.127758, 51.507351];
    setupMap(defaultLocation);
}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 12
    });

    const nav = new mapboxgl.NavigationControl(options = {
        showCompass: true,
        showZoom: true,
        visualizePitch: true
    });
    map.addControl(nav, 'bottom-right')
    
    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric'
    });
    map.addControl(directions,'top-left');

    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');
    
    function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
    }
    
    for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
    }
}
