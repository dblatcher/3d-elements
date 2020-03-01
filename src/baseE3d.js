import * as timedFunctions from './gradual'
import * as propertyMethods from './propertyMethods';

function makeBaseE3d(parameters={}) {
    let that= document.createElement('figure')
    that.setAttribute('e3d-shape','base')

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
    
    that.style.transform = '';
    that.style.transform += "translate3d(" + t.mx + ", " + t.my + ", " + t.mz + ")" ;
    that.style.transform += "rotateX(" + t.sx + "deg) rotateY(" + t.sy + "deg) rotateZ(" + t.sz + "deg)";
    that.style.width = "" + that.arg.size[0] + that.arg.units;
    that.style.height = "" + that.arg.size[1] + that.arg.units;

    Object.defineProperty (that,'spin',propertyMethods.spin)
    Object.defineProperty (that,'move', propertyMethods.move)
    Object.defineProperty (that, 'moveSpin',propertyMethods.moveSpin)

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
            }
            else if (typeof(addContentToFace) === 'string') {
                parentShape.children[f].innerHTML = addContentToFace;
            }
            else if (Array.isArray(addContentToFace)) {
                addContentToFace.forEach(rule => {
                    if (typeof(rule) === 'function') {
                        rule(parentShape.children[f],f)
                    }
                    else if (typeof(rule) === 'string') {
                        parentShape.children[f].innerHTML += rule;
                    }
                })
            }
        }
        parentShape.children[f].setAttribute('e3d-face','true')
        if (
        (classRule == 'all') ||
        (classRule == 'blank' &&  parentShape.children[f].classList.length == 0 )
        ){
            faceClass.forEach(function(fc){
                parentShape.children[f].classList.add(fc)
            })
        };
    };

};

function setTransformWithAllPrefixes (targetElement,value) {
    targetElement.style.webkitTransform = value;
    targetElement.style.MozTransform = value;
    targetElement.style.msTransform = value;
    targetElement.style.OTransform = value;
    targetElement.style.transform = value;
};	


function applySVG (face, points) {
    face.setAttribute('e3d-face','with-svg')
    let pathString = '';   

    for (var dot=0; dot<points.length; dot++){
        if (dot === 0) {pathString += "M"} else {pathString += "L"};
        pathString += `${points[dot][0]} ${points[dot][1]} `;
    }
    pathString += "Z";
    
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute('width','100%');
    svgElement.setAttribute('height','100%');
    svgElement.setAttributeNS('','viewBox','0 0 100 100');
    svgElement.setAttributeNS('','preserveAspectRatio','none');
    svgElement.setAttribute('e3d-svg','true');

    svgElement.innerHTML = `<path d="${pathString}"/>`
    face.appendChild(svgElement)

};	

function defineShapeType (name, numberOfFaces, setUpFacesFunction) {

    return function (parameters={}) {
        var that = makeBaseE3d(parameters)
        putRightNumberOfFacesOn(that,numberOfFaces)
        that.setUpFaces = setUpFacesFunction;
        that.setUpFaces(that.arg.size, that.arg.units)
        that.setAttribute('e3d-shape',name)
        return that;
    }

}

export {setTransformWithAllPrefixes, applySVG, defineShapeType}