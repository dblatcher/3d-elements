import * as E3d from '../baseE3d'

function setUpFaces (size,units='px') {
	var faces = this.children;
	
	var hypoth,angle, transformString, compStyle;
	
	var	shift = size[0]*(72/500);
	var tilt =70.5;
	var triangleHeight = size[0] * Math.sqrt(3) / 2;
	
	this.style.width = size[0] + units;
	this.style.height = triangleHeight + units;
	
	
	for (var i=0; i<=3; i++){
		faces[i].style.width = size[0] + units;
		faces[i].style.height = triangleHeight + units;
		E3d.applySVG(faces[i],[ [50,0],[100,100],[0,100] ]);
		faces[i].style.textAlign="center";
		faces[i].style.paddingTop='40%';		
		faces[i].style.paddingLeft='25%';		
		faces[i].style.paddingRight='25%';		
	};

	for (var i=0; i<=2; i++){
		transformString = '';
		transformString += "rotateZ(" + 120*i + "deg)";
		transformString += "translateY(" + shift + units +")";
		transformString += "rotateX(" + -tilt + "deg)";
		E3d.setTransformWithAllPrefixes(faces[i],transformString);
	};
	
	transformString = '';
	transformString += "translateZ(" + -triangleHeight*(6.5/14) + units + ")";		
	transformString += "translateY(" + -triangleHeight*(1/6) + units + ")";		
	transformString += "rotateY(" + 180 + "deg)";
	E3d.setTransformWithAllPrefixes(faces[3],transformString);
	
	
};

export default E3d.defineShapeType('tetrahedron', 4, setUpFaces)