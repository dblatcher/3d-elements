import * as E3d from '../base/baseE3d'
import * as faceStyling from '../base/faceStyling'

function setUpFaces (size,units='px') {
    
    const triangeWidth = Math.sqrt ( size[1]*size[1]*2 )
    const triangleHeight = triangeWidth * Math.sqrt(3) / 2;
    
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

    const cubeCornerDistance = Math.sqrt(3) * (size[0] - (size[1]*.89) ) *.5

    const shapeStyle = {
        "width" : `${size[0]}${units}`,
        "height" : `${size[0]}${units}`,
    }
    this.style.width = size[0] + units;
	this.style.height = size[0] + units;

    let faceStyles = faceStyling.makeList(14)
    
    let f
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

    let transformString
    for (f=6; f<14; f++) {
        faceStyles[f].width = "" + triangeWidth + units;
        faceStyles[f].height = "" + triangleHeight + units;
        
        transformString = '';
        transformString += `translateX(${size[0]/2 - size[1]/2}${units})`
        transformString += `translateY(${size[0]/2 - triangleHeight/2}${units})`

        if (f === 6) {
            transformString += `rotateX(47deg) rotateY(35deg) rotateZ(30deg)`
            transformString += `translateZ(${cubeCornerDistance}${units})`
        }else {
            faceStyles[f]["visibility"] ="hidden" 
        }

        faceStyles[f].transform = transformString
        E3d.applySVG(this.children[f],trianglePoints)
    }
    


    faceStyling.apply(this, faceStyles, shapeStyle)
};

export default E3d.defineShapeType('truncatedCube',14,setUpFaces)
