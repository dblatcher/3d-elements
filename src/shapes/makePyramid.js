import * as E3d from '../baseE3d'


const setUpFaces = function(size,units='px') {
    var faces = this.children;
    
    var hypoth,angle, transformString;
    
    function pythag (side1,side2) {return Math.sqrt ( (side1*side1) +(side2*side2) );}
    function degreesFromTangent (side1,side2) {return Math.atan(side1/side2) * 180 / Math.PI;}
    
    faces[0].style.width  = size[0]+units;		
    faces[0].style.height = size[1]+units;
    E3d.setTransformWithAllPrefixes(faces[0],  "translateZ(" + size[2]/2 + units + ")");
                
    hypoth = pythag( (size[1]/2) ,size[2]);
    angle = degreesFromTangent((2*size[2]), size[1]);
                    
    faces[1].style.width  = size[0]+units;		
    faces[1].style.height = hypoth +units;
    transformString = "";
    transformString += "translateY(" + (size[1]*.25 - hypoth/2 ) + units + ")";
    transformString += "rotateX(" + angle*-1 + "deg)";
    transformString += "rotateY(" + 180 + "deg)";
    transformString += "rotateZ(" + 180 + "deg)";
    E3d.setTransformWithAllPrefixes(faces[1],transformString);
    
    faces[2].style.width  = size[0]+units;		
    faces[2].style.height = hypoth +units;
    transformString = "";
    transformString += "translateY(" + (size[1]*.75- hypoth/2) + units + ")";
    transformString += "rotateX(" + angle + "deg)";
    transformString += "rotateY(" + 180 + "deg)";			
    E3d.setTransformWithAllPrefixes(faces[2],transformString);

    hypoth = pythag( (size[0]/2) ,size[2]);
    angle = degreesFromTangent((2*size[2]), size[0]);							

    faces[3].style.width  = size[1]+units;		
    faces[3].style.height = hypoth +units;			
    transformString = "";
    transformString += "rotateZ(" + 270 + "deg)";
    transformString += "translateX(" + (size[1]*-.5 + hypoth*.5) + units + ")";
    transformString += "translateY(" + (size[0]*.75 - size[1]*.5) + units + ")";
    transformString += "rotateX(" + angle + "deg)";
    transformString += "rotateY(" + 180 + "deg)";			
    E3d.setTransformWithAllPrefixes(faces[3],transformString);
    
    faces[4].style.width  = size[1]+units;		
    faces[4].style.height = hypoth +units;		
    transformString = "";
    transformString += "rotateZ(" + 90 + "deg)";
    transformString += "translateX(" + (size[1]*.5 + hypoth*-.5) + units + ")";
    transformString += "translateY(" + (size[0]*-.25 - size[1]*-.5) + units + ")";
    transformString += "rotateX(" + angle + "deg)";
    transformString += "rotateY(" + 180 + "deg)";
    E3d.setTransformWithAllPrefixes(faces[4],transformString);
    
    for (var i=1; i<=4; i++){
        E3d.applySVG(faces[i],[ [50,0],[100,100],[0,100] ]);
        faces[i].style.textAlign="center";
        faces[i].style.paddingTop='50%';			
    };
                
};

export default E3d.defineShapeType('pyramid',5,setUpFaces)
