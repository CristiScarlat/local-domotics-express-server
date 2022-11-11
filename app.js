
const cors = require('cors')
const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
const { networkInfo } = require('./services/osInfo');
const { getForecastFiveDays, getWeather } = require('./services/openWeather');
const { getDHTSensorData } = require('./services/sensor');
require('dotenv').config();
const express = require('express');

const PORT = 5000
const app = express();

app.use(cors());

app.use(express.static(__dirname + '/public'))

app.set('view engine', 'nunj')

nunjucks.configure('./views', {
    autoescape: true,
    express: app
})

let currentWeather = {};


const getCurrentWeather = () => {
    getWeather()
    .then(weatherAPIRes => {
        currentWeather = {
            city: weatherAPIRes.data.name,
            temperature: weatherAPIRes.data.main.temp,
            pressure: weatherAPIRes.data.main.pressure,
            humidity: weatherAPIRes.data.main.humidity,
            weatherIcon: `http://openweathermap.org/img/wn/${weatherAPIRes.data.weather[0].icon}@2x.png`,
            weatherDescription: weatherAPIRes.data.weather[0].description
        }
        console.log(currentWeather);
    })
    .catch(error => {
        currentWeather = {};
        const log = `${new Date().toLocaleString()} - get-weather-error: ${error}.\n`;
        fs.appendFile(path.resolve('logs/logs.txt'), log, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    })
}

getCurrentWeather();
setInterval(getCurrentWeather, 60 * 60 * 1000);

let DHTdata = {};

DHTdata = getDHTSensorData();
setInterval(() => {
    DHTdata = getDHTSensorData()
}, 60000);

app.get('/weather', async (req, res) => {
    let log = null
    try{
        weatherAPIRes = await getWeather()
        log = `${new Date().toLocaleString()} - get weather.\n`
    }
    catch(error){
        log = `${new Date().toLocaleString()} - get-weather-error: ${error}.\n`
        console.error(error)
    }

    fs.appendFile(path.resolve('logs/logs.txt'), log, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    const currentWeather = {
        city: weatherAPIRes.data.name,
        temperature: weatherAPIRes.data.main.temp,
        pressure: weatherAPIRes.data.main.pressure,
        humidity: weatherAPIRes.data.main.humidity,
        weatherIcon: weatherAPIRes.data.weather[0].icon,
        weatherDescription: weatherAPIRes.data.weather[0].description
    }
    res.status(200);
    res.json(currentWeather);
})

app.get('/', async (req, res) => {
    
    /////////////////////////////////////////////
    const netInfo = networkInfo()
    const networkDevices = []
    Object.keys(netInfo).forEach(k => {
        networkDevices.push(`${k}: ${netInfo[k]}`)
    })

    res.status(200)
    res.render('home.html', { networkDevices, currentWeather, DHTdata })
})

//////start web server//////////////////
app.listen(PORT, () => {
    console.log('API is ready on port = ' + PORT)
})
