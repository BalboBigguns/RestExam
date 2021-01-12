const axios = require('axios').default;
const WeatherLog = require('./models/WeatherLog');

let interval = null;
let timeout = null;

const startWeatherService = (cities, timeIntervals, delay=0) => {
    setTimeout(() => {
        cities.forEach(fetchData);

        interval = setInterval(() => {
            cities.forEach(fetchData);
        }, timeIntervals);
    }, delay);
};

const stopWeatherService = () => {
    if (timeout) {
        clearTimeout(timeout);
    };

    if (interval) {
        clearInterval(interval);
    };
};

const fetchData = (city) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`)
    .then(async ({data}) => {
        const log = new WeatherLog({
            city: data.name,
            temperature: data.main.temp,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            precipitation: data.snow && data.snow['1h'] || data.rain && data.rain['1h'] || 0,
            wind_speed: data.wind.speed,
            wind_direction: data.wind.deg
        })

        try {
            const savedLog = await log.save();
            console.log("Log saved");
            console.log(savedLog);
        } catch(error) {
            console.log(error);
        }
    })
    .catch(error => {
        console.log(error);
    })
};

module.exports = {
    start: startWeatherService,
    stop: stopWeatherService
}