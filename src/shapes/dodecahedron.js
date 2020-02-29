import * as E3d from '../baseE3d'

function setUpFaces (size,units='px') {
    var faces = this.children;
    
    var hypoth,angle, transformString;
    
    const sin72 = Math.sqrt(10 + 2*Math.sqrt(5))/4;
    const sin36 = Math.sqrt(10 - 2*Math.sqrt(5))/4;			
    const sin18 = 0.30901699437;
    const sin54 = 0.80901699437
    
    var pentWidth = size[0]/1.5;
    var pentRadius =  pentWidth/2 * sin72;
    var pentSide = 2*sin36 * pentRadius
    var pentHeight  = pentWidth * ((sin72+sin36) / (2*sin54)); 
    var pentCord = pentHeight-pentRadius;
    
        
    this.style.width = pentWidth + units;
    this.style.height = (pentHeight*2) + units;
    
    const dihedral = 116.56505;
    var v = sin36 / (sin36 + sin72);
    var h = sin18 / (1 + sin18 + sin18);
    var inscribed = pentSide*1.11351;
    
    
    for (var i=0; i < 12; i++){
        faces[i].style.width = pentWidth + units;
        faces[i].style.height = pentHeight + units;
        E3d.applySVG(faces[i],[ [50,0],[100,100*v],[100*(1-h),100],[h*100,100],[0,100*v] ]);
        faces[i].style.textAlign="center";
        faces[i].style.paddingTop=  20 + '%';		
        faces[i].style.paddingLeft= (h*100) + '%';		
        faces[i].style.paddingRight= (h*100) + '%';
    };

    var startTransform = ''
    startTransform += 'translateY('+ (pentHeight*1/2) + units + ')';;
    startTransform += 'translateZ('+ inscribed + units + ')';
    
    var toBaseTransform = '';
    toBaseTransform += 'rotateZ(' + 180 + 'deg)';
    toBaseTransform += 'translateY('+ -pentHeight/2 + units + ')';
    toBaseTransform += 'rotateX(' + (180-dihedral) + 'deg)';
    toBaseTransform += 'translateY('+ -pentHeight/2 + units + ')';

    var toUpRightTransform = '';			
    toUpRightTransform += 'rotateZ(' + 36 + 'deg)';
    toUpRightTransform += 'translateY('+ -(0.38*pentWidth) + units + ')';
    toUpRightTransform += 'rotateX(' + (180-dihedral) + 'deg)';
    toUpRightTransform += 'translateY('+ -pentRadius + units + ')';
    toUpRightTransform += 'translateX('+ 0.035*pentWidth + units + ')';
    
    var toUpLeftTransform = '';			
    toUpLeftTransform += 'rotateZ(' + -36 + 'deg)';
    toUpLeftTransform += 'translateY('+ -(0.38*pentWidth) + units + ')';
    toUpLeftTransform += 'rotateX(' + (180-dihedral) + 'deg)';
    toUpLeftTransform += 'translateY('+ -pentRadius + units + ')';
    toUpLeftTransform += 'translateX('+ -0.035*pentWidth + units + ')';
    
    var toDownRightTransfrom ='';
    toDownRightTransfrom += 'rotateZ(' + 108 + 'deg)';
    toDownRightTransfrom += 'translateY('+ -(0.435*pentWidth) + units + ')';
    toDownRightTransfrom += 'rotateX(' + (180-dihedral) + 'deg)';
    toDownRightTransfrom += 'translateY('+ -pentCord + units + ')';
    toDownRightTransfrom += 'translateX('+ 0.035*pentWidth + units + ')';
    
    var toDownLeftTransfrom ='';
    toDownLeftTransfrom += 'rotateZ(' + -108 + 'deg)';
    toDownLeftTransfrom += 'translateY('+ -(0.435*pentWidth) + units + ')';
    toDownLeftTransfrom += 'rotateX(' + (180-dihedral) + 'deg)';
    toDownLeftTransfrom += 'translateY('+ -pentCord + units + ')';
    toDownLeftTransfrom += 'translateX('+ -0.035*pentWidth + units + ')';
    
    
    E3d.setTransformWithAllPrefixes(faces[0],startTransform);

    transformString = startTransform;
    transformString += toBaseTransform;	
    transformString += toUpLeftTransform;
    E3d.setTransformWithAllPrefixes(faces[1],transformString);

    transformString = startTransform;
    transformString += toBaseTransform;
    transformString += toUpRightTransform;			
    E3d.setTransformWithAllPrefixes(faces[2],transformString);

    transformString = startTransform;
    transformString += toBaseTransform;
    E3d.setTransformWithAllPrefixes(faces[3],transformString);
    
    transformString = startTransform;
    transformString += toUpRightTransform;
    E3d.setTransformWithAllPrefixes(faces[4],transformString);

    transformString = startTransform;
    transformString += toUpLeftTransform;
    E3d.setTransformWithAllPrefixes(faces[5],transformString);

    transformString = startTransform;
    transformString += toDownRightTransfrom;
    E3d.setTransformWithAllPrefixes(faces[6],transformString);

    transformString = startTransform;
    transformString += toDownLeftTransfrom;			
    E3d.setTransformWithAllPrefixes(faces[7],transformString);
        
    transformString = startTransform;
    transformString += toUpLeftTransform;
    transformString += toUpLeftTransform;
    E3d.setTransformWithAllPrefixes(faces[8],transformString);

    transformString = startTransform;
    transformString += toUpLeftTransform;
    transformString += toUpRightTransform;
    E3d.setTransformWithAllPrefixes(faces[9],transformString);

    transformString = startTransform;
    transformString += toUpRightTransform;
    transformString += toUpRightTransform;
    E3d.setTransformWithAllPrefixes(faces[10],transformString);

    transformString = startTransform;
    transformString += toUpRightTransform;
    transformString += toUpRightTransform;
    transformString += toUpLeftTransform;
    E3d.setTransformWithAllPrefixes(faces[11],transformString);
            
};

export default function makePyramid (parameters={}) {
    var that = E3d.makeBaseE3d(parameters)
    E3d.putRightNumberOfFacesOn(that,12)
    that.setUpFaces = setUpFaces;
    that.setUpFaces(that.arg.size, that.arg.units)
    that.setAttribute('e3d-shape','dodecahedron')
    return that;
}