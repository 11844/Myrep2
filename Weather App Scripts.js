document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const apiKey = 'rojIZyn6N0jYYRY3DQSk0dol1IuxbeFD'; 
    const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=rojIZyn6N0jYYRY3DQSk0dol1IuxbeFD`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const timelines = data.data.timelines;
            if (timelines && timelines.length > 0) {
                const weatherData = timelines[0].intervals[0].values;
                const weatherResult = document.getElementById('weather-result');
                weatherResult.innerHTML = `
                    <p><strong>City:</strong> ${city}</p>
                    <p><strong>Temperature:</strong> ${weatherData.temperature} °C</p>
                    <p><strong>Weather:</strong> ${weatherData.weatherCode}</p>
                    <p><strong>Humidity:</strong> ${weatherData.humidity} %</p>
                    <p><strong>Wind Speed:</strong> ${weatherData.windSpeed} m/s</p>
                `;
            } else {
                alert('Weather data not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Error fetching the weather data. Please try again later.');
        });
});
