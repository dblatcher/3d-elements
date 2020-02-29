import * as E3d from '../baseE3d'

function setUpFaces (size,units='px') {
    this.style.height = "" + size[0] + units;
    var faces = this.children;

    for (var f=0; f<6; f++) {
        faces[f].style.width = "" + size[0] + units;
        faces[f].style.height = "" + size[0] + units;
    }
    
    E3d.setTransformWithAllPrefixes(faces[0],`translateZ(${size[0]/2}${units})`);
    E3d.setTransformWithAllPrefixes(faces[1],`rotateY(90deg)  translateZ(${size[0]/2}${units})`);
    E3d.setTransformWithAllPrefixes(faces[2],`rotateX(90deg)  translateZ(${size[0]/2}${units})`);
    E3d.setTransformWithAllPrefixes(faces[3],`rotateX(270deg) translateZ(${size[0]/2}${units})`);
    E3d.setTransformWithAllPrefixes(faces[4],`rotateY(270deg) translateZ(${size[0]/2}${units})`);
    E3d.setTransformWithAllPrefixes(faces[5],`rotateY(180deg) translateZ(${size[0]/2}${units})`);	
};

export default E3d.defineShapeType('cube',6,setUpFaces)
