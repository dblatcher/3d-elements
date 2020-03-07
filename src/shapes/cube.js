import * as E3d from '../baseE3d'
import * as faceStyling from './faceStyling'

function setUpFaces (size,units='px') {
    
    const shapeStyle = {
        "width" : `${size[0]}${units}`,
        "height" : `${size[0]}${units}`,
    }
    let faceStyles = faceStyling.makeList(6)

    for (var f=0; f<6; f++) {
        faceStyles[f].width = "" + size[0] + units;
        faceStyles[f].height = "" + size[0] + units;
    }

    faceStyles[0].transform =`translateZ(${size[0]/2}${units})`;
    faceStyles[1].transform =`rotateY(90deg)  translateZ(${size[0]/2}${units})`;
    faceStyles[2].transform =`rotateX(90deg)  translateZ(${size[0]/2}${units})`;
    faceStyles[3].transform =`rotateX(270deg) translateZ(${size[0]/2}${units})`;
    faceStyles[4].transform =`rotateY(270deg) translateZ(${size[0]/2}${units})`;
    faceStyles[5].transform =`rotateY(180deg) translateZ(${size[0]/2}${units})`;

    faceStyling.apply(this, faceStyles, shapeStyle)
};

export default E3d.defineShapeType('cube',6,setUpFaces)
