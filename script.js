const locationText = document.getElementById("location");
const weatherText = document.getElementById("weather");
//STEP 1: Check if browser supports location
if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
} else{
    locationText.textContent = "Geolocation not supported by your browser.";
}
//STEP 2: If location found
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    locationText.textContent = 'Latitude: ${latitude}, Longitude: ${longitude}';
    getWeather (latitude, longitude);
}
//STEP 3:If location fails
function error() {
    locationText.textContent = "Unable to retrieve your location";
}
//STEP 4: Fetch weather data
function getWeather(lat, lon) {
    const apiKey = "a567c82272ce8695c76a2ea2620c3";
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}';
    fetch(url)
       .then(response => response.json())
       .then(data => {
         const city = data.name;
         const temp = data.main.temp;
         const description = data.weather[0].description;
         weatherText.textContent =
             '📍 ${city} | 🌡️ ${temp} degrees celsius | ☁️ {description}';
       })
        .catch(() => {
            weatherText.textContent = "Cloud not load weather data.";
        });
    }
