import * as E3d from '../base/baseE3d'
import * as faceStyling from '../base/faceStyling'

function setUpFaces(size,units='px') {



	var faces = this.children;
	var transformString;
	
	var rt5 = Math.sqrt(5);		
	var cos18 = Math.sqrt(  10 + 2*rt5 )/4;
	var sin36 = Math.sqrt(  10 - 2*rt5 )/4;
	
	var decSide = size[0] * sin36 * 0.5;
	var decFaceWidth = size[0]*cos18;
	var deg2Rad = Math.PI/180;
	

	var clipArray = [ 
	[0 ,0 ],[0 ,0 ],[0 ,0 ],[0 ,0 ],[0 ,0 ],
	[0 ,0 ],[0 ,0 ],[0 ,0 ],[0 ,0 ],[0 ,0 ]
	];
	for (var p = 0; p<10; p++ ) {
		clipArray[p][0] = 50*Math.sin(36*p*deg2Rad) +50;
		clipArray[p][1] = cos18*(50*Math.cos(36*p*deg2Rad)) +50;
	}


	const shapeStyle = {
		"width" : `${decFaceWidth}${units}`,
        "height" : `${size[0]}${units}`,
    }
    let faceStyles = faceStyling.makeList(12)

	
	this.style.width = decFaceWidth + units;	
	this.style.height = size[0] + units;
	
	faceStyles[0].width  = decFaceWidth + units;	
	faceStyles[0].height = size[0] + units;
	transformString = '';
	transformString += 'translateZ(' + size[1]/2 + units +')'
	faceStyles[0].transform = transformString
	
	E3d.applySVG(faces[0],clipArray);
	
	
	
	for (var f=1;f<11;f++) {	
		faceStyles[f].height = size[1] + units;
		faceStyles[f].width  = decSide  + units;
		transformString = '';
		transformString += 'translateX(' + decFaceWidth/2 + units +')';	
		transformString += 'translateX(' + -decSide/2 + units +')';	
		transformString += 'translateY(' + size[0]/2 + units +')';	
		transformString += 'translateY(' + -size[1]/2 + units +')';	

		transformString += 'rotateX(-90deg)';
		transformString += 'rotateY(162deg)';
		transformString += 'rotateY(' + 36*(f-1) + 'deg)';
		transformString += 'translateZ(' + decFaceWidth*cos18/2  + units +')';
		faceStyles[f].transform = transformString
	}
	
	faceStyles[11].width  = decFaceWidth + units;	
	faceStyles[11].height = size[0] + units;
	faceStyles[11].transform = "rotateY(180deg) translateZ(" + size[1]/2 + units + ")"
	E3d.applySVG(faces[11],clipArray);
	
	faceStyling.apply(this, faceStyles, shapeStyle)

};

export default E3d.defineShapeType('decagon',12,setUpFaces)