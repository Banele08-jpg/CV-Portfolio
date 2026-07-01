const weatherText = document.getElementById("weather");
// Make sure to select locationText if it's a separate element in your HTML
const locationText = document.getElementById("location") || weatherText; 

// STEP 1: Check if browser supports location
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    locationText.textContent = "Geolocation not supported by your browser.";
}

// STEP 2: If location found
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    // Fixed: Changed single quotes to backticks
    locationText.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
    getWeather(latitude, longitude);
}

// STEP 3: If location fails
function error() {
    locationText.textContent = "Unable to retrieve your location";
}

// STEP 4: Fetch weather data
function getWeather(lat, lon) {
    const apiKey = "5b218b55252bfb3802a19fa26aefc94f";
    
    // Fixed: Changed single quotes to backticks and fixed ${apiKey} casing
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    fetch(url)
       .then(response => response.json())
       .then(data => {
            const city = data.name;
            const temp = data.main.temp;
            const description = data.weather[0].description;
            
            // Fixed: Changed single quotes to backticks and added missing $ to description
            weatherText.textContent = `📍 ${city} | 🌡️ ${temp}°C | ☁️ ${description}`;
       })
       .catch(() => {
         console.log(error);
         weatherText.textContent = "Could not load weather data";
       });
}