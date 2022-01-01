const Gpio = require('onoff').Gpio;

class RaspiIO {

    constructor(gpioList){
        this.initGPIOList = gpioList.map((gpioObj, index) => {
            return new Gpio(gpioObj.gpio,  gpioObj.mode)
        }) 
    }

    on(gpioNo) {
        const foundGPIO = this.initGPIOList.find(o => o._gpio === gpioNo)
        foundGPIO.writeSync(0)
    }

    off(gpioNo) {
        const foundGPIO = this.initGPIOList.find(o => o._gpio === gpioNo)
        foundGPIO.writeSync(1)
    }

    toggle(gpioNo) {
        console.log(gpioNo)
        const foundGPIO = this.initGPIOList.find(o => o._gpio === gpioNo)
        const status = foundGPIO.readSync()
        foundGPIO.writeSync(status === 1 ? 0 : 1)
    }

    readSync(gpioNo) {
        const foundGPIO = this.initGPIOList.find(o => o._gpio === gpioNo)
        return foundGPIO.readSync()
    }

    readAllSync() {
        return this.initGPIOList.map((gpioObj, index) => {
            return {gpio: gpioObj._gpio, state: gpioObj.readSync()}
        }) 
    }

    allOffSync() {
        this.initGPIOList.map((gpioObj, index) => {
            gpioObj.writeSync(1)
        }) 
    }

}

module.exports = RaspiIO