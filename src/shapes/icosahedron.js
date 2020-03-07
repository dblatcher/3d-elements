import * as E3d from '../baseE3d'
import * as faceStyling from './faceStyling'

function setUpFaces (size,units='px') {
	let faceStyles = faceStyling.makeList(20)

	var faces = this.children;
	
	const triangleSide = size[0]/2;
	const triangleHeight = triangleSide * Math.sqrt(3) / 2;
	const inscribed = triangleSide * 0.7557613141;
	const dihedral = 138.19; 

	//todo - remove when not setting inline in base
	this.style.width = triangleSide + units;
	this.style.height = (triangleHeight*2.5) + units;
	
    const shapeStyle = {
        "width" : `${triangleSide}${units}`,
        "height" : `${triangleHeight*2.5}${units}`,
    }

	for (var i=0; i < 20; i++){
		faceStyles[i].width = triangleSide + units;
		faceStyles[i].height = triangleHeight + units;
		faceStyles[i]['text-align'] ="center";
		faceStyles[i]['padding']='5% 25% 40% 25%';
		E3d.applySVG(faces[i],[ [50,100],[100,0],[0,0] ]);
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
	
	
	faceStyles[0]['transform'] = t.s;
	
	faceStyles[1]['transform'] = t.s + t.b;
	faceStyles[2]['transform'] = t.s + t.r;
	faceStyles[3]['transform'] = t.s + t.l;
	
	faceStyles[4]['transform'] = t.s + t.l + t.l;
	faceStyles[5]['transform'] = t.s + t.l + t.r;
	
	faceStyles[6]['transform'] = t.s + t.r + t.l ;
	faceStyles[7]['transform'] = t.s + t.r + t.r ;
	
	faceStyles[8]['transform'] = t.s + t.b + t.l ;
	faceStyles[9]['transform'] = t.s + t.b + t.r ;
	
	faceStyles[10]['transform'] = t.f;
	
	faceStyles[11]['transform'] = t.f + t.b;
	faceStyles[12]['transform'] = t.f + t.r;
	faceStyles[13]['transform'] = t.f + t.l;
	
	faceStyles[14]['transform'] = t.f + t.l + t.l;
	faceStyles[15]['transform'] = t.f + t.l + t.r;
	
	faceStyles[16]['transform'] = t.f + t.r + t.l ;
	faceStyles[17]['transform'] = t.f + t.r + t.r ;
	
	faceStyles[18]['transform'] = t.f + t.b + t.l ;
	faceStyles[19]['transform'] = t.f + t.b + t.r ;

	faceStyling.apply(this, faceStyles, shapeStyle)
};

export default E3d.defineShapeType('icosahedron',20,setUpFaces)