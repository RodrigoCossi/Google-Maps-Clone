// Check if Mapbox GL JS is loaded
function isMapboxLoaded() {
    return typeof mapboxgl !== 'undefined' && mapboxgl.Map;
}

// Set Mapbox access token only if mapboxgl is available
function setMapboxToken() {
    if (typeof mapboxgl !== 'undefined') {
        mapboxgl.accessToken = 'pk.eyJ1IjoicmNvc3NpIiwiYSI6ImNramVvMWFsNzNlNnMyc25xZnhrdnE4NnYifQ.z0AZz2kc5jEXGPUO_f19tA';
        return true;
    }
    return false;
}

// Initialize the application with retry logic
function tryInitialize() {
    // Check if Mapbox failed to load from all sources
    if (window.mapboxLoadFailed) {
        showError('Failed to load map resources from all sources. This may be due to network issues or ad-blockers blocking Mapbox. Please check your internet connection and disable ad-blockers for this site.');
        return;
    }
    
    // Check if Mapbox is available
    if (!isMapboxLoaded()) {
        // Wait a bit more for potential fallback loading
        setTimeout(tryInitialize, 1000);
        return;
    }
    
    // Set token and initialize
    if (setMapboxToken()) {
        initializeMap();
    } else {
        showError('Failed to configure map. Please refresh the page.');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Give some time for scripts to load, then try to initialize
    setTimeout(function() {
        tryInitialize();
    }, 500);
});

function showError(message) {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.textContent = message;
        loadingElement.style.color = '#dc3545';
        loadingElement.style.maxWidth = '400px';
        loadingElement.style.textAlign = 'center';
        loadingElement.style.lineHeight = '1.4';
        loadingElement.style.padding = '20px';
        loadingElement.style.backgroundColor = '#f8f9fa';
        loadingElement.style.border = '1px solid #dee2e6';
        loadingElement.style.borderRadius = '8px';
        loadingElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
}

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
        // Verify Mapbox is still available
        if (!isMapboxLoaded()) {
            throw new Error('Mapbox GL JS is not available');
        }

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
            showError('Error loading map. This could be due to network issues, ad-blockers, or an invalid Mapbox token. Please refresh the page or check your internet connection.');
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

        // Add directions control (with error handling)
        try {
            if (typeof MapboxDirections !== 'undefined') {
                const directions = new MapboxDirections({
                    accessToken: (typeof mapboxgl !== 'undefined') ? mapboxgl.accessToken : '',
                    unit: 'metric',
                    profile: 'mapbox/driving'
                });
                map.addControl(directions, 'top-left');
            } else {
                console.warn('Mapbox Directions plugin not available');
            }
        } catch (directionsError) {
            console.warn('Failed to load directions control:', directionsError);
        }

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
        showError('Failed to initialize map. This may be due to network issues, ad-blockers blocking Mapbox resources, or an invalid access token. Please check your internet connection and try again.');
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
