const { Bme680 } = require('bme680-sensor');
const bme680 = new Bme680(1, 0x76);

let bmeSensorData = {}

const initBmeSensor = async () => {
    try{
        await bme680.initialize()
        console.info('Sensor initialized');
        bmeSensorData = await bme680.getSensorData()
        setInterval(async () => {
            bmeSensorData = await bme680.getSensorData()
        }, 60000);
    }
    catch(error){
        console.log(error)
        return error
    }

}

const getBmeSensorData = () => {
    const temperature = bmeSensorData?.data?.temperature || '_'
    const pressure = bmeSensorData?.data?.pressure || '_'
    const humidity = bmeSensorData?.data?.humidity || '_'
    const gasResistance = bmeSensorData?.data?.gas_resistance || '_'
    return {temperature, pressure, humidity, gasResistance}
}

module.exports = { initBmeSensor, getBmeSensorData }
