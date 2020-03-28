import * as E3d from '../base/baseE3d'
import * as faceStyling from '../base/faceStyling'

function setUpFaces (size, units='px', facePattern=null) {
    var faces = this.children;
    
    var transformString;
    
    const sin72 = Math.sqrt(10 + 2*Math.sqrt(5))/4;
    const sin36 = Math.sqrt(10 - 2*Math.sqrt(5))/4;			
    const sin18 = 0.30901699437;
    const sin54 = 0.80901699437
    
    var pentWidth = size[0]/1.5;
    var pentRadius =  pentWidth/2 * sin72;
    var pentSide = 2*sin36 * pentRadius
    var pentHeight  = pentWidth * ((sin72+sin36) / (2*sin54)); 
    var pentCord = pentHeight-pentRadius;


    const dihedral = 116.56505;
    var v = sin36 / (sin36 + sin72);
    var h = sin18 / (1 + sin18 + sin18);
    var inscribed = pentSide*1.11351;
    
    
    const shapeStyle = {
		"width" : `${pentWidth}${units}`,
        "height" : `${pentHeight*2}${units}`,
    }
    let faceStyles = faceStyling.makeList(12)

    
    for (var i=0; i < 12; i++){
        faceStyles[i]["width"] = pentWidth + units;
        faceStyles[i]["height"] = pentHeight + units;
        faceStyling.prependSvg(faces[i],[ [50,0],[100,100*v],[100*(1-h),100],[h*100,100],[0,100*v] ], i, facePattern);
        faceStyles[i]["text-align"]="center";
        faceStyles[i]["padding-top"]=  20 + '%';		
        faceStyles[i]["padding-left"] = (h*100) + '%';		
        faceStyles[i]["padding-right"]= (h*100) + '%';
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
    
    
    faceStyles[0]["transform"] =startTransform;

    transformString = startTransform;
    transformString += toBaseTransform;	
    transformString += toUpLeftTransform;
    faceStyles[1]["transform"]=transformString;

    transformString = startTransform;
    transformString += toBaseTransform;
    transformString += toUpRightTransform;			
    faceStyles[2]["transform"]=transformString;

    transformString = startTransform;
    transformString += toBaseTransform;
    faceStyles[3]["transform"]=transformString;
    
    transformString = startTransform;
    transformString += toUpRightTransform;
    faceStyles[4]["transform"]=transformString;

    transformString = startTransform;
    transformString += toUpLeftTransform;
    faceStyles[5]["transform"]=transformString;

    transformString = startTransform;
    transformString += toDownRightTransfrom;
    faceStyles[6]["transform"]=transformString;

    transformString = startTransform;
    transformString += toDownLeftTransfrom;			
    faceStyles[7]["transform"]=transformString;
        
    transformString = startTransform;
    transformString += toUpLeftTransform;
    transformString += toUpLeftTransform;
    faceStyles[8]["transform"]=transformString;

    transformString = startTransform;
    transformString += toUpLeftTransform;
    transformString += toUpRightTransform;
    faceStyles[9]["transform"]=transformString;

    transformString = startTransform;
    transformString += toUpRightTransform;
    transformString += toUpRightTransform;
    faceStyles[10]["transform"]=transformString;

    transformString = startTransform;
    transformString += toUpRightTransform;
    transformString += toUpRightTransform;
    transformString += toUpLeftTransform;
    faceStyles[11]["transform"]=transformString;
        
    faceStyling.apply(this, faceStyles, shapeStyle)
};

export default E3d.defineShapeType('dodecahedron',12,setUpFaces)