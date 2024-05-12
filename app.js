const apiKey = '1db902b08ed6c1da09f1985dbeb81edb';
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const hourlyWeather = document.getElementById('hourlyWeather');
const dailyWeather = document.getElementById('dailyWeather');

function searchWeather() {
    const cityName = cityInput.value.trim();
    if (cityName === '') {
        alert('Please enter a city name.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const { main, weather } = data;
            const temp = main.temp;
            const weatherDesc = weather[0].description;
            const icon = weather[0].icon;

            // Update background based on weather
            updateBackground(icon);

            // Display weather info
            weatherInfo.innerHTML = `
                <h2>${cityName}</h2>
                <p>Temperature: ${temp}°C</p>
                <p>Weather: ${weatherDesc}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data.');
        });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const hourlyForecast = data.list.slice(0, 8); // Next 8 hours
            const dailyForecast = data.list.filter(item => item.dt_txt.includes('12:00:00')); // Daily forecast at 12 PM

            // Display hourly forecast
            hourlyWeather.innerHTML = '<h3>Hourly Forecast</h3>';
            hourlyForecast.forEach(forecast => {
                const time = forecast.dt_txt.split(' ')[1];
                const temp = forecast.main.temp;
                hourlyWeather.innerHTML += `<p>${time}: ${temp}°C</p>`;
            });

            // Display daily forecast
            dailyWeather.innerHTML = '<h3>Daily Forecast</h3>';
            dailyForecast.forEach(day => {
                const date = new Date(day.dt * 1000);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                const temp = day.main.temp;
                dailyWeather.innerHTML += `<p>${dayName}: ${temp}°C</p>`;
            });
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Failed to fetch forecast data.');
        });
}

function updateBackground(icon) {
    const body = document.body;
    switch (icon) {
        case '01d':
            body.style.backgroundImage = 'url("https://i.makeagif.com/media/4-05-2016/utmjeB.gif")';
            break;
        case '01n':
            body.style.backgroundImage = 'url("https://c1.wallpaperflare.com/preview/442/55/584/sunset-landscape-nature-sunny.jpg")';
            break;
        case '02d':
        case '03d':
        case '04d':
            body.style.backgroundImage = 'url("https://i.makeagif.com/media/4-15-2015/EYjkwe.gif")';
            break;
        case '02n':
        case '03n':
        case '04n':
            body.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2021/10/15/14/44/sky-6712751_640.jpg")';
            break;
        case '09d':
        case '10d':
        case '11d':
            body.style.backgroundImage = 'url("https://i.pinimg.com/originals/e1/b4/a6/e1b4a60876593bc5c849b2a8e9029bec.gif")';
            break;
        case '09n':
        case '10n':
        case '11n':
            body.style.backgroundImage = 'url("https://png.pngtree.com/background/20230607/original/pngtree-rainy-night-sky-with-a-small-light-at-the-bottom-picture-image_2902401.jpg")';
            break;
        case '50d':
        case '50n':
            body.style.backgroundImage = 'url("https://4.bp.blogspot.com/-H2y2KH2cVa0/XBwbOmRNSII/AAAAAAAABbE/lnIDSSGY21Qj5w7zOHLMTVsrcFuJguCDQCLcBGAs/s640/tumblr_nn86gouEZC1rz8mvdo1_400.gif")';
            break;
            case '13d':
            case '13n':
                body.style.backgroundImage = 'url("https://4.bp.blogspot.com/-H2y2KH2cVa0/XBwbOmRNSII/AAAAAAAABbE/lnIDSSGY21Qj5w7zOHLMTVsrcFuJguCDQCLcBGAs/s640/tumblr_nn86gouEZC1rz8mvdo1_400.gif")';
                break;
            case '03d':
            case '03n':
                body.style.backgroundImage = 'url("https://i.makeagif.com/media/4-26-2017/eTBCqD.gif")';
                    break;

        default:
            body.style.backgroundImage = 'url("https://i.redd.it/h1dpe0ljfb271.jpg")';
            break;
    }
}


gsap.from('.logo',{opacity: 0, duration: 1, delay:1, y:30, stagger:0.2})
gsap.from('.card',{opacity: 0, duration: 1, delay:1.5, y:30, stagger:0.2})
gsap.from('.card-2',{opacity: 0, duration: 1, delay:2, y:30, stagger:0.2})
