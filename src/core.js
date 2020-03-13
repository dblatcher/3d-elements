import Cube from './shapes/cube'
import Pyramid from './shapes/pyramid'
import Dodecahedron from './shapes/dodecahedron'
import Cuboid from './shapes/cuboid'
import Decagon from './shapes/decagon'
import Hexagon from './shapes/hexagon'
import Icosahedron from './shapes/icosahedron'
import Octahedron from './shapes/Octahedron'
import PentagonalTrapezohedron from './shapes/PentagonalTrapezohedron'
import Tetrahedron from './shapes/Tetrahedron'
import TruncatedCube from './shapes/truncatedCube'

const make = {
    Cube, Pyramid, Dodecahedron, Cuboid,Decagon,
    Hexagon, Icosahedron, Octahedron, PentagonalTrapezohedron,
    Tetrahedron,TruncatedCube
}

function buildShapesInDom () {
    const shapeNameList = Object.keys(make)
    const targetElementsList = document.querySelectorAll('[e3d-shape]')
    let targetElements = []
    for (let i = 0; i<targetElementsList.length; i++){
        targetElements.push(targetElementsList[i])
    }
    targetElements.forEach( target => {
        if (target.wasBuiltByScript) {return false}
        const shapeName = target.getAttribute('e3d-shape')
        if (shapeNameList.includes(shapeName)) {
            make[shapeName].fromDom(target)
        } else {
            console.warn (`${shapeName} is not a supported shape.`)
        }
    })
}

export {make, buildShapesInDom}