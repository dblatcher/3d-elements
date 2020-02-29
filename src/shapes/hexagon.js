import * as E3d from '../baseE3d'

function setUpFaces (size,units='px') {
	var faces = this.children;
	var transformString;
	
	var hexWidth = size[0]*(2/Math.pow(3,1/2));		
	var hexCorner = (50/(Math.pow(3,1/2)));
	hexCorner = 25;
	var hexagonalCornerArray = [ 
	[hexCorner,0],
	[100-hexCorner, 0],
	[100,50],
	[100-hexCorner,100],
	[hexCorner, 100],
	[0,50] 
	];
	this.style.width = hexWidth + units;	
	this.style.height = size[0] + units;
	
	faces[0].style.width  = hexWidth + units;	
	faces[0].style.height = size[0] + units;
	transformString = '';
	transformString += 'translateZ(' + size[1]/2 + units +')'
	E3d.setTransformWithAllPrefixes(faces[0],transformString);
	E3d.applySVG(faces[0],hexagonalCornerArray);
	
	for (var f=1;f<7;f++) {	
		faces[f].style.width  = size[0]/Math.pow(3,1/2)  + units;		
		faces[f].style.height = size[1]+ units;
		transformString = '';
		transformString += 'translateY(' + -size[1]*.5 + units + ')';
		transformString += 'translateY(' + size[0]*.5 + units + ')';			
		transformString += 'translateX(' + -(size[0]/Math.pow(3,1/2))*.5 + units + ')';
		transformString += 'translateX(' + hexWidth*.5 + units + ')';
		transformString += 'rotateX(90deg) ';
		transformString += 'rotateY('+ 60*(f-1) +'deg) ';
		transformString += 'translateZ(' + size[0]/(2) + units + ')';	
		E3d.setTransformWithAllPrefixes(faces[f],transformString);
	}
	
	faces[7].style.width  = hexWidth + units;		
	faces[7].style.height = size[0] + units;
	E3d.setTransformWithAllPrefixes(faces[7],"rotateY(180deg) translateZ(" + size[1]/2 + units + ")");
	E3d.applySVG(faces[7],hexagonalCornerArray);
	
};

export default E3d.defineShapeType('hexagon',8, setUpFaces)