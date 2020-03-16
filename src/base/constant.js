function ConstantSpinner (target) {

    let timerIndex
    const turnVector = {x:0, y:0, z:1}

    function turn () {
        target.spin = {
            x:target.spin.x + turnVector.x,
            y:target.spin.y + turnVector.y,
            z:target.spin.z + turnVector.z,
        }
    }

    function go() {
        timerIndex = window.setInterval(turn,50)
    }

    function stop() {
        window.clearInterval(timerIndex)
    }


    this.turnVector=turnVector
    this.go=go
    this.stop=stop

}

export {ConstantSpinner}