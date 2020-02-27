import * as base from './baseE3d'

export default function makeCube (parameters={}) {

    var that = base.makeBaseE3d(parameters)
    base.putRightNumberOfFacesOn(that,6)


    that.setUpFaces = function(size,units='px') {
        this.style.height = "" + size[0] + units;
        var faces = this.children;

        for (var f=0; f<6; f++) {
            faces[f].style.width = "" + size[0] + units;
            faces[f].style.height = "" + size[0] + units;
        }
        
        base.setTransformWithAllPrefixes(faces[0],`translateZ(${size[0]/2}${units})`);
        base.setTransformWithAllPrefixes(faces[1],`rotateY(90deg)  translateZ(${size[0]/2}${units})`);
        base.setTransformWithAllPrefixes(faces[2],`rotateX(90deg)  translateZ(${size[0]/2}${units})`);
        base.setTransformWithAllPrefixes(faces[3],`rotateX(270deg) translateZ(${size[0]/2}${units})`);
        base.setTransformWithAllPrefixes(faces[4],`rotateY(270deg) translateZ(${size[0]/2}${units})`);
        base.setTransformWithAllPrefixes(faces[5],`rotateY(180deg) translateZ(${size[0]/2}${units})`);	
    };

    that.setUpFaces(that.arg.size, that.arg.units)
    return that

}

