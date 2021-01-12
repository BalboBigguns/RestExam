const mongoose = require("mongoose");


const WeatherLogSchema = mongoose.Schema({
    city: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    temperature: {
        type: Number,
        require: true
    },
    pressure: {
        type: Number,
        require: true
    },
    humidity: {
        type: Number,
        require: true
    },
    precipitation: {
        type: Number,
        require: true
    }, 
    wind_speed: {
        type: Number,
        require: true
    },
    wind_direction: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('WeatherLog', WeatherLogSchema);