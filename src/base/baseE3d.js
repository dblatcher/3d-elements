import {GradualMover} from './gradual'
import {ConstantSpinner} from './constant'
import * as propertyMethods from './propertyMethods';

let hashNumber = 100

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
        parentShape.children[f].setAttribute('e3d-face',f.toString())
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

function processUnits(input) {
    if (!input) {return 'px'}
    const validUnits= ['cm', 'mm','Q','in','pc','pt','px','em','ex','ch','rem','lh', 'vw', 'vh','vmin','vmax']
    if (validUnits.includes(input)) {return input}
    return 'px'
}

function processFaceClass(input) {
    if (!input) {return []}
    if (typeof(input) === 'string'){return input.trim().split(" ")};
    if (Array.isArray(input)) return input
    return []
}

function defineShapeType (name, numberOfFaces, setUpFacesFunction) {

    function initShape (target, move, spin) {
        target.setAttribute('hash',hashNumber++)
        putRightNumberOfFacesOn(target,numberOfFaces)
        target.setUpFaces = setUpFacesFunction;
        target.setUpFaces(target.arg.size, target.arg.units)
        target.setAttribute('e3d-shape',name)

        const {units} = target.arg

        target.style.transform = `translate3d(${move[0]}${units}, ${move[1]}${units}, ${move[2]}${units}) rotateX(${spin[0]}deg) rotateY(${spin[1]}deg) rotateZ(${spin[2]}deg)`

        Object.defineProperty (target,'spin',propertyMethods.spin)
        Object.defineProperty (target,'move', propertyMethods.move)
        Object.defineProperty (target, 'moveSpin',propertyMethods.moveSpin)
    
        target.gradual = new GradualMover(target)
        target.constant= new ConstantSpinner(target)
    }

    let factory = function (parameters={}) {
        let target= document.createElement('figure')
                    
        target.arg = {
            size: processSize(parameters.size),
            units: processUnits(parameters.units),
            faceClass: processFaceClass(parameters.faceClass),
            classRule: 'all',
            addContentToFace:parameters.addContentToFace
        };

        const spin = processSpinOrMove(parameters.spin) 
        const move = processSpinOrMove(parameters.move) 

        initShape(target, move, spin)
        target.wasBuiltByScript = true
        return target;
    }

    factory.fromDom = function(target) {
        target.arg =  {
            size: processSize(target.getAttribute('size')),
            units: processUnits(target.getAttribute('units')),
            faceClass: processFaceClass(target.getAttribute('face-class')),
            classRule: 'blank',
            addContentToFace:[]
        };

        const move = processSpinOrMove(target.getAttribute('move'))
        const spin = processSpinOrMove(target.getAttribute('spin'))

        initShape(target,move,spin)
        return target
    }

    factory.shapeName = name

    return factory
}

export {defineShapeType}