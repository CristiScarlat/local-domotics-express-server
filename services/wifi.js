var Wifi = require('rpi-wifi-connection');
var wifi = new Wifi();

async function scanWifi(){
    try{
        const ssidList = await wifi.scan()
        console.log(ssidList)
        return ssidList
    }
    catch(error){
        console.log(error)
        return error
    }
}
 

module.exports = { scanWifi }