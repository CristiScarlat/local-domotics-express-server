const express = require('express')
const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
const { networkInfo } = require('./services/osInfo');
const { getForecastFiveDays, getWeather } = require('./services/openWeather');

const app = express()

const PORT = 5000

app.use(express.static(__dirname + '/public'))

app.set('view engine', 'nunj')

nunjucks.configure('./views', {
    autoescape: true,
    express: app
})

app.get('/weather', async (req, res) => {
    const log = `${new Date().toLocaleString()} - get weather.\n`
    fs.appendFile(path.resolve('logs/logs.txt'), log, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    weatherAPIRes = await getWeather()

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
    //const bmeSensorData = await getBmeSensorData()
    //if (idTick) clearInterval(idTick)
    const netInfo = networkInfo()
    const networkDevices = []
    Object.keys(netInfo).forEach(k => {
        networkDevices.push(`${k}: ${netInfo[k]}`)
    })

    res.status(200)
    res.render('home.html', { networkDevices })
})

//////start web server//////////////////
app.listen(PORT, () => {
    console.log('API is ready on port = ' + PORT)
})