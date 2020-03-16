import * as faceStyling from '../base/faceStyling'
import * as E3d from '../base/baseE3d'


const setUpFaces = function(size,units='px') {
    var faces = this.children;
    var hypoth,angle, transformString;
    function pythag (side1,side2) {return Math.sqrt ( (side1*side1) +(side2*side2) );}
    function degreesFromTangent (side1,side2) {return Math.atan(side1/side2) * 180 / Math.PI;}

    let faceStyles = faceStyling.makeList(5)
    const shapeStyle = {
        "width" : `${size[0]}${units}`,
        "height" : `${size[1]*2}${units}`,
    }

    faceStyles[0].width  = size[0]+units;
    faceStyles[0].height = size[1]+units;
    faceStyles[0].transform = "translateZ(" + size[2]/2 + units + ")";
                
    hypoth = pythag( (size[1]/2) ,size[2]);
    angle = degreesFromTangent((2*size[2]), size[1]);
                    
    faceStyles[1].width  = size[0]+units;
    faceStyles[1].height = hypoth +units;
    transformString = "";
    transformString += "translateY(" + (size[1]*.25 - hypoth/2 ) + units + ")";
    transformString += "rotateX(" + angle*-1 + "deg)";
    transformString += "rotateY(" + 180 + "deg)";
    transformString += "rotateZ(" + 180 + "deg)";
    faceStyles[1].transform = transformString;

    faceStyles[2].width  = size[0]+units;
    faceStyles[2].height = hypoth +units;
    transformString = "";
    transformString += "translateY(" + (size[1]*.75- hypoth/2) + units + ")";
    transformString += "rotateX(" + angle + "deg)";
    transformString += "rotateY(" + 180 + "deg)";
    faceStyles[2].transform = transformString;

    hypoth = pythag( (size[0]/2) ,size[2]);
    angle = degreesFromTangent((2*size[2]), size[0]);

    faceStyles[3].width  = size[1]+units;
    faceStyles[3].height = hypoth +units;
    transformString = "";
    transformString += "rotateZ(" + 270 + "deg)";
    transformString += "translateX(" + (size[1]*-.5 + hypoth*.5) + units + ")";
    transformString += "translateY(" + (size[0]*.75 - size[1]*.5) + units + ")";
    transformString += "rotateX(" + angle + "deg)";
    transformString += "rotateY(" + 180 + "deg)";
    faceStyles[3].transform = transformString;
    
    faceStyles[4].width  = size[1]+units;
    faceStyles[4].height = hypoth +units;
    transformString = "";
    transformString += "rotateZ(" + 90 + "deg)";
    transformString += "translateX(" + (size[1]*.5 + hypoth*-.5) + units + ")";
    transformString += "translateY(" + (size[0]*-.25 - size[1]*-.5) + units + ")";
    transformString += "rotateX(" + angle + "deg)";
    transformString += "rotateY(" + 180 + "deg)";
    faceStyles[4].transform = transformString;

    for (var i=1; i<=4; i++){
        faceStyling.prependSvg(faces[i],[ [50,0],[100,100],[0,100] ]);
        faceStyles[i]["text-align"]="center";
        faceStyles[i]["padding-top"]='50%';
    };
  
    faceStyling.apply(this, faceStyles, shapeStyle)
};

export default E3d.defineShapeType('pyramid',5,setUpFaces)
