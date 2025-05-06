const apikey = `4c311859d8fc331f6224af801c900640`;

document.getElementById('search').addEventListener('click', function () {
    const cityName = document.getElementById('city').value.trim();

    if (!cityName) {
        alert("Please enter a city name.");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById('weather-info').innerHTML = `City not found. Please try again.`;
                return;
            }

            const weatherIconCode = data.weather[0].icon;
            const weatherImageUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;

            document.getElementById('weather-info').innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Condition: ${data.weather[0].description}</p>
            `;

            const icon = document.getElementById("weather-icon");
            if (icon) {
                icon.src = weatherImageUrl;
                console.log("Image URL set to:", weatherImageUrl);
            }
        })
        .catch(error => {
            console.log("Error:", error);
            document.getElementById('weather-info').innerHTML = `An error occurred. Please try again.`;
        });
});
