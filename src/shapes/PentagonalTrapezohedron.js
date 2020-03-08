import * as E3d from '../baseE3d'
import * as faceStyling from './faceStyling'

function setUpFaces (size,units='px') {
	var faces = this.children;		
	var transformString;

	var kiteWidth = size[0];
	var kiteHeight = size[0]*1.25;
	var kiteRatio = 80;
	var angle1 = 72;
	var angle2 = 44;
	var shift = 68/160;
	
	var adjust = 0.57;
	
	/* attempt to calculate shape for differing proportions 
	var angle2 = 90*((59/90)*kiteWidth/kiteHeight);
	console.log(halfPyramidBase/topHeight);
	angle2 = Math.acos(halfPyramidBase/topHeight);
	console.log(angle2);
	angle2 = angle2*(180/Math.PI);
	console.log(angle2);
	*/

	let faceStyles = faceStyling.makeList(10)
    const shapeStyle = {
        "width" : `${kiteWidth}${units}`,
        "height" : `${kiteHeight}${units}`,
    }

	for (var i=0; i<10; i++){

		faceStyles[i].width = kiteWidth + units;
        faceStyles[i].height = kiteHeight + units;
        faceStyles[i]["text-align"] = "center";
        faceStyles[i]["padding-left"] = '25%';        
        faceStyles[i]["padding-right"]='25%';        
        faceStyles[i]["padding-top"]='40%';   

		transformString = '';
		transformString += 'translateY(' + (-kiteHeight*adjust/2) + units + ')';
		if (i < 5) {
			transformString += 'rotateY(' + (angle1*i) + 'deg)';
		} else {
			transformString += 'rotateZ(' + 180 + 'deg)';
			transformString += 'translateY(' + (-kiteHeight*adjust) + units + ')';
			transformString += 'rotateY(' + (angle1/2 + angle1*(i-5)) + 'deg)';
		};
		transformString += 'translateZ(' + -kiteWidth*shift + units +')';
		transformString += 'rotateX(' + -angle2 + 'deg)';
		
        faceStyles[i]["transform"] = transformString
		E3d.applySVG(faces[i],[ [50,0],[100,kiteRatio],[50,100],[0,kiteRatio] ]);
	};

	faceStyling.apply(this, faceStyles, shapeStyle)
};

export default E3d.defineShapeType('pentagonalTrapezohedron',10, setUpFaces)