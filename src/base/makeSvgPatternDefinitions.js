function makeSvgPatternDefinitions () {   
    const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgDefs.setAttribute('height','0')
    svgDefs.setAttribute('width','0')
    svgDefs.innerHTML += `
    <defs>
        <pattern id="pattern-${1} viewBox="0,0,10,12" width="20" height="20">
            <image href="${'assets/bricks.png'}" x="0" y="0" width="100%" height="100%" />
        </pattern>
        <pattern id="pattern-${2}" viewBox="0,0,10,12" width="20%" height="20%">
            <image href="${'assets/bricks.png'}" x="0" y="0" width="10" height="12" />
        </pattern>
    </defs>`
    document.body.appendChild(svgDefs)
}

export default makeSvgPatternDefinitions