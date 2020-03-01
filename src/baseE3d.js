import * as timedFunctions from './gradual'
import * as propertyMethods from './propertyMethods';


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

function processSize(input) {
    let size = input  || [100,100,100];
    if (typeof(size) === 'string') {size = size.trim().split(' ')};
    if (typeof(size) === 'number') {size = [size,size,size]};
    return size
}

function processSpinOrMove (input) {
    let output = input  || [0,0,0];
    if (typeof(output) === 'string') {output = output.trim().split(' ')};
    return output
}

function defineShapeType (name, numberOfFaces, setUpFacesFunction) {

    function initShape (target, move, spin) {
        putRightNumberOfFacesOn(target,numberOfFaces)
        target.setUpFaces = setUpFacesFunction;
        target.setUpFaces(target.arg.size, target.arg.units)
        target.setAttribute('e3d-shape',name)

        const {units} = target.arg

        target.style.transform = `translate3d(${move[0]}${units}, ${move[1]}${units}, ${move[2]}${units}) rotateX(${spin[0]}deg) rotateY(${spin[1]}deg) rotateZ(${spin[2]}deg)`

        Object.defineProperty (target,'spin',propertyMethods.spin)
        Object.defineProperty (target,'move', propertyMethods.move)
        Object.defineProperty (target, 'moveSpin',propertyMethods.moveSpin)
    
        target.moveAndSpinOverTime = timedFunctions.moveAndSpinOverTime
        target.isMoving = timedFunctions.isMoving
        target.spinOverTime = timedFunctions.spinOverTime
    }

    let factory = function (parameters={}) {
        let target= document.createElement('figure')
            
        let faceClass = parameters.faceClass  || [];
        if (typeof(faceClass) === 'string'){faceClass = faceClass.trim().split(" ")};
        
        target.arg = {
            size: processSize(parameters.size),
            units:parameters.units  ||'px',
            faceClass,
            classRule: 'all',
            addContentToFace:parameters.addContentToFace
        };
    
        target.style.width = "" + target.arg.size[0] + target.arg.units;
        target.style.height = "" + target.arg.size[1] + target.arg.units;

        const spin = processSpinOrMove(parameters.spin) 
        const move = processSpinOrMove(parameters.move) 
        
        initShape(target, move, spin)
        return target;
    }

    factory.fromDom = function(target) {
        
        let faceClass = target.getAttribute('face-class') || [];
        if (typeof(faceClass) === 'string'){faceClass = faceClass.trim().split(" ")};

        const size = processSize(target.getAttribute('size'))

        target.arg =  {
            size,
            units: 'px',
            faceClass,
            classRule: 'blank',
            addContentToFace:[]
        };

        target.style.width = "" + target.arg.size[0] + target.arg.units;
        target.style.height = "" + target.arg.size[1] + target.arg.units;

        const move = processSpinOrMove(target.getAttribute('move'))
        const spin = processSpinOrMove(target.getAttribute('spin'))

        initShape(target,move,spin)
    }

    return factory
}

export {setTransformWithAllPrefixes, applySVG, defineShapeType}