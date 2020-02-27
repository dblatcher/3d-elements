import * as timedFunctions from './gradual'

const spinPropertyObject = {
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

const movePropertyObject = {
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

const moveSpinPropertyObject = {
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

function makeBaseE3d(parameters={}) {
    let that= document.createElement('figure')

    parameters.size = parameters.size  || [10,10,10];
    if (typeof(parameters.size) === 'string') {parameters.size = parameters.size.trim().split(' ')};
    if (typeof(parameters.size) === 'number') {parameters.size = [parameters.size,parameters.size,parameters.size]};
    
    parameters.spin = parameters.spin  || [0,0,0];
    if (typeof(parameters.spin) === 'string') {parameters.spin = parameters.spin.trim().split(' ')};
    
    parameters.move = parameters.move  || [0,0,0, 'px'];
    if (typeof(parameters.move) === 'string') {parameters.move = parameters.move.trim().split(' ')};
    if (parameters.move.length<4) {parameters.move[3] = 'px'};
    
    parameters.faceClass = parameters.faceClass  || [];
    if (typeof(parameters.faceClass) === 'string'){parameters.faceClass = parameters.faceClass.trim().split(" ")};
    
    that.arg = {
        size:parameters.size,
        units:parameters.units  ||'px',
        faceClass:parameters.faceClass,
        classRule: 'all',
        addContentToFace:parameters.addContentToFace
    };

    var t = {
        mx: '' + parameters.move[0] + parameters.move[3],
        my: '' + parameters.move[1] + parameters.move[3],
        mz: '' + parameters.move[2] + parameters.move[3],
        sx: parameters.spin[0],
        sy: parameters.spin[1],
        sz: parameters.spin[2]
    };
    
    that.style.transformStyle = "preserve-3d";
    that.style.transform = '';
    that.style.transform += "translate3d(" + t.mx + ", " + t.my + ", " + t.mz + ")" ;
    that.style.transform += "rotateX(" + t.sx + "deg) rotateY(" + t.sy + "deg) rotateZ(" + t.sz + "deg)";
    that.style.width = "" + that.arg.size[0] + that.arg.units;
    that.style.height = "" + that.arg.size[1] + that.arg.units;
    that.style.margin = 0;
    that.style.display=

    Object.defineProperty (that,'spin',spinPropertyObject)
    Object.defineProperty (that,'move', movePropertyObject)
    Object.defineProperty (that, 'moveSpin',moveSpinPropertyObject)

    that.moveAndSpinOverTime = timedFunctions.moveAndSpinOverTime
    that.isMoving = timedFunctions.isMoving
    that.spinOverTime = timedFunctions.spinOverTime

    return that
}


function putRightNumberOfFacesOn (parentShape, numberOfFaces) {
    var faceClass = parentShape.arg.faceClass;
    var classRule = parentShape.arg.classRule;
    var addContentToFace = parentShape.arg.addContentToFace;
    
    for (var f=0; f<numberOfFaces; f++) {
        if (parentShape.childElementCount <= f ) {
            parentShape.appendChild(document.createElement('div'));
            if (typeof(addContentToFace) === 'function') {
                addContentToFace(parentShape.children[f],f)
            };
            if (typeof(addContentToFace) === 'string') {
                parentShape.children[f].innerHTML = addContentToFace;
            };
        }
        putNeccesaryStylesOnFace(parentShape.children[f]);
        if (
        (classRule == 'all') ||
        (classRule == 'blank' &&  parentShape.children[f].classList.length == 0 )
        ){
            faceClass.forEach(function(fc){
                parentShape.children[f].classList.add(fc)
            })
        };
    };
    
    function putNeccesaryStylesOnFace(face) {
        face.style.position = "absolute";
        face.style.transformStyle = "preserve-3d";
        face.style.boxSizing = "border-box";
        face.style.backfaceVisibility = "hidden";	
        face.style.msBackfaceVisibility  = "hidden";
        face.style.WebkitBackfaceVisibility  = "hidden";		
        face.style.MozBackfaceVisibility  = "hidden";			
        face.style.MozBackfaceVisibility  = "hidden";					
        face.style.visibility = 'visible';
            
    };
};

function setTransformWithAllPrefixes (targetElement,value) {
    targetElement.style.webkitTransform = value;
    targetElement.style.MozTransform = value;
    targetElement.style.msTransform = value;
    targetElement.style.OTransform = value;
    targetElement.style.transform = value;
};	


function clipFace (face, points) {
    var svgString = '', 
    pathString = '', 
    styleString='', 
    clipString = 'polygon(', 
    color, 
    width, 
    dashArrayString;
            
    for (var dot=0; dot<points.length; dot++){
        if (dot === 0) {pathString += "M"} else {pathString += "L"};
        pathString += `${points[dot][0]} ${points[dot][1]} `;
        clipString += `${points[dot][0]}% ${points[dot][1]}%`;
        if (dot !== points.length-1) {clipString += ','}
    }
    pathString += "Z";
    clipString += ")";
    
    // elements created from JS (not defined in HTML) are in no document so have no computed style 
    // the elements (not just the face child- that breaks the structure) are 'dipped' into the dom to getComputedStyle
    // copy the values needed into an object, then remove element from the document again.
    // doing this with element defined in HTML causes "TypeError: Cannot redefine property" because the customElement constructor is rerun
    
    var cStyle, cStyleValues={}, valuesNeeded = [], faceDefinedInHTML;
    valuesNeeded.push('border-top-color','border-color','border-width','border-top-width','border-style','border-top-style');
    if (face.parentElement.parentElement){faceDefinedInHTML = true} else{faceDefinedInHTML = false}; 

    if (!faceDefinedInHTML) {document.body.appendChild(face.parentElement);}
    cStyle=getComputedStyle(face);
    for (var j=0; j<valuesNeeded.length; j++) {
        cStyleValues[valuesNeeded[j]] = cStyle[valuesNeeded[j]]
    };	
    if (!faceDefinedInHTML) {document.body.removeChild(face.parentElement);}
    
    color = cStyleValues['border-color'] || cStyleValues['border-top-color'] || 'rgb(0,0,0)';
    width = cStyleValues['border-width'] || cStyleValues['border-top-width'] || '1px';
    
    switch(cStyleValues['border-style'] || cStyleValues['border-top-style']){
        case 'dotted':
            dashArrayString = "1";break;
        case 'dashed':
            dashArrayString = "4 2";break;
        case 'solid':
            dashArrayString = "";break;
        default:
            dashArrayString = "";
    }
    
    styleString = `stroke:${color}; stroke-width:${width};`;
    
    svgString += '<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"'
    svgString += 'style="z-index:-1; pointer-events: none; position:absolute;left:0px;top:0px">';
    svgString += '<path ';
    svgString += 'stroke-dasharray="' + dashArrayString + '"';
    svgString += 'style ="' + styleString + '"';
    svgString += 'd = "' + pathString + '"';
    svgString += 'fill-opacity = "0"/>';
    svgString += '/>';
    svgString += '</svg>';

    face.style.clipPath= clipString;
    face.innerHTML += svgString;
    
};	


export {setTransformWithAllPrefixes, putRightNumberOfFacesOn, makeBaseE3d, clipFace}