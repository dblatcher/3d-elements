function GradualMover(target) {

	let orderList = [{
		destination:{move:target.move, spin:target.spin},
		status:'start'
	}]

	function moveAndSpinOverTime (destination,timing = {}){
		var startingPosition = target.move;
		var startingRotation = target.spin;
		
	
		// convert destination properties to object if array
		var property = ['move','spin','moveBy','spinBy'];
		for (var j = 0; j<property.length; j++) {
			if (destination[property[j]]) {
				if (destination[property[j]].length) {
					destination[property[j]] = {x:destination[property[j]][0],y:destination[property[j]][1],z:destination[property[j]][2]}
				}
			}
		}
		
		
		var displacement = destination.move ? 
			{x: typeof(destination.move.x) === 'number' ? destination.move.x - startingPosition.x : 0,
			 y: typeof(destination.move.y) === 'number' ? destination.move.y - startingPosition.y : 0,
			 z: typeof(destination.move.z) === 'number' ? destination.move.z - startingPosition.z : 0} : 
			{x:0,y:0,z:0};	
		if (destination.moveBy) { 
			if (typeof(destination.moveBy.x) === 'number') {displacement.x = destination.moveBy.x}
			if (typeof(destination.moveBy.y) === 'number') {displacement.y = destination.moveBy.y}
			if (typeof(destination.moveBy.z) === 'number') {displacement.z = destination.moveBy.z}	
		}
		
		var rotation = destination.spin ? 
			{x:typeof(destination.spin.x) === 'number' ? destination.spin.x - startingRotation.x : 0,
			y: typeof(destination.spin.y) === 'number' ? destination.spin.y - startingRotation.y : 0,
			z: typeof(destination.spin.z) === 'number' ? destination.spin.z - startingRotation.z : 0} :
			{x:0,y:0,z:0};
		if (destination.spinBy) { 
			 rotation.x = (typeof(destination.spinBy.x) === 'number') ? destination.spinBy.x : 0
			rotation.y = (typeof(destination.spinBy.y) === 'number') ? destination.spinBy.y :0
			rotation.z = (typeof(destination.spinBy.z) === 'number') ? destination.spinBy.z :0
		};
		
		
		var steps = 100;
		if (timing.duration) {steps = timing.duration};
		if (timing.speed) {
			var magnitude = Math.sqrt ( displacement.x*displacement.x + displacement.y*displacement.y + displacement.z*displacement.z );
			steps = Math.floor(magnitude/timing.speed)
		};
		if (timing.turn) {
			var magnitude = Math.sqrt ( rotation.x*rotation.x + rotation.y*rotation.y + rotation.z*rotation.z );
			steps = Math.floor(magnitude/timing.turn)
		};
		
		var moveIncrement = {x:displacement.x/steps, y:displacement.y/steps, z:displacement.z/steps}
		var spinIncrement = {x:rotation.x/steps, y:rotation.y/steps, z:rotation.z/steps}
		
		var marker = {destination:destination, status:'pending'};
		orderList.push(marker);
		
		return new Promise(function(resolve,reject) {
			target.timer = setTimeout(function(){makeStep(steps)},10);
			function makeStep(step) {
				var currentPosition = target.move;
				var currentRotation = target.spin;
				if (step > 0) { //last step happens after the rounding
					target.move = [currentPosition.x+moveIncrement.x,currentPosition.y+moveIncrement.y,currentPosition.z+moveIncrement.z,currentPosition.units];
					target.spin = [currentRotation.x+spinIncrement.x,currentRotation.y+spinIncrement.y,currentRotation.z+spinIncrement.z];
				};
				if (target.timer == -1) {
					marker.status = 'stopped';
					resolve({move:target.move, spin:target.spin, result:'stopped'});
					step = 0;
					return;
				};
				if (step > 0) {
					step--;
					target.timer = setTimeout(function(){makeStep(step)},10);
				} else {
					target.timer = setTimeout(function(){
						// correct for 'rounding' from the increments
						target.move = {
							x: startingPosition.x + displacement.x,
							y: startingPosition.y + displacement.y,
							z: startingPosition.z + displacement.z,
						};
						target.spin = {
							x: startingRotation.x + rotation.x,
							y: startingRotation.y + rotation.y,
							z: startingRotation.z + rotation.z,
						};
						marker.status = 'finished';
						resolve({move:target.move, spin:target.spin, result:'finished'});				
					},10)
					
				}
			};		
			
		});
		
	}
	
	function spinOverTime (rotation, rotationIsAbsolute=false, timeValue=0, timeValueIsAbsolute=false) {
		let destination = rotationIsAbsolute ? {spin:rotation} : {spinBy:rotation};
		let timing = timeValueIsAbsolute ? {duration:timeValue} : {turn:timeValue};
		return moveAndSpinOverTime(destination,timing)
	}
	
	function isMoving(){
		for (var i = 0; i < orderList.length; i++) {
			if (orderList[i].status == 'pending') {return true};
		}
		return false;
	}
	
	this.spin = spinOverTime
	this.moveAndSpin = moveAndSpinOverTime
	this.isMoving = isMoving

	Object.defineProperty(this,'orderList',{
		get: function(){return orderList}
	})

}


export {GradualMover}