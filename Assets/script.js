function getWeather() {
    const apiKey = 'b06b06a80c5b29045729137315b77c66'
    const city = document.getElementById('city').Value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={apiKey}';
    const forecastUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={apiKey}';



    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather dats. Try again.');
        });


    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecase(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecasr data. Try again.');
        });
}

function displayWeather(data) {

    const currentCity = document.getElementById('current-city');
    const currentTemp = document.getElementById('current-temp');
    const currentWind = document.getElementById('current-wind');
    const currentHumidity = document.getElementById('current-humidity');
    const currentforecast = document.getElementById('current-forecast');

    currentCity.innerHTML = '';
    currentTemp.innerHTML = '';
    currentWind.innerHTML = '';
    currentHumidity.innerHTML = '';
    currentforecast.innerHTML = '';

    if (data.cod === '404') {
        currentCity.innerHTML = '<p>${data.message}</p>';
    } else {
        const cityName = data.name
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description;
        const iconcode = data.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHtml = '<p>${temperature} C</P>';
        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;


    
   



















