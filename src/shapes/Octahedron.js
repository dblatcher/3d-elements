import * as E3d from '../base/baseE3d'
import * as faceStyling from '../base/faceStyling'

function setUpFaces (size,units='px') {
    var faces = this.children;        
    var transformString;
    var triangleHeight = size[0] * Math.sqrt(3) / 2;
    var pyramidHeight = Math.sqrt( (triangleHeight*triangleHeight) - ((size[0]/2)*(size[0]/2)) ) ;
    var angle = 90-54.7356;
    var shift = 37/150;
    
    let faceStyles = faceStyling.makeList(8)
    const shapeStyle = {
        "width" : `${size[0]}${units}`,
        "height" : `${pyramidHeight*2}${units}`,
    }

    for (var i=0; i<=7; i++){
        faceStyles[i].width = size[0] + units;
        faceStyles[i].height = triangleHeight + units;
        faceStyles[i]["text-align"] = "center";
        faceStyles[i]["padding-left"] = '25%';        
        faceStyles[i]["padding-right"]='25%';        
        faceStyles[i]["padding-top"]='40%';    
        faceStyling.prependSvg(faces[i],[ [50,0],[100,100],[0,100] ]);
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
        faceStyles[i]["transform"] = transformString
    };

    faceStyling.apply(this, faceStyles, shapeStyle)
};

export default E3d.defineShapeType('octahedron', 8, setUpFaces)