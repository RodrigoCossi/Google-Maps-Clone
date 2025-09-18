// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoicmNvc3NpIiwiYSI6ImNramVvMWFsNzNlNnMyc25xZnhrdnE4NnYifQ.z0AZz2kc5jEXGPUO_f19tA';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
});

function initializeMap() {
    // Check if geolocation is supported
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            successCallback, 
            errorCallback, 
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 600000
            }
        );
    } else {
        console.warn('Geolocation is not supported by this browser.');
        errorCallback();
    }
}

function successCallback(position) {
    console.log('Location found:', position);
    const userLocation = [position.coords.longitude, position.coords.latitude];
    setupMap(userLocation);
}

function errorCallback(error) {
    if (error) {
        console.warn('Geolocation error:', error.message);
    }
    // Default to London coordinates
    const defaultLocation = [-0.127758, 51.507351];
    console.log('Using default location: London');
    setupMap(defaultLocation);
}

function setupMap(center) {
    try {
        // Hide loading indicator
        const loadingElement = document.getElementById('loading');
        
        // Create map instance
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: 12,
            attributionControl: true
        });

        // Add loading event listeners
        map.on('load', function() {
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            console.log('Map loaded successfully');
        });

        map.on('error', function(e) {
            console.error('Map error:', e);
            if (loadingElement) {
                loadingElement.textContent = 'Error loading map. Please refresh the page.';
                loadingElement.style.color = '#dc3545';
            }
        });

        // Add marker for user location
        const marker = new mapboxgl.Marker({
            color: '#FF0000'
        })
            .setLngLat(center)
            .addTo(map);

        // Add navigation controls
        const nav = new mapboxgl.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: true
        });
        map.addControl(nav, 'bottom-right');

        // Add directions control
        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving'
        });
        map.addControl(directions, 'top-left');

        // Setup layer switching
        setupLayerSwitching(map);

        // Add scale control
        map.addControl(new mapboxgl.ScaleControl({
            maxWidth: 100,
            unit: 'metric'
        }));

        // Add fullscreen control
        map.addControl(new mapboxgl.FullscreenControl());

    } catch (error) {
        console.error('Error setting up map:', error);
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.textContent = 'Failed to initialize map. Please check your internet connection.';
            loadingElement.style.color = '#dc3545';
        }
    }
}

function setupLayerSwitching(map) {
    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');
    
    function switchLayer(layer) {
        const layerId = layer.target.id;
        try {
            map.setStyle('mapbox://styles/mapbox/' + layerId);
            console.log('Switched to style:', layerId);
        } catch (error) {
            console.error('Error switching map style:', error);
        }
    }
    
    // Add event listeners to radio buttons
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('click', switchLayer);
    }
}
