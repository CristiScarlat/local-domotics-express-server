const CronJob = require('cron').CronJob;

let jobs = []

function createCronJob(id, relayCron, relayTaskCron, cronTime, onTick, onComplete, start, timezone, context, runOnInit, unrefTimeout) {
    const job = new CronJob(cronTime, onTick, onComplete, start, timezone, context, runOnInit, unrefTimeout);
    jobs.push({id, relayCron, job, relayTaskCron});
}

function getJobs() {
    const relayTaskMap = {
        relayOnCron: 'on',
        relayOffCron: 'off',
        relayToggleCron: 'toggle'
    }
    return jobs.map(j => {
        return {id: j.id, relay: j.relayCron, relayTask: relayTaskMap[j.relayTaskCron], running: j.job.running || false, cronTime: j.job.cronTime.source || ''}
    })
}

function startJob(id){
    const jobToStart = jobs.find(j => j.id === id);
    if(jobToStart)jobToStart.job.start();
}

function stopJob(id){
    const jobToStop = jobs.find(j => j.id === id);
    if(jobToStop)jobToStop.job.stop();
}

function deleteJob(id){
    console.log(id)
    stopJob(id)
    const newJobs = jobs.filter(j => j.id !== id)
    jobs = newJobs


}

module.exports = { createCronJob, startJob, stopJob, getJobs, deleteJob }