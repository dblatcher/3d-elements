import * as E3d from '../baseE3d'

function setUpFaces (size,units='px') {
	var faces = this.children;		
	var transformString;
	var triangleHeight = size[0] * Math.sqrt(3) / 2;
	var pyramidHeight = Math.sqrt( (triangleHeight*triangleHeight) - ((size[0]/2)*(size[0]/2)) ) ;
	var angle = 90-54.7356;
	var shift = 37/150;
	
	this.style.width = size[0] + units;
	this.style.height = pyramidHeight*2 + units;
	
	for (var i=0; i<=7; i++){
		faces[i].style.width = size[0] + units;
		faces[i].style.height = triangleHeight + units;
		faces[i].style.textAlign="center";
		faces[i].style.paddingLeft='25%';		
		faces[i].style.paddingRight='25%';		
		E3d.applySVG(faces[i],[ [50,0],[100,100],[0,100] ]);
		faces[i].style.paddingTop ='40%';	
		transformString = '';
		if (i < 4) {
			transformString += 'translateY(' + (pyramidHeight/2-triangleHeight/2) + units +')';				
		} else {
			transformString += 'translateY(' + (pyramidHeight*1.5-(triangleHeight/2)) + units +')';				
			transformString += 'rotateZ(' + 180 + 'deg)';
		};
		transformString += 'rotateY(' + 90*i + 'deg)';
		transformString += 'translateZ(' + -size[0]*shift + units +')';
		transformString += 'rotateX(' + -angle + 'deg)';
		E3d.setTransformWithAllPrefixes(faces[i],transformString);
	};
};

export default E3d.defineShapeType('octahedron', 8, setUpFaces)