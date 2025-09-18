# Google Maps Clone

A fully functional Google Maps clone built with **Mapbox API** that provides an interactive mapping experience with modern web technologies.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://rodrigocossi.github.io/Google-Maps-Clone/)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![Google Maps Clone Screenshot](https://user-images.githubusercontent.com/59088238/169894152-94a3eb81-f373-497e-b593-fcfd4eaf05d4.png)

## ✨ Features

- 🗺️ **Interactive Map**: Full-featured map with zoom, pan, and navigation controls
- 📍 **Geolocation**: Automatically detects and centers on user's current location
- 🧭 **Navigation Controls**: Zoom in/out, compass, and 3D pitch visualization
- 🛣️ **Directions & Routing**: Get directions between any two points
- 🎨 **Map Styles**: Switch between different map styles (Streets and Satellite view)
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Loading**: Lightweight and optimized for quick loading

## 🚀 Live Demo

Experience the live demo here: **[https://rodrigocossi.github.io/Google-Maps-Clone/](https://rodrigocossi.github.io/Google-Maps-Clone/)**

> **Note:** The live demo will be automatically deployed via GitHub Pages when this pull request is merged to the main branch. The deployment process typically takes a few minutes to complete.

## 🏃‍♂️ How to Run Locally

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for loading Mapbox tiles and API)

### Option 1: Simple File Opening
1. **Clone the repository**:
   ```bash
   git clone https://github.com/RodrigoCossi/Google-Maps-Clone.git
   cd Google-Maps-Clone
   ```

2. **Open in browser**:
   - Simply double-click on `index.html`, or
   - Right-click on `index.html` → "Open with" → Select your browser

### Option 2: Local HTTP Server (Recommended)

For the best experience and to avoid any CORS issues:

#### Using Python (if you have Python installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (if you have Node.js installed):
```bash
# Install a simple HTTP server globally
npm install -g http-server

# Run the server
http-server
```

#### Using PHP (if you have PHP installed):
```bash
php -S localhost:8000
```

3. **Open your browser** and navigate to:
   - `http://localhost:8000` (or the port shown in your terminal)

## 🔧 Configuration

The application uses a Mapbox access token that's already configured. If you want to use your own token:

1. Sign up for a free account at [Mapbox](https://www.mapbox.com/)
2. Get your access token from the Mapbox dashboard
3. Replace the token in `index.js`:
   ```javascript
   mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN_HERE';
   ```

## 📁 Project Structure

```
Google-Maps-Clone/
├── index.html          # Main HTML file
├── index.js            # JavaScript functionality
├── index.css           # Styling and layout
└── README.md           # Documentation
```

## 🛠️ Technologies Used

- **[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)** - Modern mapping library
- **[Mapbox Directions API](https://docs.mapbox.com/api/navigation/directions/)** - Turn-by-turn directions
- **HTML5 Geolocation API** - User location detection
- **Vanilla JavaScript** - No frameworks, pure JS
- **CSS3** - Modern styling and responsive design

## 📱 Browser Compatibility

- ✅ Chrome 65+
- ✅ Firefox 58+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎯 Usage

1. **Allow Location Access**: When prompted, allow the app to access your location for the best experience
2. **Navigate the Map**: 
   - Click and drag to pan
   - Scroll to zoom in/out
   - Use the navigation controls in the bottom-right corner
3. **Get Directions**: 
   - Use the directions panel on the top-left
   - Click on the map to set start and end points
   - Follow the generated route
4. **Switch Map Styles**: Use the radio buttons in the bottom-right to switch between street and satellite views

## 🐛 Troubleshooting

### Common Issues

**Map not loading or showing blank screen:**
- Check your internet connection
- Ensure you're not using an ad blocker that might block Mapbox requests
- Try refreshing the page
- Check browser console for error messages

**Geolocation not working:**
- Make sure you allow location access when prompted
- Check if location services are enabled in your browser settings
- The app will fallback to London coordinates if geolocation fails

**Directions not working:**
- Ensure you have a stable internet connection
- Try clicking directly on the map to set waypoints
- Check if the Mapbox Directions API is accessible

### Browser Support
If you're experiencing issues, try using a supported browser version:
- Chrome 65+ ✅
- Firefox 58+ ✅  
- Safari 12+ ✅
- Edge 79+ ✅

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/RodrigoCossi/Google-Maps-Clone/issues).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Rodrigo Cossi**
- GitHub: [@RodrigoCossi](https://github.com/RodrigoCossi)

---

⭐ **If you found this project helpful, please give it a star!** ⭐
