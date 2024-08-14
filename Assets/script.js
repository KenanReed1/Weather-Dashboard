const apiKey = 'b06b06a80c5b29045729137315b77c66';
const city = document.getElementById('city').Value;

const elements = {
    cityInput: document.getElementById('city'),
    currentCity: document.getElementById('current-city'),
    currentTemp: document.getElementById('current-temp'),
    currentWind: document.getElementById('current-wind'),
    currentHumidity: document.getElementById('current-humidity'),
    forecastContainer: document.getElementById('forecast')
};



function fetchWeatherDataByCity(city) {
    const currentWeatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={apiKey}';
    const forecastUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={apiKey}';

    return Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl)
    ])
    .then(([weatherResponse, forecastResponse]) => {
        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error('Failed to fetch data');
        }
        return Promise.all([weatherResponse.json(), forecastResponse.json()]);
    })
    .then(([weatherData, forecastData]) => {
        return { weatherData, forecastData };
    })
    .catch(error => {
        console.error('Error fetching the weather data:', error);
        alert('Could not fetch the weather data. Please try again.');
    });
}
function updateCurrentWeather(weatherData) {
    const { name, main, wind } = weatherData;
    elements.currentCity.innerText = `${name} (${new Date().toLocaleDateString()})`;
    elements.currentTemp.innerText = `Temp: ${main.temp} °F`;
    elements.currentWind.innerText = `Wind: ${wind.speed} MPH`;
    elements.currentHumidity.innerText = `Humidity: ${main.humidity} %`;
}

function updateForecast(forecastData) {
    elements.forecastContainer.innerHTML = '';  // Clear previous forecast
    const forecastList = forecastData.list;

    for (let i = 0; i < forecastList.length; i += 8) {  // Every 8th item represents a day
        const forecast = forecastList[i];
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('card', 'mb-2');
        forecastCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${new Date(forecast.dt_txt).toLocaleDateString()}</h5>
                <p class="card-text">Temp: ${forecast.main.temp} °F</p>
                <p class="card-text">Wind: ${forecast.wind.speed} MPH</p>
                <p class="card-text">Humidity: ${forecast.main.humidity} %</p>
            </div>
        `;
        elements.forecast.appendChild(forecastCard);
    }
}
function getWeather() {
    const city = elements.cityInput.value.trim();

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    fetchWeatherDataByCity(city).then(weatherData => {
        if (weatherData) {
            updateCurrentWeather(weatherData.weatherData);
            updateForecast(weatherData.forecastData);
        }
    });
}






