import * as E3d from '../baseE3d'
import * as faceStyling from './faceStyling'

function setUpFaces (size,units='px') {
	var faces = this.children;
	
	var transformString;
	
	var	shift = size[0]*(72/500);
	var tilt =70.5;
	var triangleHeight = size[0] * Math.sqrt(3) / 2;
	
	
	let faceStyles = faceStyling.makeList(4)
    const shapeStyle = {
        "width" : `${size[0]}${units}`,
        "height" : `${triangleHeight}${units}`,
    }
	
	for (var i=0; i<=3; i++){
		faceStyles[i]["width"] = size[0] + units;
		faceStyles[i]["height"] = triangleHeight + units;
		faceStyles[i]["text-align"] = "center";
        faceStyles[i]["padding"]='40% 25% 0 25%'; 
		faceStyling.prependSvg(faces[i],[ [50,0],[100,100],[0,100] ]);
	};

	for (var i=0; i<=2; i++){
		transformString = '';
		transformString += "rotateZ(" + 120*i + "deg)";
		transformString += "translateY(" + shift + units +")";
		transformString += "rotateX(" + -tilt + "deg)";
		faceStyles[i]["transform"] = transformString
	};
	
	transformString = '';
	transformString += "translateZ(" + -triangleHeight*(6.5/14) + units + ")";		
	transformString += "translateY(" + -triangleHeight*(1/6) + units + ")";		
	transformString += "rotateY(" + 180 + "deg)";
	faceStyles[3]["transform"] = transformString
	
	faceStyling.apply(this, faceStyles, shapeStyle)
};

export default E3d.defineShapeType('tetrahedron', 4, setUpFaces)