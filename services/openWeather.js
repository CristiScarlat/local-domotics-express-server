const axios = require('axios')

const formatData = (data) => {
    const forecastList = [...data.list];
    const sortedByDateList = [];
    let tempGroup = [];
    forecastList.forEach((obj, index) => {
        if(index!==0 ){
            const currentObjDate = obj.dt_txt.split(' ')[0]
            const prevObjDate = tempGroup[tempGroup.length-1].dt_txt.split(' ')[0]
            if(currentObjDate === prevObjDate)tempGroup.push(obj)
            else {
                sortedByDateList.push(tempGroup)
                tempGroup = []
                tempGroup.push(obj)
            }
        }
        if(index === 0){
            tempGroup.push(obj);
        }
    })

    return sortedByDateList
    
}

const getWeather = async () => {
    console.log(process.env.OPENWEATHER_APP_APIKEY)
    const appId = process.env.OPENWEATHER_APP_APIKEY;
    const city = "timisoara";
    const units = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=${units}`;
    try{
        return await axios.get(url);
    } 
    catch(error) {
        return error
    }
}

//https://api.openweathermap.org/data/2.5/weather?q=timisoara&appid=process.env.OPENWEATHER_APP_APIKEY&units=metric

const getForecastFiveDays = async () => {
    const appId = process.env.OPENWEATHER_APP_APIKEY;
    const city = "timisoara";
    //const units = "metric"
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appId}&units=${units}`;
    try{
        const forecastData = await axios.get(url);
        return formatData(forecastData.data)
    }
    catch(error) {
        return error
    }
}



module.exports = { getForecastFiveDays, getWeather }
