import * as E3d from '../baseE3d'

function setUpFaces (size,units='px') {
	var faces = this.children;		
	var transformString;
	
	const triangleSide = size[0]/2;
	const triangleHeight = triangleSide * Math.sqrt(3) / 2;			
	const inscribed = triangleSide * 0.7557613141;
	const dihedral = 138.19; 

	
	var pyramidHeight = Math.sqrt( (triangleHeight*triangleHeight) - (triangleSide/2)*(triangleSide/2) ) ;
	this.style.width = triangleSide + units;
	this.style.height = (triangleHeight*2.5) + units;
	
	for (var i=0; i < 20; i++){
		faces[i].style.width = triangleSide + units;
		faces[i].style.height = triangleHeight + units;
		faces[i].style.textAlign="center";
		faces[i].style.paddingLeft='25%';		
		faces[i].style.paddingRight='25%';		
		E3d.applySVG(faces[i],[ [50,100],[100,0],[0,0] ]);
		faces[i].style.paddingBottom ='40%';
		faces[i].style.paddingTop ='5%';
	}
	
	
	
	
	var startTransform = '';
	startTransform += 'translateY('+ (triangleHeight*0.75) + units + ')';
	startTransform += 'translateZ('+ -inscribed + units + ')';
	
	var flipTransform = '';
	flipTransform += 'translateY('+ (triangleHeight*0.75) + units + ')';
	flipTransform += 'rotateX(180deg)';
	flipTransform += 'translateZ('+ -inscribed + units + ')';
	flipTransform += 'translateY('+ triangleHeight/3 + units + ')';
	
	var toBaseTransform = '';
	toBaseTransform += 'rotateZ(' + 180 + 'deg)';
	toBaseTransform += 'translateY('+ triangleHeight/2 + units + ')';
	toBaseTransform += 'rotateX(' + (180-dihedral) + 'deg)';
	toBaseTransform += 'translateY('+ triangleHeight/2 + units + ')';
	
	var toRightTransform = '';
	toRightTransform += 'translateX('+ triangleSide + units + ')';
	toRightTransform += 'translateY('+ triangleHeight/2 + units + ')';
	toRightTransform += 'rotateZ(' + -60 + 'deg)';
	toRightTransform += 'translateY('+ -triangleHeight*(2/2) + units + ')';
	toRightTransform += 'rotateX(' + (180-dihedral) + 'deg)';
	toRightTransform += 'translateY('+ triangleHeight/2 + units + ')';
	
	var toLeftTransform = '';
	toLeftTransform += 'translateX('+ -triangleSide + units + ')';
	toLeftTransform += 'translateY('+ triangleHeight/2 + units + ')';
	toLeftTransform += 'rotateZ(' + 60 + 'deg)';
	toLeftTransform += 'translateY('+ -triangleHeight*(2/2) + units + ')';
	toLeftTransform += 'rotateX(' + (180-dihedral) + 'deg)';
	toLeftTransform += 'translateY('+ triangleHeight/2 + units + ')';
	
	var t={
		s:startTransform,
		f:flipTransform,
		b:toBaseTransform,
		l:toLeftTransform,
		r:toRightTransform
	};
	
	
	E3d.setTransformWithAllPrefixes(faces[0],t.s);
	
	E3d.setTransformWithAllPrefixes(faces[1],t.s + t.b);
	E3d.setTransformWithAllPrefixes(faces[2],t.s + t.r);
	E3d.setTransformWithAllPrefixes(faces[3],t.s + t.l);
	
	E3d.setTransformWithAllPrefixes(faces[4],t.s + t.l + t.l);
	E3d.setTransformWithAllPrefixes(faces[5],t.s + t.l + t.r);
	
	E3d.setTransformWithAllPrefixes(faces[6],t.s + t.r + t.l );
	E3d.setTransformWithAllPrefixes(faces[7],t.s + t.r + t.r );
	
	E3d.setTransformWithAllPrefixes(faces[8],t.s + t.b + t.l );
	E3d.setTransformWithAllPrefixes(faces[9],t.s + t.b + t.r );
	
	E3d.setTransformWithAllPrefixes(faces[10],t.f);
	
	E3d.setTransformWithAllPrefixes(faces[11],t.f + t.b);
	E3d.setTransformWithAllPrefixes(faces[12],t.f + t.r);
	E3d.setTransformWithAllPrefixes(faces[13],t.f + t.l);
	
	E3d.setTransformWithAllPrefixes(faces[14],t.f + t.l + t.l);
	E3d.setTransformWithAllPrefixes(faces[15],t.f + t.l + t.r);
	
	E3d.setTransformWithAllPrefixes(faces[16],t.f + t.r + t.l );
	E3d.setTransformWithAllPrefixes(faces[17],t.f + t.r + t.r );
	
	E3d.setTransformWithAllPrefixes(faces[18],t.f + t.b + t.l );
	E3d.setTransformWithAllPrefixes(faces[19],t.f + t.b + t.r );
	
};

export default E3d.defineShapeType('icosahedron',20,setUpFaces)