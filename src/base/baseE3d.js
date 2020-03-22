import {GradualMover} from './gradual'
import {ConstantSpinner} from './constant'
import * as propertyMethods from './propertyMethods';
import faceProperties from './faceProperties'

let hashNumber = 100

function putRightNumberOfFacesOn (parentShape, numberOfFaces) {
    const {faceClass, classRule, faceContent} = parentShape.arg
    let createdFaceIndeces = [], f, face;

    // create the face if there is not an existing child element
    for (f=0; f<numberOfFaces; f++) {
        if (parentShape.childElementCount <= f ) {
            parentShape.appendChild(document.createElement('div'));
            createdFaceIndeces.push (f)
        }
    }

    const contentArray = Array.isArray(faceContent) ? faceContent : [faceContent]
    for (f=0; f<numberOfFaces; f++) {
        face = parentShape.children[f]

        // add content to the created faces only 
        if (createdFaceIndeces.includes(f)) {
            contentArray.forEach(rule => {
                if (typeof(rule) === 'function') {
                    rule(face,f)
                }
                else if (typeof(rule) === 'string') {
                    face.innerHTML += rule;
                }
            }) 
        }
        
        // add e3d-face attribute
        face.setAttribute('e3d-face',f.toString())
        
        //apply classRule
        if (
        (classRule == 'all') ||
        (classRule == 'blank' &&  face.classList.length == 0 )
        ){
            faceClass.forEach(function(fc){
                face.classList.add(fc)
            })
        };
        
        //attach properties
        Object.defineProperties(face,faceProperties)
    }
        
 

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
        target.setAttribute('e3d-shape',name)
        target.setAttribute('hash',hashNumber++)
        putRightNumberOfFacesOn(target,numberOfFaces)
        target.setUpFaces = setUpFacesFunction;
        target.setUpFaces(target.arg.size, target.arg.units)

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
            faceContent:parameters.faceContent
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
            faceContent:[]
        };

        const move = processSpinOrMove(target.getAttribute('move'))
        const spin = processSpinOrMove(target.getAttribute('spin'))

        initShape(target,move,spin)
        target.removeAttribute('e3d-hide-until-folded')
        return target
    }

    factory.shapeName = name

    return factory
}

export {defineShapeType}