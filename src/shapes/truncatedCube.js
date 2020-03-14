import * as E3d from '../base/baseE3d'
import * as faceStyling from '../base/faceStyling'

function setUpFaces (size,units='px') {
    
    const trianglePoints = [
        [50,0],
        [100,100],
        [0,100]
    ]

    const octagonCorner = 100*( size[1] / size[0])
    const octagonPoints = [
        [octagonCorner,0],
        [100 - octagonCorner, 0],
        [100, octagonCorner],
        [100, 100 - octagonCorner],
        [100 - octagonCorner, 100],
        [octagonCorner, 100],
        [0,100-octagonCorner],
        [0,octagonCorner]
    ]

    const triangleWidth = Math.sqrt ( size[1]*size[1]*2 )
    const triangleHeight = triangleWidth * Math.sqrt(3) / 2;
    const tetrahedronHeight = Math.sqrt(2/3) *triangleWidth

    const cubeSide = size[0]  
    const innerCubeSide = size[0] - (size[1]*2)
    const innerCubeDiagonal = Math.sqrt(innerCubeSide*innerCubeSide *3)

    const shapeStyle = {
        "width" : `${size[0]}${units}`,
        "height" : `${size[0]}${units}`,
    }
    this.style.width = size[0] + units;
	this.style.height = size[0] + units;

    let faceStyles = faceStyling.makeList(14)
    
    let f
    let mysteriousAdjustment = ( -triangleHeight * .1325) 
    let transformString
    let turn 
    for ( f=0; f<6; f++) {
        faceStyles[f].width = "" + size[0] + units;
        faceStyles[f].height = "" + size[0] + units;
        E3d.applySVG(this.children[f],octagonPoints)
    }

    faceStyles[0].transform =`translateZ(${size[0]/2}${units})`;
    faceStyles[1].transform =`rotateY(90deg)  translateZ(${size[0]/2}${units})`;
    faceStyles[2].transform =`rotateX(90deg)  translateZ(${size[0]/2}${units})`;
    faceStyles[3].transform =`rotateX(270deg) translateZ(${size[0]/2}${units})`;
    faceStyles[4].transform =`rotateY(270deg) translateZ(${size[0]/2}${units})`;
    faceStyles[5].transform =`rotateY(180deg) translateZ(${size[0]/2}${units})`;



    for (f=6; f<14; f++) {
        faceStyles[f].width = "" + triangleWidth + units;
        faceStyles[f].height = "" + triangleHeight + units;
        
        transformString = '';
        transformString += `translateX(${cubeSide/2 - triangleWidth/2}${units}) `
        transformString += `translateY(${cubeSide/2 - triangleHeight/2}${units}) `
        //triangle at center
        
        turn = 45 + ((f-6)*90)
        if (f > 9 ) {
            turn = 45 + ((f-10)*90)
            transformString += `rotateY(${180}deg) `
        }
        
        transformString += `rotateZ(${turn}deg) `
        transformString += `rotateX(${56}deg) `
        transformString += `translateZ(${innerCubeDiagonal/2}${units}) `
        transformString += `translateZ(${tetrahedronHeight}${units}) ` 
        transformString += `translateY(${mysteriousAdjustment}${units}) `
        faceStyles[f].transform = transformString
        E3d.applySVG(this.children[f],trianglePoints)
    }
    
    faceStyling.apply(this, faceStyles, shapeStyle)
};

export default E3d.defineShapeType('truncatedCube',14,setUpFaces)
