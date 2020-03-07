import * as E3d from '../baseE3d'
import * as faceStyling from './faceStyling'

function setUpFaces (size,units='px') {
			
    const shapeStyle = {
		"width" : `${size[0]}${units}`,
        "height" : `${size[1]}${units}`,
    }
    let faceStyles = faceStyling.makeList(6)


	faceStyles[0]["width"] = "" + size[0] + units;
	faceStyles[0]["height"] = "" + size[1] + units;
	faceStyles[0]["transform"] = `translateZ(${size[2]/2}${units})`;
	
	faceStyles[1]["width"] = "" + size[2] + units;
	faceStyles[1]["height"] = "" + size[1] + units;
	faceStyles[1]["transform"] = "translateX(" + (size[0]-size[2])/2 + units + ") rotateY(90deg) translateZ(" + size[0]*.5 + units + ")";
	
	faceStyles[2]["width"] = "" + size[0] + units;
	faceStyles[2]["height"] = "" + size[2] + units;
	faceStyles[2]["transform"] = "rotateX(90deg) translateZ(" + size[2]/2 + units + ")";
	
	faceStyles[3]["width"] = "" + size[0] + units;
	faceStyles[3]["height"] = "" + size[2] + units;
	faceStyles[3]["transform"] = "rotateX(270deg) translateZ(" + (size[1]-(size[2]/2)) + units + ")";
	
	faceStyles[4]["width"] = "" + size[2] + units;
	faceStyles[4]["height"] = "" + size[1] + units;
	faceStyles[4]["transform"] = "rotateY(270deg) translateZ(" + size[2]/2 + units + ")";
	
	faceStyles[5]["width"] = "" + size[0] + units;
	faceStyles[5]["height"] = "" + size[1] + units;
	faceStyles[5]["transform"] = "rotateY(180deg) translateZ(" + size[2]/2 + units + ")";
	
	faceStyling.apply(this, faceStyles, shapeStyle)
	
};

export default E3d.defineShapeType('cuboid',6,setUpFaces)