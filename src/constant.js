function ConstantSpinner (target) {

    let timerIndex
    const turnVector = {x:0, y:1, z:-5}

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

    return {
        turnVector, go, stop
    }
}

export {ConstantSpinner}