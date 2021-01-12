require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`DB connection details: host - ${mongoose.connection.host}, port - ${mongoose.connection.port}`);
        console.log(`Connection state: ${mongoose.STATES[mongoose.connection.readyState]}`);

        // Run the weather data service
        const weatherService = require('./weatherService');
        const managedCities = ['lodz', 'warszawa', 'wroclaw', 'szczecin', 'rzeszow', 'krakow', 'gdansk', 'suwalki'];
        // Collects data every hour
        weatherService.start(managedCities, 1000*60*60);
        // Start
        app.listen(8080);
    })
    .catch(err => {
        console.log(`Error: ${err}`);
        console.log(`Connection state: ${mongoose.STATES[mongoose.connection.readyState]}`);
    });

