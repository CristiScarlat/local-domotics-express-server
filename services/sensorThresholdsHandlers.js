
const sensorJobs = {}

function setSensorJob(jobParams){
    sensorJobs[jobParams.relay] = {...jobParams}
    console.log(sensorJobs)
}

function runSensorJob(jobParams) {
    const relaysOnList = []
    console.log({jobParams, sensorJobs})
    const relaysList = Object.keys(sensorJobs)

    relaysList.forEach(r => {
        if(sensorJobs[r].temperature >= jobParams.temperature || sensorJobs[r].pressure >= jobParams.pressure || sensorJobs[r].humidity >= jobParams.humidity)relaysOnList.push(r)
    })
    return relaysOnList
}

function getSensorJobs() {
    return sensorJobs
}

module.exports = { setSensorJob, getSensorJobs, runSensorJob }