
const spin = {
    get: function(){
        return this.moveSpin.spin;
    },
    
    set: function(v){
        var spinSet = {}, currentValues=this.spin;
        if (typeof(v) !== 'object') {console.log('Argument for spin not object or array.');return false};
        if (typeof(v.length) === 'number') {
            if (v.length !== 3) {console.log('Argument for spin was array with wrong number of members.');return false};
            spinSet.x = v[0];
            spinSet.y = v[1];
            spinSet.z = v[2];
        } else {
            spinSet.x = v.x || currentValues.x;
            spinSet.y = v.y || currentValues.y;
            spinSet.z = v.z || currentValues.z;
        }
        
        var moveSet = this.moveSpin.move;
        this.moveSpin = [moveSet.x,moveSet.y,moveSet.z,moveSet.units,spinSet.x,spinSet.y,spinSet.z];
    }
} 

const move = {
    get: function(){
        return this.moveSpin.move;
    },
    
    set: function(v){
        var moveSet = {}, currentValues=this.move;				
        if (typeof(v) !== 'object') {console.log('Argument for move not object or array.');return false};
        if (typeof(v.length) === 'number') {
            if (v.length < 3) {console.log('Argument for move was array with wrong number of members.');return false};
            moveSet.x = v[0];
            moveSet.y = v[1];
            moveSet.z = v[2];
            moveSet.units = v[3] || currentValues.units;
        } else {
            moveSet.x = v.x || currentValues.x;
            moveSet.y = v.y || currentValues.y;
            moveSet.z = v.z || currentValues.z;
            moveSet.units = v.units || currentValues.units;
        }	
    
        var spinSet = this.moveSpin.spin;
        this.moveSpin = [moveSet.x,moveSet.y,moveSet.z,moveSet.units,spinSet.x,spinSet.y,spinSet.z];
    }
}

const moveSpin = {
    get: function(){
        var fullString = this.style.transform;
                
        var moveValues =  getValuefor('translate3d').split(", ");
        moveValues.push(pullLettersFrom(moveValues[0]));
        for (var i=0; i<3; i++) {
            moveValues[i] = pullNumberFrom(moveValues[i]);
        };
        var moveSet = {x:moveValues[0],y:moveValues[1],z:moveValues[2],units:moveValues[3]}
        
        var spinSet = {
            x:pullNumberFrom(getValuefor('rotateX')),
            y:pullNumberFrom(getValuefor('rotateY')),
            z:pullNumberFrom(getValuefor('rotateZ'))
        };
        
        return {move:moveSet,spin:spinSet};
        
        function getValuefor(param) {
            var pos1 = fullString.indexOf(param) + param.length +1 ;
            var pos2 = fullString.indexOf( ')',pos1 );
            return fullString.substring(pos1,pos2);
        };
        function pullNumberFrom (string) {
            var numString= "";
            for (var j = 0;j<string.length;j++) {
                if (Number(string[j])>=0 || string[j] === '-' || string[j] === '.') {numString += string[j]}
            };
            return Number(numString);
        };
        function pullLettersFrom (string) {
            var letterString= "";
            for (var j = 0;j<string.length;j++) {
                if ( isNaN(Number(string[j])) ) {
                    if ( string[j] !== '.' && string[j] !== '-' ) {
                        letterString += string[j]
                    };
                };
            };
            return letterString;
        }
    },
    
    set: function(v){
        if (typeof(v) !== 'object') {console.log('not object');return false};
        if (typeof(v.length) !== 'number') {console.log('not Array');return false};
        if (v.length !== 7) {console.log('wrong number of values');return false};
        
        // if a number is too small, gets expressed in 1.0125e-8 format
        // breaks the pullNumberFrom function in the getter
        for (var j=0; j<7; j++){
            if (v[j] < 0.001 && v[j] > -0.001 ) {v[j]=0} 
        }
        
        var moveSet = [v[0],v[1],v[2],v[3]];
        var spinSet = [v[4],v[5],v[6]];
        
        var moveString = `translate3d(${moveSet[0]}${moveSet[3]},${moveSet[1]}${moveSet[3]},${moveSet[2]}${moveSet[3]})`
        
        var spinString = "";
        spinString +=  ` rotateX(${spinSet[0]}deg)`;
        spinString +=  ` rotateY(${spinSet[1]}deg)`;
        spinString +=  ` rotateZ(${spinSet[2]}deg)`;
        
        this.style.transform = moveString + spinString;
        
    }
}

export {spin, move, moveSpin}