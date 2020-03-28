function makeList (quantity) {
    let i, list=[]
    for (i=0; i< quantity; i++) {
        list.push({
            width:'',
            height:'',
            transform:'',
        })
    }
    return list
}


function apply(target, faceStyles, shapeStyle = null) {
    const hash = target.getAttribute('hash')
    const style = document.createElement('style')

    if (shapeStyle) {
        style.textContent += `[hash="${hash}"] {`
        Object.keys(shapeStyle).forEach( prop => {
            style.textContent +=`${prop}: ${shapeStyle[prop]};
`
        })
        style.textContent +=`}`
    }

    faceStyles.forEach ((faceStyle, index) => { 
        style.textContent += `[hash="${hash}"]>[e3d-face="${index}"] {
`
        const props = Object.keys(faceStyle)
        props.forEach (prop => {
            if (prop === 'transform') {
                style.textContent +=`
                webkitTransform: ${faceStyle[prop]};
                MozTransform: ${faceStyle[prop]};
                msTransform: ${faceStyle[prop]};
                OTransform: ${faceStyle[prop]};
                `
            }
            style.textContent +=`${prop}: ${faceStyle[prop]};
            `
        })
        style.textContent += `}`
    })


    target.appendChild(style);
}

function prependSvg (face, points, faceIndex, pattern=null) {
    face.setAttribute('e3d-face-with-svg','true')
    let pathString = '';   

    for (var dot=0; dot<points.length; dot++){
        if (dot === 0) {pathString += "M"} else {pathString += "L"};
        pathString += `${points[dot][0]} ${points[dot][1]} `;
    }
    pathString += "Z";
    
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute('width','100%');
    svgElement.setAttribute('height','100%');
    svgElement.setAttributeNS('','viewBox','0 0 100 100');
    svgElement.setAttributeNS('','preserveAspectRatio','none');
    svgElement.setAttribute('e3d-svg','true');


    if (pattern) {
        let patternValue;
        if (typeof pattern === 'string') {
            patternValue = pattern
        }
        else if(typeof pattern === 'function') {
            patternValue = pattern(face, faceIndex)
        }

        svgElement.innerHTML +=  typeof patternValue === 'string' ?
        `<path  x="0" y="0" d="${pathString}" fill="url(${patternValue})"/>` :
        `<path d="${pathString}" />`;
    } else {
        svgElement.innerHTML += `<path d="${pathString}" />`
    } 
    
    if (face.firstChild) {
        face.insertBefore (svgElement, face.firstChild)
        return
    }

    face.appendChild(svgElement)

};	

export {makeList, apply, prependSvg}