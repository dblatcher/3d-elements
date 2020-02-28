import * as E3d from '../baseE3d'

function setUpFaces (size,units='px') {
	var faces = this.children;
			
	faces[0].style.width = "" + size[0] + units;
	faces[0].style.height = "" + size[1] + units;
	E3d.setTransformWithAllPrefixes(faces[0],`translateZ(${size[2]/2}${units})`);
	
	faces[1].style.width = "" + size[2] + units;
	faces[1].style.height = "" + size[1] + units;
	E3d.setTransformWithAllPrefixes(faces[1],"translateX(" + (size[0]-size[2])/2 + units + ") rotateY(90deg) translateZ(" + size[0]*.5 + units + ")");
	
	faces[2].style.width = "" + size[0] + units;
	faces[2].style.height = "" + size[2] + units;
	E3d.setTransformWithAllPrefixes(faces[2],"rotateX(90deg) translateZ(" + size[2]/2 + units + ")");
	
	faces[3].style.width = "" + size[0] + units;
	faces[3].style.height = "" + size[2] + units;
	E3d.setTransformWithAllPrefixes(faces[3],"rotateX(270deg) translateZ(" + (size[1]-(size[2]/2)) + units + ")");
	
	faces[4].style.width = "" + size[2] + units;
	faces[4].style.height = "" + size[1] + units;
	E3d.setTransformWithAllPrefixes(faces[4],"rotateY(270deg) translateZ(" + size[2]/2 + units + ")");
	
	faces[5].style.width = "" + size[0] + units;
	faces[5].style.height = "" + size[1] + units;
	E3d.setTransformWithAllPrefixes(faces[5],"rotateY(180deg) translateZ(" + size[2]/2 + units + ")");	
};

export default function makeCuboid (parameters={}) {
    var that = E3d.makeBaseE3d(parameters)
    E3d.putRightNumberOfFacesOn(that,6)
    that.setUpFaces = setUpFaces;
    that.setUpFaces(that.arg.size, that.arg.units)
    return that;
}